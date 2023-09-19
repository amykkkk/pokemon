import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import PokemonDetails from "./pages/PokemonDetails";
import Login from "./pages/Login";
import PokemonList from "./pages/PokemonList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PokemonList />,
      },
      {
        path: ":name",
        element: <PokemonDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
