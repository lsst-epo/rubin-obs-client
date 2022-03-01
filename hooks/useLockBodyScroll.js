import { useEffect } from "react";

export default function useLockBodyScroll(lock) {
  useEffect(
    () =>
      lock
        ? document.body.classList.add("has-scroll-lock")
        : document.body.classList.remove("has-scroll-lock"),
    [lock]
  );
}
