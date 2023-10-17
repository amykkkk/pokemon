import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAll } from "../api";
import { Pokemon } from "../type/types";
import { useObserver } from "../hooks/useObserver";

import InputBox from "../components/InputBox";
import PokemonItem from "../components/PokemonItem";
import SelectBox from "../components/SelectBox";

import styled from "styled-components";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import Loading from "../components/Loading";

const ListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;

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
  margin: 2rem 0;
`;
const Target = styled.div`
  height: 1px;
`;

export default function PokemonList() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<any>("");

  const {
    data: AllpokemonList, // data.pages를 갖고 있는 배열
    fetchNextPage, //  다음 페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부, Boolean
    isFetchingNextPage, // 추가 페이지 fetching 여부, Boolean
    status, // 💡 loading, error, success 중 하나의 상태, string
  } = useInfiniteQuery<any>(
    ["allPokemon", search],
    ({ pageParam = 0 }) => getAll(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { next } = lastPage;
        if (!next) return false;
        return Number(new URL(next).searchParams.get("offset"));
      },
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.results),
        pageParams: data.pageParams,
      }),
    }
  );

  /* 무한 스크롤 */
  const { setTarget } = useObserver({
    hasNextPage,
    fetchNextPage,
  });

  /* 필터링 함수 */
  const filterData = AllpokemonList?.pages.filter((pokemon: any) => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  const sortData = () => {
    if (typeFilter === "sortByHighId") {
      return filterData?.sort().reverse();
    } else if (typeFilter === "sortByLowName") {
      return filterData?.sort((a: any, b: any) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      );
    } else if (typeFilter === "sortByHighName") {
      return filterData?.sort((a: any, b: any) =>
        a.name < b.name ? 1 : a.name > b.name ? -1 : 0
      );
    }
  };
  sortData();

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

        <div className="drop-box">
          <SelectBox
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTypeFilter(e.target.value)
            }
          />
          <span className="input-icon icon">
            <AiFillCaretDown />
          </span>
        </div>
      </FilterWrap>

      {status === "loading" ? (
        <Loading />
      ) : (
        <ListWrap>
          {filterData?.map((group: any, index: any) => (
            <li key={index}>
              <PokemonItem name={group.name} url={group.url} />
            </li>
          ))}
        </ListWrap>
      )}
      {isFetchingNextPage && <Loading />}
      <Target ref={setTarget} />
    </div>
  );
}
