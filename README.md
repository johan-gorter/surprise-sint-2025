# surprise-sint-2025

A static website featuring a mobile phone mockup with a Snapchat icon that opens a TODO page.

## Features

- 📱 Realistic mobile phone mockup
- 👻 Interactive Snapchat icon
- ✅ Fullscreen TODO page in portrait mode
- 📱 Responsive design (works on desktop and mobile)
- 🎨 Modern UI with gradient backgrounds

## How to Run

### On Windows

Simply double-click the `start-server.bat` file, or run it from the command line:

```batch
start-server.bat
```

The script will automatically detect and use Python or Node.js to start a web server.

### On Mac/Linux

You can use Python's built-in HTTP server:

```bash
python -m http.server 8000
```

Or with Python 3 specifically:

```bash
python3 -m http.server 8000
```

Or with Node.js:

```bash
npx http-server -p 8000
```

### Access the Website

Once the server is running, open your browser and navigate to:

```
http://localhost:8000
```

## Usage

1. The main page displays a mobile phone mockup with a Snapchat icon
2. Click or touch the Snapchat icon to open the TODO page
3. The TODO page opens in fullscreen portrait mode
4. Click the ✕ button in the top-left to close the TODO page
5. Check off items in the TODO list as you complete them

## Files

- `index.html` - Main HTML page with phone mockup
- `styles.css` - Styling for the phone mockup and TODO page
- `script.js` - JavaScript for interactions and animations
- `start-server.bat` - Windows script to start a web server