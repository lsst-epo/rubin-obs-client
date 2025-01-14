type ValidCantoSize = 100 | 240 | 320 | 500 | 640 | 800 | 2050;

export const ValidCantoSizes: Array<ValidCantoSize> = [
  100, 240, 320, 500, 640, 800, 2050,
];

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
