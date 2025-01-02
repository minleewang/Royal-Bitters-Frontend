import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
  meta: {
    name: "beer",
    configKey: "beer",
  },

  setup(moduleOptions, nuxt) {
    const themeDir = resolve(__dirname, "..");

    nuxt.hook("pages:extend", (pages) => {
      pages.push({
        name: "Beer",
        path: "/beer/list",
        file: resolve(themeDir, "beer/pages/list/Beer.vue"),
      });

      pages.push({
        name: "BeerRegister",
        path: "/beer/register",
        file: resolve(themeDir, "beer/pages/register/Register.vue"),
      });
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "store"));
    });
  },
});
