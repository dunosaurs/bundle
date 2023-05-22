import { brightGreen, brightRed, deno_plugins, esbuild } from "../deps.ts";
import { debug_plugin } from "./debug_plugin.ts";

export interface BundleOptions {
  /** The path to the entrypoint */
  entry: string;

  /** The path for the output bundle */
  output: string;

  /** Whether to print debug messages */
  debug?: boolean;
}

export async function bundle(options: BundleOptions) {
  try {
    Deno.lstatSync(options.entry);
  } catch {
    throw `${brightRed("Bundle Error")} "${options.entry}" does not exist`;
  }

  await esbuild.build({
    bundle: true,
    outfile: options.output,
    entryPoints: [options.entry],
    plugins: options.debug ? [debug_plugin, ...deno_plugins()] : deno_plugins(),
    write: true,
    minify: true,
    format: "esm",
    platform: "neutral",
  });

  console.log(`${brightGreen("Output")} "${options.output}"`);

  esbuild.stop();
}
