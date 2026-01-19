"use client";

export const useOpenPopup = (
  url: string,
  title: string,
  w: number,
  h: number,
): Window | null => {
  // Fixes dual-screen setup issues
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width =
    window.innerWidth || document.documentElement.clientWidth || screen.width;

  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  // Calculate the position to center the popup window
  const left = Math.max(0, (width - w) / 2 + dualScreenLeft);
  const top = Math.max(0, (height - h) / 2 + dualScreenTop);

  // Open the popup window
  const newWindow = window.open(
    url,
    title,
    `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
    `,
  );

  // Close the overlay when the popup window is closed (if overlay was previously used)
  if (newWindow) {
    newWindow.onunload = () => {
      // No overlay here, so nothing to hide
    };

    // Focus the popup window (if possible)
    if (typeof newWindow.focus === "function") {
      newWindow.focus();
    }
  }

  return newWindow;
};
