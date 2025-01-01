import CleanCSS from "clean-css";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");

  eleventyConfig.addFilter("cssmin", (code) => {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
}
