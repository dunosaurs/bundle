import { Command, resolve } from "./deps.ts";
import { bundle } from "./src/bundle.ts";

await new Command()
  // Main command.
  .name("bundle")
  .version("0.1.0")
  .description("The bundler for Deno code")
  .option("-d, --debug", "Enable debug output.")
  .option("-e, --entry <entry:string>", "The entrypoint to bundle", {
    default: "mod.ts",
  })
  .option("-o, --output <output:string>", "The output file to bundle to", {
    default: "bundle.ts",
  })
  .action(async (options) => {
    try {
      await bundle({
        entry: resolve(options.entry),
        output: resolve(options.output),
        debug: options.debug,
      });
    } catch (err) {
      console.error(err);
    }
  })
  .parse(Deno.args);
