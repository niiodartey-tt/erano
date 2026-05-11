"use client";

import { useEffect } from "react";

export default function MagicLinkRootRedirect() {
  useEffect(() => {
    const { hash, pathname, search } = window.location;
    if (!hash || pathname !== "/") return;

    const params = new URLSearchParams(hash.substring(1));
    const hasMagicToken =
      params.get("type") === "magiclink" &&
      !!params.get("access_token") &&
      !!params.get("refresh_token");

    if (!hasMagicToken) return;
    window.location.replace(`/auth/callback${search}${hash}`);
  }, []);

  return null;
}
