import { defineNuxtModule } from "@nuxt/kit";
import { resolve } from "path";

export default defineNuxtModule({
  meta: {
    name: "whisky",
    configKey: "whisky",
  },

  setup(moduleOptions, nuxt) {
    const themeDir = resolve(__dirname, "..");

    nuxt.hook("pages:extend", (pages) => {
      pages.push({
        name: "Whisky",
        path: "/whisky/list",
        file: resolve(themeDir, "whisky/pages/list/Whisky.vue"),
      });

      pages.push({
        name: "WhiskyRegister",
        path: "/whisky/register",
        file: resolve(themeDir, "whisky/pages/register/Register.vue"),
      });
    });

    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(__dirname, "store"));
    });
  },
});
