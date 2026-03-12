const IMAGEKIT_BASE = "https://ik.imagekit.io/billiardfactory";

export default function imagekitLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Local /images/ paths serve from public/ directly, skip ImageKit
  if (src.startsWith("/images/")) {
    return src;
  }

  const params = [`w-${width}`, "f-auto"];
  if (quality) params.push(`q-${quality}`);

  // If src is already a full ImageKit URL, insert transforms
  if (src.startsWith(IMAGEKIT_BASE)) {
    const path = src.replace(IMAGEKIT_BASE, "");
    return `${IMAGEKIT_BASE}/tr:${params.join(",")}${path}`;
  }

  // If src is a relative path, build the full URL with transforms
  return `${IMAGEKIT_BASE}/tr:${params.join(",")}/${src}`;
}
