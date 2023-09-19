import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../api";
import "../App.scss";

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>();
  const { isLoading, data } = useQuery<any>(["pokemonInfo", name], () =>
    getInfo(`${name}`)
  );

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="card">
          <div className="img">
            <img
              src={
                data["sprites"]["other"]["official-artwork"]["front_default"]
              }
              alt={name}
            />
          </div>
          <h2>{name}</h2>
          <p>height: {data.height}</p>
          <p>weight: {data.weight}</p>
          {data.types.map((type: any) => (
            <Link
              className={`type ${type.type.name}`}
              key={type.slot}
              to={type.type.url}
            >
              {type.type.name}
            </Link>
          ))}

          <br />
          {data.abilities.map((power: any) => (
            <Link className="type" key={power.slot} to={power.ability.url}>
              {power.ability.name}
            </Link>
          ))}
          <ul>
            {data.stats.map((stats: any, index: number) => (
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
