import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from "../types";
import axios from "axios";
import "../App.scss";
import { Link } from "react-router-dom";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const [pokemonData, setPokemonData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setPokemonData(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);
  console.log(pokemonData.id);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="card">
          <div className="img">
            <img
              src={
                pokemonData["sprites"]["other"]["official-artwork"][
                  "front_default"
                ]
              }
              alt={name}
            />
          </div>
          <h2>{name}</h2>
          <p>height: {pokemonData.height}</p>
          <p>weight: {pokemonData.weight}</p>
          {pokemonData.types.map((type: any) => (
            <Link
              className={`type ${type.type.name}`}
              key={type.slot}
              to={type.type.url}
            >
              {type.type.name}
            </Link>
          ))}

          <br />
          {pokemonData.abilities.map((power: any) => (
            <Link className="type" key={power.slot} to={power.ability.url}>
              {power.ability.name}
            </Link>
          ))}
          <ul>
            {pokemonData.stats.map((stats: any, index: number) => (
              <li key={index}>
                {stats.stat.name} <span>{stats.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
