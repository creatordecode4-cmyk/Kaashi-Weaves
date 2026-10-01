"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Mobile address-bar show/hide resizes the viewport; don't recalc pins for it.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Media query under which scroll animations run. Anything else = static page. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/** Height of the sticky site header (h-16). Pinned sections start below it. */
export const HEADER_OFFSET = 64;

export { gsap, ScrollTrigger, useGSAP };
