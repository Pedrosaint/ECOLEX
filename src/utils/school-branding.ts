const NAME_KEY = "schoolBrandingName";
const LOGO_KEY = "schoolBrandingLogo";
const COLORS_KEY = "schoolBrandingColors";

export interface BrandColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  text?: string;
}

function applyBrandColors(colors: BrandColors) {
  if (colors.primary)   document.documentElement.style.setProperty("--color-primary",   colors.primary);
  if (colors.secondary) document.documentElement.style.setProperty("--color-secondary", colors.secondary);
  if (colors.accent)    document.documentElement.style.setProperty("--color-accent",    colors.accent);
  if (colors.text)      document.documentElement.style.setProperty("--color-text",      colors.text);
}

export function getSchoolBranding(): {
  schoolName: string | null;
  schoolLogo: string | null;
  brandColors: BrandColors;
} {
  const params = new URLSearchParams(window.location.search);
  const urlName      = params.get("schoolName");
  const urlLogo      = params.get("schoolLogo");
  const urlColorsRaw = params.get("brandColors");

  if (urlName)      sessionStorage.setItem(NAME_KEY,   urlName);
  if (urlLogo)      sessionStorage.setItem(LOGO_KEY,   urlLogo);
  if (urlColorsRaw) sessionStorage.setItem(COLORS_KEY, urlColorsRaw);

  const colorsRaw = urlColorsRaw ?? sessionStorage.getItem(COLORS_KEY);
  let brandColors: BrandColors = {};
  if (colorsRaw) {
    try { brandColors = JSON.parse(colorsRaw); } catch { /* invalid JSON */ }
  }

  applyBrandColors(brandColors);

  return {
    schoolName:  urlName ?? sessionStorage.getItem(NAME_KEY),
    schoolLogo:  urlLogo ?? sessionStorage.getItem(LOGO_KEY),
    brandColors,
  };
}
