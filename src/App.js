import React, { useState, useEffect, useCallback } from "react";
import {
  PlanetInfoBox,
  PlanetNameBox,
  PlanetName,
  PlanetDetailsBox,
  PlanetDetail,
  Button,
} from "./components/styled";
import api from "./services/api";
import { ZoomyDiv } from "./components/animations";
import "./App.css";

export default function App() {
  const [planet, setPlanet] = useState(null);
  const [films, setFilms] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleFilms = useCallback(async (filmUrl) => {
    const { data } = await api.get(
      filmUrl.replace("https://swapi.dev/api/", "")
    );
    const { title } = data;
    setFilms((oldFilms) => [...oldFilms, title]);
    setLoading(false);
  }, []);

  const handleLoad = useCallback(async () => {
    try {
      setLoading(true);
      setErr(false);
      setPlanet(null);

      const random = Math.random() * 61 + 1;
      const { data } = await api.get(`planets/${random.toFixed(0)}`);

      setPlanet(data);
      setLoading(false);

      Promise.all(
        data.films.map(async (filmUrl) => await handleFilms(filmUrl))
      );
    } catch (err) {
      setErr(true);
    }
  }, [handleFilms]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return (
    <div className="App">
      <img
        src="https://starwarsblog.starwars.com/wp-content/uploads/2015/10/Seastrom_HeaderPhoto-2400x1200-900792609620.jpg"
        className="AppBackground"
        alt="stars-background"
      />
      {loading && (
        <PlanetInfoBox backgroundColor="#01242d">
          <img
            src="https://i.gifer.com/SxF.gif"
            className="Loading"
            alt="bb8-loading"
          />
        </PlanetInfoBox>
      )}

      {!!err && (
        <ZoomyDiv animation="1s">
          <PlanetInfoBox padding="5vw">
            <img
              src={require("./images/r2d2.png")}
              className="ErrorImage"
              alt="error"
            />
            <h1 className="Error">{err}</h1>
            <Button onClick={handleLoad}> Try Again </Button>
          </PlanetInfoBox>
        </ZoomyDiv>
      )}

      {!!planet && (
        <ZoomyDiv>
          <PlanetInfoBox>
            <PlanetNameBox>
              <PlanetName>{planet.name}</PlanetName>
            </PlanetNameBox>
            <PlanetDetailsBox>
              <PlanetDetail>
                <strong className="CustomFont">{`PoPuLATioN: `}</strong>
                {planet.population !== "unknown"
                  ? parseInt(planet.population).toLocaleString()
                  : planet.population}
              </PlanetDetail>
              <PlanetDetail>
                <strong className="CustomFont">{`CLiMATE: `}</strong>
                {planet.climate}
              </PlanetDetail>
              <PlanetDetail>
                <strong className="CustomFont">{`TERRAiN: `}</strong>
                {planet.terrain}
              </PlanetDetail>
              <PlanetDetail>
                <strong className="CustomFont">{`FEATURED iN ${films.length} 
                  ${films.length === 1 ? "FiLM" : "FiLMS"}`}</strong>
              </PlanetDetail>
            </PlanetDetailsBox>

            <Button onClick={handleLoad}> NEW PLANET </Button>
          </PlanetInfoBox>
        </ZoomyDiv>
      )}
    </div>
  );
}
