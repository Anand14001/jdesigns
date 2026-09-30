// Where the site lives: "/" in development, otherwise the folder the built
// files were uploaded to (worked out from where this script was loaded, so the
// same build works at example.com/ or example.com/any/folder/).
function siteRoot() {
  if (import.meta.env.DEV) return "/";
  const url = import.meta.url;
  return new URL(url.slice(0, url.lastIndexOf("/assets/") + 1)).pathname;
}

export const SITE_ROOT = siteRoot();
export const BASENAME = SITE_ROOT.replace(/\/$/, "") || "/";

/** Full path to a file in public/, e.g. asset("images/photo.webp"). */
export const asset = (path) => (/^(https?:|data:)/.test(path) ? path : SITE_ROOT + path.replace(/^\//, ""));

export const whatsappLink = (number, lines) =>
  `https://wa.me/${number}?text=${encodeURIComponent(lines.filter((l) => l != null).join("\n"))}`;
