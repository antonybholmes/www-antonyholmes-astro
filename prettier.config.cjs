// eslint-disable-next-line no-undef
module.exports = {
  arrowParens: "avoid",
  semi: false,
  tabWidth: 2,
  plugins: [
    // eslint-disable-next-line no-undef
    require.resolve("prettier-plugin-astro"),
    // eslint-disable-next-line no-undef
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-organize-imports"),
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
