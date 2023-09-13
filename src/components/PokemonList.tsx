import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Pokemon } from "../types";
import PokemonItem from "./PokemonItem";

const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin: 2rem auto;

  > li {
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const allPokemonData = [];
      for (let i = 1; i <= 10; i++) {
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
            <li>
              <PokemonItem
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                sprites={pokemon.sprites}
                types={pokemon.types}
              />
            </li>
          ))}
        </ListWrap>
      )}
    </div>
  );
}
