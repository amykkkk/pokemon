import axios from "axios";
import { Pokemon } from "./types";

const BASE_URL = `https://pokeapi.co/api/v2`;

const OFFSET = 20;
export const getAll = async (/*{ pageParam = 0 }*/) => {
  return await axios
    .get(`${BASE_URL}/pokemon`, {
      params: { /*offeset: pageParam,*/ limit: OFFSET },
    })
    .then((res) => res.data.results);
};

export const getInfo = async (num: number) => {
  return await axios.get(`${BASE_URL}/pokemon/${num}`).then((res) => res.data);
};
