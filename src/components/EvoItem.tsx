import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvo } from "../api";
import { styled } from "styled-components";
import { PiArrowFatLinesRightBold } from "react-icons/pi";

const EvoWrap = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  li {
    width: calc((100% - 10rem) / 3);
    text-align: center;
    padding: 1rem;

    &.evo-box {
      background: #fff;
      clip-path: polygon(10% 0%, 100% 0, 100% 100%, 0 100%, 0% 10%);
      border-radius: 10px;
    }
    &.trigger {
      width: 5rem;
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
  const [evoChain, setEvoChain] = useState<any>([]);

  useEffect(() => {
    getEvo(pokemon.id).then((data) => {
      setCurrentEvolution(data.chain);
    });
  }, [pokemon]);

  useEffect(() => {
    getNextEvolution();
  }, [currentEvolution]);

  const getNextEvolution = () => {
    if (
      currentEvolution.length === 0 ||
      currentEvolution.evolves_to.length === 0
    )
      return null;

    const babyId =
      currentEvolution.id || extractId(currentEvolution.species.url);
    const nextId = extractId(currentEvolution.evolves_to[0].species.url);
    const finalId = extractId(
      currentEvolution.evolves_to[0].evolves_to[0].species.url
    );

    const imgBaseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

    setEvoChain({
      baby: currentEvolution.species.name,
      next: currentEvolution.evolves_to[0].species.name,
      final: currentEvolution.evolves_to[0].evolves_to[0].species.name,
      level: currentEvolution.evolves_to[0].evolution_details[0].min_level,
      level2:
        currentEvolution.evolves_to[0].evolves_to[0].evolution_details[0]
          .min_level,
      babyImage: imgBaseURL + babyId + ".png",
      nextImage: imgBaseURL + nextId + ".png",
      finalImage: imgBaseURL + finalId + ".png",
    });
  };

  const extractId = (url: any) => {
    return url.match(/\/(\d+)\//)[1];
  };

  return (
    <>
      {evoChain.length === 0 && <h4> This pokemon doesn't evolove</h4>}
      <EvoWrap>
        <li className="evo-box">
          <Link to={`/${evoChain.baby}`}>
            <div className="pokeball">
              <img alt={evoChain.baby} src={evoChain.babyImage} />
            </div>
            <p>{evoChain.baby}</p>
          </Link>
        </li>
        <li className="trigger">
          <span className="icon">
            <PiArrowFatLinesRightBold />
          </span>
          Lvl {evoChain.level}
        </li>
        <li className="evo-box">
          <Link to={`/${evoChain.next}`}>
            <div className="pokeball">
              <img alt={evoChain.next} src={evoChain.nextImage} />
            </div>
            <p>{evoChain.next}</p>
          </Link>
        </li>
        <li className="trigger">
          <span className="icon">
            <PiArrowFatLinesRightBold />
          </span>
          Lvl {evoChain.level2}
        </li>
        <li className="evo-box">
          <Link to={`/${evoChain.final}`}>
            <div className="pokeball">
              <img alt={evoChain.final} src={evoChain.finalImage} />
            </div>
            <p>{evoChain.final}</p>
          </Link>
        </li>
      </EvoWrap>
    </>
  );
}
