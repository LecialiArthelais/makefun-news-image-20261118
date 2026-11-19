// News-image entry: the whole entry is the front-page PNG next to this file.
// The program only copies that PNG into the grader's output folder, so every
// run produces the exact same bytes. Node 22, standard library only.
// No network, no clock, no randomness: the output is a byte copy of entry.png.
// Local run: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(new URL("./entry.png", import.meta.url), join(outDir, "entry.png"));
