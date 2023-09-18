import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Pokemon } from "../types";
import PokemonItem from "./PokemonItem";
import { useQuery } from "@tanstack/react-query";
import { getAll, getInfo } from "../api";
import { useParams } from "react-router-dom";

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
  const { isLoading, data } = useQuery<any>(["allPokemon"], getAll);

  useEffect(() => {
    async function fetchData() {
      const pokemonAll: any = [];
      for (let i = 1; i <= data?.length; i++) {
        const response = await getInfo(i);
        pokemonAll.push(response);
      }
      setPokemonData(pokemonAll);
    }

    fetchData();
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ListWrap>
          {pokemonData.map((pokemon: Pokemon, index: number) => (
            <li key={index}>
              <PokemonItem
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
