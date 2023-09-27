import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemonEvolutionChain } from "../api";
import { styled } from "styled-components";

const EvoWrap = styled.ul`
  display: flex;
  width: 100%;
`;

export default function EvoItem({ pokemon }: any) {
  const [currentEvolution, setCurrentEvolution] = useState<any>([]);
  const [evoChain, setEvoChain] = useState<any>([]);

  useEffect(() => {
    try {
      fetchPokemonEvolutionChain(pokemon.id).then((data) => {
        setEvoChain([]);
        setCurrentEvolution(data.chain);
      });
    } catch (error) {
      console.log(error, "dddd");
    }
  }, [pokemon]);

  useEffect(() => {
    try {
      getNextEvolution();
    } catch (error) {
      console.log(error, "detail");
    }
  }, [currentEvolution]);

  const getNextEvolution = () => {
    if (
      currentEvolution.length === 0 ||
      currentEvolution.evolves_to.length === 0
    )
      return null;

    const current = currentEvolution.species.name;
    const next = currentEvolution.evolves_to[0].species.name;

    const level = currentEvolution.evolves_to[0].evolution_details[0].min_level;
    const currentId =
      currentEvolution.id || extractId(currentEvolution.species.url);
    const nextId = extractId(currentEvolution.evolves_to[0].species.url);

    const imgBaseURL =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

    const currentImage = imgBaseURL + currentId + ".svg";
    const nextImage = imgBaseURL + nextId + ".svg";

    setCurrentEvolution((prev: any) => prev.evolves_to[0]);

    setEvoChain((prev: any) => {
      return [
        ...prev,
        {
          current,
          next,
          level,
          currentId,
          nextId,
          currentImage,
          nextImage,
        },
      ];
    });
  };

  const extractId = (url: any) => {
    return url.match(/\/(\d+)\//)[1];
  };

  return (
    <>
      {evoChain.length === 0 && <div> This pokemon doesn't evolove</div>}
      {evoChain.map((e: any, i: any) => {
        return (
          <EvoWrap key={i}>
            <li className="evo-from">
              <Link to={"/"}>
                <div className="pokeball">
                  <img alt={e.current} src={e.currentImage} />
                  <span>{e.current}</span>
                </div>
              </Link>
            </li>
            <li className="trigger">
              <span className="arrow"></span>
              Lvl {e.level}
            </li>
            <li className="evo-to">
              <Link to={"/"}>
                <div className="pokeball">
                  <img alt={e.next} src={e.nextImage} />
                </div>
                <span>{e.next}</span>
              </Link>
            </li>
          </EvoWrap>
        );
      })}
    </>
  );
}
