/**
 * Generate a browser fingerprint for anonymous RSVP tracking
 */
async function createBrowserFingerprint(): Promise<string> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("GDSC UTD Browser ID", 2, 2);
  }

  const fingerprint = {
    // Screen properties
    screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    availScreen: `${screen.availWidth}x${screen.availHeight}`,

    // Timezone
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),

    // Language and locale
    language: navigator.language,
    languages: navigator.languages?.join(",") || "",

    // Platform
    platform: navigator.platform,
    userAgent: navigator.userAgent.slice(0, 100), // Truncate for storage

    // Hardware
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory || 0,

    // Canvas fingerprint
    canvas: canvas.toDataURL().slice(0, 100), // Truncate for storage

    // Additional browser features
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || "unknown",

    // Add some entropy but keep it consistent per browser
    browserEntropy: Math.round(Math.random() * 1000000).toString(),
  };

  // Create hash from fingerprint data
  const fingerprintString = JSON.stringify(fingerprint);
  const encoder = new TextEncoder();
  const data = encoder.encode(fingerprintString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Return first 32 characters for database storage
  return hashHex.slice(0, 32);
}

/**
 * Get or create a persistent browser fingerprint
 * This fingerprint will remain the same across page reloads and browser sessions
 */
export async function getBrowserFingerprint(): Promise<string> {
  const STORAGE_KEY = "gdsc_browser_fingerprint";
  const STORAGE_VERSION_KEY = "gdsc_fingerprint_version";
  const CURRENT_VERSION = "1.0";

  try {
    // Check if we have a stored fingerprint and if it's the current version
    const storedFingerprint = localStorage.getItem(STORAGE_KEY);
    const storedVersion = localStorage.getItem(STORAGE_VERSION_KEY);

    if (storedFingerprint && storedVersion === CURRENT_VERSION) {
      // Validate that the stored fingerprint is still valid (32 hex characters)
      if (/^[a-f0-9]{32}$/.test(storedFingerprint)) {
        return storedFingerprint;
      }
    }

    // Generate new fingerprint if none exists or version mismatch
    const newFingerprint = await createBrowserFingerprint();

    // Store the fingerprint and version
    localStorage.setItem(STORAGE_KEY, newFingerprint);
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);

    return newFingerprint;
  } catch (error) {
    // Fallback if localStorage is not available (private browsing, etc.)
    console.warn("localStorage not available for fingerprint storage:", error);

    // Create a session-only fingerprint that will be consistent during the session
    if (!(window as any).__gdsc_session_fingerprint) {
      (window as any).__gdsc_session_fingerprint =
        await createBrowserFingerprint();
    }

    return (window as any).__gdsc_session_fingerprint;
  }
}

/**
 * Clear the stored browser fingerprint (useful for testing or user privacy)
 */
export function clearBrowserFingerprint(): void {
  try {
    localStorage.removeItem("gdsc_browser_fingerprint");
    localStorage.removeItem("gdsc_fingerprint_version");
    delete (window as any).__gdsc_session_fingerprint;
  } catch (error) {
    console.warn("Could not clear fingerprint:", error);
  }
}

/**
 * Get user's IP address (best effort)
 */
export async function getUserIPAddress(): Promise<string | null> {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      timeout: 5000, // 5 second timeout
    } as any);

    if (!response.ok) {
      throw new Error("IP service unavailable");
    }

    const data = await response.json();
    return data.ip || null;
  } catch (error) {
    console.warn("Could not fetch IP address:", error);
    return null;
  }
}

/**
 * Check if the browser supports the required APIs for fingerprinting
 */
export function isFingerprintingSupported(): boolean {
  return !!(
    window.crypto &&
    window.crypto.subtle &&
    window.TextEncoder &&
    typeof document.createElement === "function" &&
    navigator.userAgent
  );
}

/**
 * Get a fallback identifier if fingerprinting is not supported
 */
export function getFallbackIdentifier(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `fallback_${timestamp}_${random}`;
}
