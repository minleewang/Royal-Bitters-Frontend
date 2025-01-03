import { Whisky } from "./whiskyType";

export const whiskyState = () => ({
  whiskyList: [] as Whisky[],
  whisky: null as Whisky | null,

  currentPage: 1,
  totalPages: 0,
});
