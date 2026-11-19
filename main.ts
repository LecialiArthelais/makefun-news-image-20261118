// News-image entry v2: the whole entry is the front-page PNG next to this file.
// The program only copies that PNG into the grader's output folder, so every
// run produces the exact same bytes. Node 22, standard library only.
// No network, no clock, no randomness: the output is a byte copy of entry.png.
// After copying, it verifies the output exists and logs its size and sha256,
// so a failed or partial copy is visible instead of silent.
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = new URL("./entry.png", import.meta.url);
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const bytes = readFileSync(target);
const sha256 = createHash("sha256").update(bytes).digest("hex");
const sourceSha256 = createHash("sha256").update(readFileSync(source)).digest("hex");
if (sha256 !== sourceSha256) {
  throw new Error(`copy mismatch: output ${sha256} != source ${sourceSha256}`);
}
console.log(`entry.png: ${statSync(target).size} bytes, sha256 ${sha256}`);
