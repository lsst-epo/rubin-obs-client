export default {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
          grid: false,
        },
        stage: 2,
        features: {
          "logical-properties-and-values": false,
        },
      },
    ],
    [
      "postcss-normalize",
      {
        allowDuplicates: false,
      },
    ],
    [
      "@csstools/postcss-global-data",
      { files: ["./theme/styles/abstracts/media.css"] },
    ],
    "postcss-custom-media",
  ],
};
