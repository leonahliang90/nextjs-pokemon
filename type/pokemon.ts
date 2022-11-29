export type PokemonType = {
  id: number;
  image: string;
  name: string;
}

export type PokemonDetailType = {
  name: string;
  type: string[];
  stats: Stat[];
  image: string;
}

export type Stat = {
  name: string;
  value: number;
}