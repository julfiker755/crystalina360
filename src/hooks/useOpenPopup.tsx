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

  // Create an overlay to block interaction with the rest of the page
  const overlay = document.createElement("div");
  overlay.id = "popup-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "9999"; // Make sure it's on top
  overlay.style.display = "block";
  document.body.appendChild(overlay);

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

  // Close the overlay when the popup window is closed
  if (newWindow) {
    newWindow.onunload = () => {
      overlay.style.display = "none"; // Hide the overlay when the window is closed
    };

    // Focus the popup window (if possible)
    if (typeof newWindow.focus === "function") {
      newWindow.focus();
    }
  }

  return newWindow;
};
