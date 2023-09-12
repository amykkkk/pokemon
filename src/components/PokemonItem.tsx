import styled from "styled-components";
import { Pokemon } from "../types";

const ItemBox = styled.div`
  a {
    display: block;
    color: inherit;
    text-decoration: none;
    text-align: center;
    background-color: beige;
    border-radius: 10px;
    padding: 1rem;
  }
  h2 {
    color: #333;
    font-size: 1.25rem;
    text-transform: capitalize;
  }
  p {
    margin: 0;
    line-height: 1.5;
    margin-top: 0.5rem;
    white-space: normal;
  }
`;

export default function PokemonItem({ sprites, name, types }: Pokemon) {
  return (
    <ItemBox>
      <a href="">
        <div className="img">
          <img src={sprites.front_default} alt={name} />
        </div>
        <h2>{name}</h2>
        <span>{types.name}</span>
      </a>
    </ItemBox>
  );
}
