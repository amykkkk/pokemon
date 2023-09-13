import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PokemonDetails from "./components/PokemonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "/:name",
    //     element: <PokemonDetails />,
    //   },
    // ],
  },
  {
    path: "/:name",
    element: <PokemonDetails />,
  },
]);
