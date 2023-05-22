import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.188.0/testing/asserts.ts";
import $ from "https://deno.land/x/dax@0.31.1/mod.ts";

Deno.test("Able to install", async () => {
  await $`deno task install`.quiet();
});

Deno.test("Able to print help message", async () => {
  assert((await $`bundle -h`.text()).includes("Show this help"));
});

Deno.test("Able to bundle basic example", async () => {
  await $`bundle -e ./test/basic/mod.ts`.quiet();

  assertEquals(
    await $`deno run ./bundle.ts`.text(),
    "hi\nThis is a side module!",
  );
});

Deno.test("Able to bundle tla example", async () => {
  await $`bundle -e ./test/tla/mod.ts`.quiet();

  assert(
    (await $`deno run --allow-net ./bundle.ts`.text()).includes(
      "Example Domain",
    ),
  );
});

Deno.test("Able to bundle remote example", async () => {
  await $`bundle -e ./test/remote/mod.ts`.quiet();

  assert(
    (await $`deno run --allow-net ./bundle.ts`.text()).includes(
      "Example Domain",
    ),
  );
});
