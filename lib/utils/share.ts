export async function copyShareLink(url?: string): Promise<boolean> {
  const target = url ?? (typeof window !== "undefined" ? window.location.href : "");
  if (!target || typeof navigator === "undefined" || !navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(target);
    return true;
  } catch {
    return false;
  }
}
