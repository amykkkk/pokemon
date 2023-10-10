import axios from "axios";
import { Pokemon } from "./type/types";

const BASE_URL = `https://pokeapi.co/api/v2`;

const OFFSET = 20;
export const getAll = async (/*{ pageParam = 0 }*/) => {
  return await axios
    .get(`${BASE_URL}/pokemon`, {
      params: { /*offeset: pageParam,*/ limit: OFFSET },
    })
    .then((res) => res.data.results);
};

export const getInfo = async (num: number | string) => {
  return await axios.get(`${BASE_URL}/pokemon/${num}`).then((res) => res.data);
};

export const getType = async () => {
  return await axios.get(`${BASE_URL}/type`).then((res) => res.data.results);
};

export const getEvo = async (pokemonId: number) => {
  return await axios
    .get(`${BASE_URL}/pokemon-species/${pokemonId}`)
    .then((data) => {
      const evoChainId = data.data.evolution_chain.url.match(/\/(\d+)\//)[1];

      return axios
        .get(`${BASE_URL}/evolution-chain/${evoChainId}`)
        .then((res) => res.data);
    });
};
