import React, { useState, useEffect } from "react";
import {
  Stack,
  Heading,
  Box,
  Image,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import "./App.css";
const obtenerPokemon = async () => {
  let url = `https://pokeapi.co/api/v2/pokemon/${
    Math.round(Math.random() * 40) + 1
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
      setStatus("PLAYING");
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
                transition: "filter 0.2s",
                filter: `brightness(${
                  status === "SUCC" ? 1 : 0 || status === "FAIL" ? 1 : 0
                })`,
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
            <Text color="black" fontSize="lg" textShadow="2px 4px 4px green">
              {pokemon.name}✔️
            </Text>

            <Stack direction="row" justify="center">
              <Button
                size="sm"
                autoFocus
                class="nes-btn is-success"
                onClick={() => handleReset()}
              >
                Jugar de nuevo
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack direction="column" justify="center">
            <Stack>
              {status === "FAIL" ? (
                <Stack alignItems="center">
                  <Text
                    textShadow="1px 1px 1px black"
                    alignItems="center"
                    color="red"
                  >
                    {" "}
                    Intenta otra vez !!!
                  </Text>
                  <Box background="blackAlpha.500" w="20%" p={3} color="white">
                    <Stack direction="row" alignItems="center" justify="center">
                      <Text color="black">
                        El pokemon era:<br></br>
                        <Text textShadow="1px 3px 3px black" color="green.200">
                          {pokemon.name}
                        </Text>
                      </Text>
                    </Stack>
                    <Button
                      size="sm"
                      autoFocus
                      class="nes-btn is-success"
                      onClick={() => handleReset()}
                    >
                      Jugar de nuevo
                    </Button>
                  </Box>
                </Stack>
              ) : (
                <Text></Text>
              )}
            </Stack>
            <Stack justify="center" direction="row">
              <Stack
                direction="row"
                maxW="400px"
                justify="space-between"
                display="flex"
                alignItems="center"
              >
                <Input
                  background="blackAlpha.500"
                  color="white"
                  p="0px 0px 0px 30px"
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
          </Stack>
        )}

        <Stack direction="row" justify="center">
          <Stack direction="column" spacing={35} alignItems="center">
            <Button
              p="2px 57px 2px 57px"
              textShadow="2px 2px 5px black"
              background="orange.500"
              colorScheme="orange"
              color="white"
              onClick={() => handleReset()}
            >
              Dame otro pokemon!
            </Button>
            <Stack direction="row">
              <Text textShadow="4px 4px 8px black" color="#f7d51d">
                Pokeguess by Jav3to
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
