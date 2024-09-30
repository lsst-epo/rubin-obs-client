export async function getRelease(locale: string, id: string) {
  const releaseUrl = `https://noirlab.edu/public/api/v2/releases/${id}/?lang=${locale}&translation_mode=fallback`;
  const response = await fetch(releaseUrl, {
    next: { tags: ["pressRelease"] },
  });
  const release = await response.json();
  return release;
}

export async function getReleaseOpenGraph(locale: string, id: string) {
  const format = "screen640";
  const { images } = await getRelease(locale, id);
  if (!images) return;
  const feature = images[0];
  if (!feature) return;

  const { title, height, width, formats } = feature;

  return {
    alt: title,
    url: formats[format],
    height,
    width,
  };
}
