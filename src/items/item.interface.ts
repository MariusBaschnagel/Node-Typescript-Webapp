export interface BaseItem {
    name: string;
    description: string;
    image: string;
    steps: number;
    rating: number;
  }
  
  export interface Item extends BaseItem {
    id: number;
  }