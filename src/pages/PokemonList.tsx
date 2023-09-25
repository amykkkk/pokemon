import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAll, getInfo } from "../api";
import { Pokemon } from "../type/types";

import InputBox from "../components/InputBox";
import PokemonItem from "../components/PokemonItem";

import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

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
const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

export default function PokemonList() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const { isLoading, data } = useQuery<any>(["allPokemon"], getAll);

  const [search, setSearch] = useState("");
  const filterMonster = pokemonData.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  console.log(filterMonster);

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
    <div className="row-w">
      <FilterWrap>
        <div className="search-bar">
          {/* <form> -> query params */}
          <InputBox
            place="검색어를 입력해주세요."
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          >
            <span className="input-icon icon">
              <AiOutlineSearch />
            </span>
          </InputBox>
        </div>

        {/* <div className="drop-box">
          <SelectBox options={options} />
          <span className="input-icon icon">
            <AiFillCaretDown />
          </span>
        </div> */}
      </FilterWrap>
      {isLoading ? (
        "Loading..."
      ) : (
        <ListWrap>
          {filterMonster.map((pokemon: Pokemon, index: number) => (
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
