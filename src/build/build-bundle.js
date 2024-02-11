const esbuild = require("esbuild");

const IS_WATCH_MODE = process.env.IS_WATCH_MODE;

const TARGET_ENTRIES = [
  {
    target: "node16",
    entryPoints: ["src/server/main.ts"],
    platform: "node",
    outfile: "./release/server/main.js",
  },
  {
    target: "es2020",
    entryPoints: ["src/client/main.ts"],
    outfile: "./release/client/main.js",
  },
  {
    target: "es2020",
    entryPoints: ["src/html/progressbar.ts"],
    outfile: "./release/html/progressbar.js",
  },
  {
    target: "es2020",
    entryPoints: ["src/html/notify.ts"],
    outfile: "./release/html/notify.js",
  },
  {
    format: "esm",
    loader: { ".html": "copy" },
    entryPoints: ["src/html/index.html"],
    outfile: "./release/html/index.html",
  },
  {
    format: "esm",
    loader: { ".css": "copy" },
    entryPoints: ["src/html/css/styles.css"],
    outfile: "./release/html/css/styles.css",
  },
];

const buildBundle = async () => {
  try {
    const baseOptions = {
      logLevel: "info",
      bundle: true,
      charset: "utf8",
      minifyWhitespace: true,
      absWorkingDir: process.cwd(),
    };

    for (const targetOpts of TARGET_ENTRIES) {
      const mergedOpts = { ...baseOptions, ...targetOpts };

      console.log("[ESBuild] Building ", targetOpts.outfile);

      if (IS_WATCH_MODE) {
        mergedOpts.watch = {
          onRebuild(error) {
            if (error)
              console.error(
                `[ESBuild Watch] (${targetOpts.entryPoints[0]}) Failed to rebuild bundle`
              );
            else
              console.log(
                `[ESBuild Watch] (${targetOpts.entryPoints[0]}) Sucessfully rebuilt bundle`
              );
          },
        };
      }

      const { errors } = await esbuild.build(mergedOpts);

      if (errors.length) {
        console.error(`[ESBuild] Bundle failed with ${errors.length} errors`);
        process.exit(1);
      }
    }
  } catch (e) {
    console.log("[ESBuild] Build failed with error");
    console.error(e);
    process.exit(1);
  }
};

buildBundle().catch(() => process.exit(1));