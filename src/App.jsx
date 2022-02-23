import React, { useState, useEffect } from "react";
import { Stack, Heading, Image, Text, Input, Button } from "@chakra-ui/react";

import axios from "axios";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokeimg, setPokeImg] = useState("");
  const [status, setStatus] = useState(["GUESSING" | "SUCC" | "FAIL"]);
  const [nombrePokemon, setNombrePokemon] = useState("");

  useEffect(() => {
    const obtenerPokemon = async () => {
      let url = `https://pokeapi.co/api/v2/pokemon/${Math.round(
        Math.random() * 20
      )}`;
      const result = await axios.get(url);
      //ayuda pokemon 😄
      // console.log(result);
      setPokemon(result.data);
      setPokeImg(result.data.sprites.front_default);
    };
    obtenerPokemon();
  }, []);

  function handleSubmit() {
    event.preventDefault();
    setStatus(nombrePokemon === pokemon.name ? "SUCC" : "FAIL");
    setNombrePokemon("");
  }

  function handleReset() {
    window.location.reload();
  }

  return (
    <div className="fondo">
      <Stack className="App" w="100vw" h="100vh" justify="center">
        <Heading className="titulo">¿ Quién es este pokemon ?</Heading>

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
            src={pokeimg}
            alt="pokemon"
          />
        </Stack>
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
