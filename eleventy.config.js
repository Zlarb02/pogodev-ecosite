const Image = require("@11ty/eleventy-img");
const path = require("path");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("./src/css/");
  
  // Pass through CSS files
  eleventyConfig.addPassthroughCopy("dist/css");

  eleventyConfig.addPassthroughCopy({
    "src/js": "js"
});

eleventyConfig.addPassthroughCopy({
  "src/locales": "locales"
});

  eleventyConfig.addAsyncShortcode("optimizedImage", async (src, alt) => {
    const imagePath = path.join(__dirname, "src", src);

    await Image(imagePath, {
      widths: [300, 600, 900],
      formats: ["avif", "webp", "jpeg"],
      outputDir: path.join(__dirname, "dist", "img"),
      urlPath: "/img/",
      cacheOptions: {
        duration: "1w",
      },
    });

    return Image.generateHTML(stats, {
      alt,
      loading: "lazy",
      decoding: "async",
      sizes: "(max-width: 768px) 100vw, 50vw",
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "dist",
    },
    templateFormats: ["njk", "md", "11ty.js"],
  };
};