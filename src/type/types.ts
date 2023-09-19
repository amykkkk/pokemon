export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
  };
  types: any;
}
