import { brightGreen, esbuild, resolve } from "../deps.ts";

export const debug_plugin: esbuild.Plugin = {
  name: "debug",
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      console.log(
        `${brightGreen("Resolving")} "${resolve(args.resolveDir, args.path)}"`,
      );
      return null;
    });
  },
};
