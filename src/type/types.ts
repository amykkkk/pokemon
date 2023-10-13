export interface PokemonList {
  url: string;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: [
    slot: number,
    type: {
      name: string;
    }
  ];
}
