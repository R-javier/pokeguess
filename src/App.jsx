import React, { useState, useEffect } from "react";
import { Stack, Heading, Image, Text, Input, Button } from "@chakra-ui/react";

import axios from "axios";
import "./App.css";
const obtenerPokemon = async () => {
  let url = `https://pokeapi.co/api/v2/pokemon/${
    Math.round(Math.random() * 20) + 1
  }`;
  const result = await axios.get(url);
  //ayuda pokemon 😄
  // console.log(result);

  return result.data;
};
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [status, setStatus] = useState("LOADING");
  const [nombrePokemon, setNombrePokemon] = useState("");

  useEffect(() => {
    obtenerPokemon().then((pokemon) => {
      setPokemon(pokemon);
      setStatus("PLAYING");
    });
  }, []);

  function handleSubmit() {
    setStatus(
      nombrePokemon.toLowerCase() === pokemon.name.toLowerCase()
        ? "SUCC"
        : "FAIL"
    );
    setNombrePokemon("");
  }

  function handleReset() {
    obtenerPokemon().then((pokemon) => {
      setPokemon(pokemon);
    });
  }

  return (
    <div className="fondo">
      <Stack className="App" w="100vw" h="100vh" justify="center">
        <Heading className="titulo">¿ Quién es este pokemon ?</Heading>

        {status !== "LOADING" && (
          <Stack direction="row" justify="center">
            <Image
              className="imagen"
              h={300}
              w={300}
              style={{
                imageRendering: "pixelated",
                filter: `brightness(${status === "SUCC" ? 1 : 0})`,
                transition: "filter 2s",
              }}
              src={pokemon.sprites.front_default}
              alt="pokemon"
            />
          </Stack>
        )}
        {status === "SUCC" ? (
          <Stack
            direction="column"
            justify="center"
            display="flex"
            alignItems="center"
          >
            <Text
              color="green.300"
              fontSize="lg"
              textShadow="1px 3px 3px black"
            >
              {pokemon.name}✔️
            </Text>
            <Stack direction="row" justify="center">
              <Button
                size="sm"
                autoFocus
                className="nes-btn is-warning"
                onClick={() => handleReset()}
              >
                Jugar de nuevo
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack justify="center" direction="row">
            <Stack
              direction="row"
              maxW="400px"
              justify="space-between"
              display="flex"
              alignItems="center"
            >
              <Input
                p="0px 0px 0px 90px"
                className="input.is-error"
                value={nombrePokemon}
                onChange={(event) => {
                  setNombrePokemon(event.target.value);
                }}
                type="text"
              />
              <Button
                className="nes-btn is-danger"
                size="sm"
                onClick={() => handleSubmit()}
              >
                Go !
              </Button>
            </Stack>
          </Stack>
        )}

        <Stack direction="row" justify="center">
          <Button
            p="2px 57px 2px 57px"
            colorScheme="orange"
            textShadow="2px 2px 5px black"
            onClick={() => handleReset()}
          >
            Dame otro pokemon!
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
