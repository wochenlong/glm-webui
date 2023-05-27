import { Context, Schema } from "koishi";
import {} from "@koishijs/plugin-console";

import { resolve } from "path";

export const name = "glm-webui";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.using(["console"], (ctx) => {
    ctx.console.addEntry({
      dev: resolve(__dirname, "../client/index.ts"),
      prod: resolve(__dirname, "../dist"),
    });
  });
}
