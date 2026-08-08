"use client";

import { useEffect } from "react";

/**
 * Escape closes the topmost thing, and only the topmost thing.
 *
 * Several layers listen for Escape at once: the detail panel, the full-record
 * dialog, the status filter popover, and every status chip's explanation. They
 * all bind to `window`, so without a stack a single press collapsed the whole
 * pile at once. Opening a chip's explanation on top of the panel and pressing
 * Escape used to shut both, which read as the panel randomly vanishing.
 *
 * Layers register in the order they open, so the last one to open is the first
 * one Escape reaches.
 */
const stack: object[] = [];

function push(layer: object) {
  stack.push(layer);
}

function remove(layer: object) {
  const index = stack.indexOf(layer);
  if (index > -1) stack.splice(index, 1);
}

function isTopmost(layer: object) {
  return stack.length > 0 && stack[stack.length - 1] === layer;
}

/**
 * Calls `onEscape` when Escape is pressed and this layer is the topmost open
 * one. Pass `active: false` for a layer that is currently closed.
 */
export function useEscapeLayer(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;

    // Identity is the registration; a fresh object per activation is enough.
    const layer = {};
    push(layer);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (!isTopmost(layer)) return;
      event.stopPropagation();
      onEscape();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      remove(layer);
    };
  }, [active, onEscape]);
}
