import { retry } from "https://deno.land/std@0.188.0/async/mod.ts";

const req = async () => {
  // some function that throws sometimes
  const req = await fetch("https://example.com");
  return await req.text();
};

// Below resolves to the first non-error result of `req`
const retryPromise = await retry(req, {
  multiplier: 2,
  maxTimeout: 60000,
  maxAttempts: 5,
  minTimeout: 100,
});

console.log(retryPromise);
