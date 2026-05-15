const METAMASK_EXTENSION_ID = "nkbihfbeogaeaoehlefnkodbefgpgknn";

function isMetaMaskExtensionFailure(value: unknown) {
  const text =
    value instanceof Error
      ? `${value.name} ${value.message} ${value.stack ?? ""}`
      : String(value);

  return (
    text.includes(METAMASK_EXTENSION_ID) ||
    text.includes("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/") ||
    text.includes("MetaMask extension not found") ||
    text.includes("Failed to connect to MetaMask")
  );
}

window.addEventListener(
  "error",
  (event) => {
    const filename = event.filename ?? "";

    if (
      filename.includes(`chrome-extension://${METAMASK_EXTENSION_ID}/`) ||
      isMetaMaskExtensionFailure(event.error) ||
      isMetaMaskExtensionFailure(event.message)
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);

window.addEventListener(
  "unhandledrejection",
  (event) => {
    if (isMetaMaskExtensionFailure(event.reason)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true,
);
