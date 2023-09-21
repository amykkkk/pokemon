import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../api";
import "../App.scss";
import { styled } from "styled-components";

const Loder = styled.div``;
const ContBox = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
`;

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const { isLoading, data: pokemonInfo } = useQuery<any>(
    ["pokemonInfo", name],
    () => getInfo(`${name}`)
  );

  return (
    <div>
      {isLoading ? (
        <Loder>Loading...</Loder>
      ) : (
        <>
          <section id="main-cont">
            <div className="cont row-w">
              <ContBox className="img">
                <img
                  src={
                    pokemonInfo["sprites"]["other"]["official-artwork"][
                      "front_default"
                    ]
                  }
                  alt={name}
                />
              </ContBox>
              <ContBox>
                <h3>{name}</h3>
                <p>height: {pokemonInfo.height}</p>
                <p>weight: {pokemonInfo.weight}</p>
                {pokemonInfo.types.map((type: any) => (
                  <Link
                    className={`type ${type.type.name}`}
                    key={type.slot}
                    to={type.type.url}
                  >
                    {type.type.name}
                  </Link>
                ))}

                <br />
                {pokemonInfo.abilities.map((power: any) => (
                  <Link
                    className="type"
                    key={power.slot}
                    to={power.ability.url}
                  >
                    {power.ability.name}
                  </Link>
                ))}
                <ul>
                  {pokemonInfo.stats.map((stats: any, index: number) => (
                    <li key={index}>
                      {stats.stat.name} <span>{stats.base_stat}</span>
                    </li>
                  ))}
                </ul>
              </ContBox>
            </div>
          </section>
          <section id="evolution">
            <div className="cont row-w"></div>
          </section>
        </>
      )}
    </div>
  );
}
