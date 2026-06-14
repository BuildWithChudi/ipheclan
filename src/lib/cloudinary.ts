// Cloudinary delivery helpers — mirrors the shape of lib/imagekit.ts.
//
// The source uploads are .mov (QuickTime): great on Safari, broken or huge
// everywhere else. We never serve the raw asset. Instead we let Cloudinary
// transcode to width-capped H.264 mp4 with q_auto, and pull poster frames
// straight from the video — universally playable, CDN-cached, launch-safe.

const CLOUD_NAME = "dud5owpai";
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

type MediaOpts = {
  /** Max delivered width in px. Clips render small, so we never ship full-res. */
  width?: number;
  /** Cloudinary quality. "auto" lets the CDN pick per-connection. */
  quality?: string | number;
  /** Extra Cloudinary transforms, e.g. ["e_grayscale"] to bake the look in. */
  extra?: string[];
};

/**
 * Optimized, universally-playable mp4 (H.264) for a video public id.
 * c_limit only ever downscales, preserving the client's original crop.
 */
export function clVideo(
  publicId: string,
  version: string,
  { width = 640, quality = "auto", extra = [] }: MediaOpts = {}
) {
  const tr = [`w_${width}`, "c_limit", `q_${quality}`, "vc_auto", ...extra].join(
    ","
  );
  return `${BASE}/${tr}/${version}/${publicId}.mp4`;
}

/**
 * A still poster frame grabbed from the first frame of the video (so_0),
 * delivered as an auto-format image (webp/avif when the browser supports it).
 */
export function clPoster(
  publicId: string,
  version: string,
  { width = 640, quality = "auto", extra = [] }: MediaOpts = {}
) {
  const tr = ["so_0", `w_${width}`, "c_limit", `q_${quality}`, "f_auto", ...extra].join(
    ","
  );
  return `${BASE}/${tr}/${version}/${publicId}.jpg`;
}

export type Reel = {
  publicId: string;
  version: string;
  /** Short editorial caption (mono overlay). */
  caption: string;
  /** Descriptive alt text for a11y / SEO. */
  alt: string;
};

// Ordered for visual rhythm across the strip.
export const REELS: Reel[] = [
  {
    publicId: "camera-following-iphe-vlog-style-iphe-smiles-walks_znyuia",
    version: "v1781423521",
    caption: "Follow Me",
    alt: "Iphe walking and smiling, filmed vlog-style as the camera follows.",
  },
  {
    publicId: "iphe-plugged-in-dancing-indoors-feeling-music_fk1nn1",
    version: "v1781424262",
    caption: "Plugged In",
    alt: "Iphe dancing indoors, headphones on, feeling the music.",
  },
  {
    publicId: "iphe-outside-dancing-in-front-of-tripod-nighttime_bb1gqu",
    version: "v1781423653",
    caption: "Night Moves",
    alt: "Iphe dancing outside in front of a tripod at night.",
  },
  {
    publicId: "iphe-clothing-store-looking-around-dancing-walking_llzd2c",
    version: "v1781423561",
    caption: "Off the Rack",
    alt: "Iphe browsing, dancing and walking through a clothing store.",
  },
  {
    publicId: "iphe-sitting-facing-phone-selfie-talking-moving_gmfxad",
    version: "v1781424313",
    caption: "To the Cam",
    alt: "Iphe sitting, talking to the camera selfie-style.",
  },
  {
    publicId: "iphe-walking-forward-smile-walk-off-nighttime_sejbqg",
    version: "v1781424325",
    caption: "Walk-Off",
    alt: "Iphe walking forward with a smile, at night.",
  },
];

type ClipRef = Pick<Reel, "publicId" | "version">;

// The six clips, addressable by short key, so each hero can pick its own mix.
const CLIP: Record<string, ClipRef> = {
  vlog: {
    publicId: "camera-following-iphe-vlog-style-iphe-smiles-walks_znyuia",
    version: "v1781423521",
  },
  pluggedIn: {
    publicId: "iphe-plugged-in-dancing-indoors-feeling-music_fk1nn1",
    version: "v1781424262",
  },
  nightDance: {
    publicId: "iphe-outside-dancing-in-front-of-tripod-nighttime_bb1gqu",
    version: "v1781423653",
  },
  store: {
    publicId: "iphe-clothing-store-looking-around-dancing-walking_llzd2c",
    version: "v1781423561",
  },
  selfie: {
    publicId: "iphe-sitting-facing-phone-selfie-talking-moving_gmfxad",
    version: "v1781424313",
  },
  walkOff: {
    publicId: "iphe-walking-forward-smile-walk-off-nighttime_sejbqg",
    version: "v1781424325",
  },
};

/**
 * Hand-picked, motion-forward clips for the hero background crossfade — one
 * curated mix per page so the heroes don't all feel identical. Kept short;
 * these read well as ambient, grayscale, scrim-darkened backgrounds.
 */
export const HERO_CLIPS = {
  home: [CLIP.vlog, CLIP.nightDance, CLIP.walkOff],
  about: [CLIP.selfie, CLIP.pluggedIn, CLIP.vlog],
  work: [CLIP.store, CLIP.vlog, CLIP.nightDance],
  clan: [CLIP.nightDance, CLIP.walkOff, CLIP.pluggedIn],
} satisfies Record<string, ClipRef[]>;
