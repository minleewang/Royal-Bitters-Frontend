export interface WhiskyState {
  whiskyList: Whisky[];
  whisky: Whisky | null;

  currentPage: Number;
  totalPages: Number;
}

export interface Whisky {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
}
