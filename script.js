// Get DOM elements
const snapchatIcon = document.getElementById("snapchat-icon");
const cameraPage = document.getElementById("camera-page");
const cameraCloseBtn = document.getElementById("camera-close-btn");
const cameraVideo = document.getElementById("camera-video");
const captureBtn = document.getElementById("capture-btn");
const snapshotCanvas = document.getElementById("snapshot-canvas");
const cameraLoading = document.getElementById("camera-loading");
const cameraError = document.getElementById("camera-error");

// Request OS fullscreen
async function requestFullscreen(element) {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
    }
  } catch (err) {
    console.log("Fullscreen not supported:", err);
  }
}

// Exit OS fullscreen
async function exitFullscreen() {
  try {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      }
    }
  } catch (err) {
    console.log("Exit fullscreen error:", err);
  }
}

// Open camera page and start camera
async function openCameraPage() {
  cameraPage.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Request OS fullscreen
  await requestFullscreen(cameraPage);

  // Show loading state
  cameraLoading.style.display = "flex";
  cameraError.classList.remove("visible");

  // Check if camera is supported
  if (!CameraModule.isSupported()) {
    cameraLoading.style.display = "none";
    cameraError.classList.add("visible");
    return;
  }

  // Start the camera
  const success = await CameraModule.startCamera(cameraVideo);
  cameraLoading.style.display = "none";

  if (!success) {
    cameraError.classList.add("visible");
  }
}

// Close camera page and stop camera
async function closeCameraPage() {
  CameraModule.stopCamera();
  await exitFullscreen();
  cameraPage.classList.add("hidden");
  document.body.style.overflow = "auto";
  cameraVideo.srcObject = null;
}

// Match overlay elements
const matchOverlay = document.getElementById("match-overlay");
const matchLoading = document.getElementById("match-loading");
const matchResult = document.getElementById("match-result");
const newSnapBtn = document.getElementById("new-snap-btn");
const matchPercentage = document.querySelector(".match-percentage");

// Match scores cycle
const matchScores = [30, 60, 110];
let currentScoreIndex = 0;

// Take a photo and show match result
function capturePhoto() {
  const dataUrl = CameraModule.takeSnapshot(cameraVideo, snapshotCanvas);
  console.log("Photo captured!", dataUrl.substring(0, 50) + "...");

  // Visual feedback - flash effect
  cameraPage.style.backgroundColor = "white";
  setTimeout(() => {
    cameraPage.style.backgroundColor = "#000";
  }, 100);

  // Show match overlay with loading state
  showMatchLoading();
}

// Show the match loading screen
function showMatchLoading() {
  matchOverlay.classList.remove("hidden");
  matchLoading.classList.remove("hidden");
  matchResult.classList.add("hidden");

  // After 3 seconds, show the result
  setTimeout(() => {
    showMatchResult();
  }, 3000);
}

// Show the match result
function showMatchResult() {
  matchLoading.classList.add("hidden");
  matchResult.classList.remove("hidden");
  
  // Update percentage with current score
  matchPercentage.textContent = matchScores[currentScoreIndex] + "%";
  
  // Move to next score for next snap
  currentScoreIndex = (currentScoreIndex + 1) % matchScores.length;
}

// Reset to take a new snap
function resetForNewSnap() {
  matchOverlay.classList.add("hidden");
  matchLoading.classList.remove("hidden");
  matchResult.classList.add("hidden");
}

// Event listeners for opening camera
snapchatIcon.addEventListener("click", function (e) {
  e.preventDefault();
  openCameraPage();
});

snapchatIcon.addEventListener("touchend", function (e) {
  e.preventDefault();
  openCameraPage();
});

// Event listeners for closing camera
cameraCloseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  closeCameraPage();
});

cameraCloseBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  closeCameraPage();
});

// Event listeners for capture button
captureBtn.addEventListener("click", function (e) {
  e.preventDefault();
  capturePhoto();
});

captureBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  capturePhoto();
});

// Event listeners for new snap button
newSnapBtn.addEventListener("click", function (e) {
  e.preventDefault();
  resetForNewSnap();
});

newSnapBtn.addEventListener("touchend", function (e) {
  e.preventDefault();
  resetForNewSnap();
});

// Ensure portrait mode is maintained
function lockOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait").catch((err) => {
      console.log("Screen orientation lock not supported:", err);
    });
  }
}

// Try to lock orientation when page loads
window.addEventListener("load", lockOrientation);
