"use client";

import { useEffect } from "react";

export function MagicLinkRootRedirect() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("type=magiclink") && hash.includes("access_token=")) {
      window.location.replace("/auth/callback" + hash);
    }
  }, []);

  return null;
}
