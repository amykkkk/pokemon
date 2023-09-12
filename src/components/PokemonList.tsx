import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Pokemon } from "../types";
import PokemonItem from "./PokemonItem";

const ListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 2rem auto;

  > div {
    width: calc((100% - 4rem) / 5);
    margin-right: 1rem;
    margin-bottom: 1rem;

    &:nth-child(5n) {
      margin-right: 0;
    }
  }
`;

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const allPokemonData = [];
      for (let i = 1; i <= 10; i++) {
        setLoading(true);

        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${i}`
        );

        allPokemonData.push({ ...response.data });
        setPokemonData(allPokemonData);

        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(pokemonData);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <ListWrap>
          {pokemonData.map((pokemon: Pokemon) => (
            <PokemonItem
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprites={pokemon.sprites}
              types={pokemon.types[0].type}
            />
          ))}
        </ListWrap>
      )}
    </div>
  );
}
