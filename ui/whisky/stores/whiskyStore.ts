import { defineStore } from "pinia";
import { whiskyState } from "./whiskyState";
import { whiskyAction } from "./whiskyActions";

export const useWhiskyStore = defineStore("whiskyStore", {
  state: whiskyState,
  actions: whiskyAction,
});
