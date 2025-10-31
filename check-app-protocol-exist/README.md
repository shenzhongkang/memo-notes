# Custom Protocol Detection and Redirection

A JavaScript utility to detect if a custom protocol is available on the user's device and handle redirection accordingly.

## Features

- Detects if a custom protocol (e.g., `custom-protocol://`) is available
- Redirects to the protocol if available
- Falls back to a specified URL (defaults to Google) if the protocol is not available
- Includes timeout mechanism to prevent indefinite waiting

## Installation

1. Include the script in your HTML:

```html
<script src="path/to/check-app-protocol.js"></script>
```

## Usage

### Basic Usage

```javascript
// Using default settings
checkAndRedirect();
```

### Custom Configuration

```javascript
const options = {
  protocol: 'your-custom-protocol://',
  fallbackUrl: 'https://your-fallback-url.com'
};
checkAndRedirect(options);
```

## How It Works

1. Creates a hidden `input` element and focuses it
2. Attempts to open the custom protocol using `location.href`
3. If the protocol is available, the browser switches to the app, causing the `input` to lose focus (triggering the `blur` event)
4. If the protocol is not available, the `input` maintains focus until timeout (300ms)
5. Performs redirection based on the detection result

## Parameters

| Parameter    | Type   | Default               | Description                                   |
|--------------|--------|-----------------------|-----------------------------------------------|
| protocol     | string | 'custom-protocol://'  | The custom protocol to check                  |
| fallbackUrl  | string | '<https://google.com>'  | URL to redirect to if protocol is not available |

## Notes

- Due to browser security restrictions, this method may not work on all browsers or mobile devices
- The timeout duration (300ms) can be adjusted as needed
- Always call this function within a user interaction event (like click) to avoid popup blockers
- Some mobile devices may require user confirmation before opening external applications

## Browser Compatibility

This script should work in modern browsers including:

- Latest Chrome
- Latest Firefox
- Latest Safari
- Latest Edge

## License

MIT
