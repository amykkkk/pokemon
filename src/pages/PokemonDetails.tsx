import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../api";
import EvoItem from "../components/EvoItem";
import Process from "../components/Process";

import "../App.scss";
import { styled } from "styled-components";
import { PiCaretCircleLeftBold } from "react-icons/pi";

const Loder = styled.div``;

const List = styled.div`
  font-size: 2rem;
  background: #393939;
  color: white;
  padding: 1rem 1rem 3rem;
  margin-bottom: -5rem;

  svg {
    vertical-align: middle;
  }
`;

const ContBox = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  &.img {
    flex: 0 0 45%;
  }
`;
const InfoTable = styled.table`
  border-spacing: 2px;
  width: 100%;
  margin-top: 2rem;

  &:last-child {
    border-top: 2px solid #f2f2f2;
    margin-top: 1rem;
    padding-top: 1rem;
  }

  td {
    padding: 2px 0;
    text-transform: capitalize;

    &:first-child {
      width: 35%;
    }
    &:nth-child(2) {
      font-weight: bold;
    }
  }
`;

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const { isLoading, data: pokemonInfo } = useQuery<any>(
    ["pokemonInfo", name],
    () => getInfo(`${name}`)
  );
  const navigate = useNavigate();

  return (
    <div>
      {isLoading ? (
        <Loder>Loading...</Loder>
      ) : (
        <>
          <List onClick={() => navigate(-1)}>
            <PiCaretCircleLeftBold />
          </List>
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
                <h2 className="title">{name}</h2>
                <InfoTable>
                  <tbody>
                    <tr>
                      <td>height</td>
                      <td>{pokemonInfo.height}</td>
                    </tr>
                    <tr>
                      <td>weight</td>
                      <td>{pokemonInfo.weight}</td>
                    </tr>
                    <tr>
                      <td>Species</td>
                      <td>
                        {pokemonInfo.types.map((type: any) => (
                          <Link
                            className={`type ${type.type.name}`}
                            key={type.slot}
                            to={type.type.url}
                          >
                            {type.type.name}
                          </Link>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Ability</td>
                      <td>
                        {pokemonInfo.abilities.map((power: any) => (
                          <Link
                            className="type"
                            key={power.slot}
                            to={power.ability.url}
                          >
                            {power.ability.name}
                          </Link>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </InfoTable>
                <InfoTable>
                  <tbody>
                    {pokemonInfo.stats.map((stats: any, index: number) => (
                      <tr key={index}>
                        <td>{stats.stat.name}</td>
                        <td className="clearfix">
                          {stats.base_stat}
                          <Process value={stats.base_stat} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </InfoTable>
              </ContBox>
            </div>
          </section>
          <section id="evolution">
            <div className="row-w">
              <EvoItem pokemon={pokemonInfo} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
