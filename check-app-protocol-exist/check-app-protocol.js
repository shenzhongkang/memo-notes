async function checkAndRedirect() {
  // try to register event
  function registerEvent(target, eventType, cb) {
    target.addEventListener(eventType, cb);
    return {
      remove() {
        target.removeEventListener(eventType, cb);
      },
    };
  }

  // try to open uri with input timeout hack
  function openUriWithInputTimeoutHack(uri, failCb, successCb) {
    const target = document.createElement('input');
    Object.assign(target.style, {
      width: '0',
      height: '0',
      position: 'fixed',
      top: '-100px',
      left: '-100px',
    });
    document.body.appendChild(target);
    target.focus();

    const handler = registerEvent(target, 'blur', () => {
      successCb?.();
      handler.remove();
      clearTimeout(timeout);
      document.body.removeChild(target);
    });

    location.href = uri;

    const timeout = setTimeout(() => {
      failCb?.();
      handler.remove();
      document.body.removeChild(target);
    }, 300);
  }

  const redirectURL = 'custom-protocol://';

  try {
    const isInstalled = await new Promise((resolve) => {
      openUriWithInputTimeoutHack(
        redirectURL,
        () => resolve(false),
        () => resolve(true)
      );
    });

    if (isInstalled) {
      window.location.href = redirectURL;
    } else {
      window.open('https://www.google.com', '_self');
    }
  } catch (error) {
    console.error('Error while checking:', error);
  }
}
