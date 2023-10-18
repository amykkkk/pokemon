import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvo } from "../api";
import { styled } from "styled-components";
import { PiArrowFatLinesRightBold } from "react-icons/pi";
import Loading from "./Loading";

const EvoWrap = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  .evo-box {
    background: #fff;
    clip-path: polygon(2rem 0%, 100% 0, 100% 100%, 0 100%, 0% 2rem);
    border-radius: 10px;
    padding: 1rem 2rem;
  }

  li {
    text-align: center;

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .trigger {
      padding: 0 1rem;
      font-size: 0.875rem;
    }
    .pokeball {
      img {
        width: auto;
        height: 20vw;
      }
    }
    span {
      display: block;
    }
    p {
      margin: 0;
      margin-top: 1rem;
      font-size: 1.125rem;
      font-weight: bold;
    }
  }
`;

export default function EvoItem({ pokemon }: any) {
  const [currentEvolution, setCurrentEvolution] = useState<any>([]);

  useEffect(() => {
    getEvo(pokemon.id).then((data) => {
      setCurrentEvolution(data.chain);
    });
  }, [pokemon]);

  const extractId = (url: any) => {
    return url.match(/\/(\d+)\//)[1];
  };

  return (
    <>
      {currentEvolution.length === 0 ? (
        <Loading />
      ) : (
        <>
          {currentEvolution.evolves_to.length === 0 ? (
            <h4> This pokemon doesn't evolove</h4>
          ) : (
            <EvoWrap>
              <li className="evo-box">
                <Link to={`/${currentEvolution.species.name}`}>
                  <div className="pokeball">
                    <img
                      alt={currentEvolution.species.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractId(
                        currentEvolution.species.url
                      )}.png`}
                    />
                  </div>
                  <p>{currentEvolution.species.name}</p>
                </Link>
              </li>
              <li>
                {currentEvolution.evolves_to.map((evo: any) => (
                  <div key={evo.species.name}>
                    <p className="trigger">
                      <span className="icon">
                        <PiArrowFatLinesRightBold />
                      </span>

                      {evo.evolution_details[0].min_level === null
                        ? evo.evolution_details[0].item?.name
                        : `Lvl ${evo.evolution_details[0].min_level}`}
                    </p>
                    <Link to={`/${evo.species.name}`} className="evo-box">
                      <div className="pokeball">
                        <img
                          alt={evo.species.name}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractId(
                            evo.species.url
                          )}.png`}
                        />
                      </div>
                      <p>{evo.species.name}</p>
                    </Link>
                  </div>
                ))}
              </li>

              {currentEvolution.evolves_to[0].evolves_to.length !== 0 && (
                <li>
                  <div>
                    <p className="trigger">
                      <span className="icon">
                        <PiArrowFatLinesRightBold />
                      </span>
                      {currentEvolution.evolves_to[0].evolves_to[0]
                        .evolution_details[0].trigger.name === "use-item"
                        ? currentEvolution.evolves_to[0].evolves_to[0]
                            .evolution_details[0].item.name
                        : `Lvl ${currentEvolution.evolves_to[0].evolves_to[0].evolution_details[0].min_level}`}
                    </p>
                    <Link
                      to={`/${currentEvolution.evolves_to[0].evolves_to[0].species.name}`}
                      className="evo-box"
                    >
                      <div className="pokeball">
                        <img
                          alt={
                            currentEvolution.evolves_to[0].evolves_to[0].species
                              .name
                          }
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractId(
                            currentEvolution.evolves_to[0].evolves_to[0].species
                              .url
                          )}.png`}
                        />
                      </div>
                      <p>
                        {
                          currentEvolution.evolves_to[0].evolves_to[0].species
                            .name
                        }
                      </p>
                    </Link>
                  </div>
                </li>
              )}
            </EvoWrap>
          )}
        </>
      )}
    </>
  );
}
