import styled from "styled-components";
import { Pokemon } from "../type/types";
import { Link } from "react-router-dom";
import "../App.scss";

export default function PokemonItem({ sprites, name, types, id }: Pokemon) {
  return (
    <Link to={`/${name}`} className="card">
      <span className="num">No.{id}</span>
      <div className="img">
        <img src={sprites.front_default} alt={name} />
      </div>
      <h2>{name}</h2>
      {types.map((type: any) => (
        <span className={`type ${type.type.name}`} key={type.slot}>
          {type.type.name}
        </span>
      ))}
    </Link>
  );
}
