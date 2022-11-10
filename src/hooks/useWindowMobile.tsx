import { useState, useEffect, useMemo } from "react"

export default function useWindowMobile({ width="630px" }={}) {
  const media: MediaQueryList = useMemo(() => {
    return window.matchMedia(`(max-width: ${width})`)
  }, [window.innerWidth, window.innerHeight]) 

  const [mobile, setMobile] = useState(media.matches);

  function handleChangedMedia(e: MediaQueryListEvent) {
    console.log("media changed", e)
    setMobile(e.matches)
  }

  useEffect(() => {
    media
      .addEventListener("change", handleChangedMedia);
    return () => media.removeEventListener("change", handleChangedMedia);
  }, []);

  return mobile
}