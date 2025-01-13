export type ValidCantoSize = 100 | 240 | 320 | 500 | 640 | 800 | 2050;

export const ValidCantoSizes: Array<ValidCantoSize> = [
  100, 240, 320, 500, 640, 800, 2050,
];

export const getPreviewSize = (previewUrl: string) => {
  return parseInt(previewUrl.slice(-3));
};

export const isValidCantoSize = (size: any): size is ValidCantoSize => {
  return ValidCantoSizes.includes(size);
};

export const resizeCantoImage = (previewUrl: string, size: number) => {
  if (isValidCantoSize(size)) {
    const urlWithoutConstraint = previewUrl.slice(0, -3);

    return urlWithoutConstraint.concat(size.toString());
  }

  return previewUrl;
};

export const generateAllPreviewSizes = (
  directPreviewUrl: string,
  width: number,
  height: number
) => {
  const aspectRatio = width / height;
  const longestSide = aspectRatio < 1 ? height : width;
  const { origin, pathname } = new URL(directPreviewUrl);
  const [, , scheme, id, hash] = pathname.split("/");

  return ValidCantoSizes.filter((size) => size < longestSide).map((size) => {
    const url = `${origin}/direct/${scheme}/${id}/${hash}/m800/${size}`;

    if (aspectRatio < 1) {
      return { url, width: Math.round(size * aspectRatio), height: size };
    } else {
      return { url, width: size, height: Math.round(size / aspectRatio) };
    }
  });
};
