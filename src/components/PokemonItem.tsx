import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFn } from "../api";

import { Pokemon, PokemonList } from "../type/types";
import "../App.scss";

export default function PokemonItem({ name, url }: PokemonList) {
  const { data } = useQuery<Pokemon>(["pokemon", name], () => fetchFn(url));

  return (
    <Link to={`/${name}`} state={url} className="card">
      <span className="num">No.{data?.id}</span>
      <div className="img">
        <img src={data?.sprites.front_default} alt={name} />
      </div>
      <h2>{name}</h2>
      {data?.types.map((type: any) => (
        <span className={`type ${type.type.name}`} key={type.slot}>
          {type.type.name}
        </span>
      ))}
    </Link>
  );
}
