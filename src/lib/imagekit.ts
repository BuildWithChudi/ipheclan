import type { ImageLoaderProps } from "next/image";

export const IK_BASE =
  "https://ik.imagekit.io/chewdee/greyform/ipheclan/public/content";

export function imagekitLoader({ src, width, quality }: ImageLoaderProps) {
  const cleanSrc = src.replace(/^\/+/, "");
  const params = [`w-${width}`, "f-auto", `q-${quality ?? 80}`];
  return `${IK_BASE}/${cleanSrc}?tr=${params.join(",")}`;
}

export function ikImage(path: string) {
  return `${IK_BASE}/${path.replace(/^\/+/, "")}`;
}

export function ikVideo(path: string) {
  return `${IK_BASE}/${path.replace(/^\/+/, "")}`;
}
