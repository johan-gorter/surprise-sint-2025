// Camera module for Snapchat-like selfie camera
const CameraModule = (function () {
  let videoStream = null;

  // Initialize camera with front-facing camera
  async function startCamera(videoElement) {
    try {
      // Request front camera (user-facing)
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1080 },
          height: { ideal: 1920 },
        },
        audio: false,
      };

      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoElement.srcObject = videoStream;

      return true;
    } catch (error) {
      console.error("Error accessing camera:", error);
      return false;
    }
  }

  // Stop camera stream
  function stopCamera() {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => {
        track.stop();
      });
      videoStream = null;
    }
  }

  // Take a snapshot from the video feed
  function takeSnapshot(videoElement, canvasElement) {
    const context = canvasElement.getContext("2d");
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    // Mirror the image horizontally for selfie effect
    context.translate(canvasElement.width, 0);
    context.scale(-1, 1);
    context.drawImage(videoElement, 0, 0);

    return canvasElement.toDataURL("image/png");
  }

  // Check if camera is supported
  function isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  return {
    startCamera,
    stopCamera,
    takeSnapshot,
    isSupported,
  };
})();
