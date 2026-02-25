const IMAGEKIT_URL = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

export default function imagekitLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (!IMAGEKIT_URL) {
    return src;
  }

  const params = [`w-${width}`, `f-auto`];
  if (quality) params.push(`q-${quality}`);
  return `${IMAGEKIT_URL}/tr:${params.join(",")}${src}`;
}
