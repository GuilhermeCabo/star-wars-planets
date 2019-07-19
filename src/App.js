import React, { Component } from 'react';
import { PlanetInfoBox, PlanetNameBox, PlanetName, PlanetDetailsBox, PlanetDetail,
         Button
      } from './components/styled'
import api from './services/api'
import { ZoomyDiv } from './components/animations'
import './App.css';

export default class App extends Component {
  componentDidMount() {
    this.handlePlanet()
  }

  constructor(props) {
    super(props)

    this.state = {
      planet: null,
      films: [],
      err: null,
      loading: true
    }
  }

  async handlePlanet() {
    this.setState( { planet: null, loading: true, err: null, films: [] } )
    try {
      const random = (Math.random() * 61) + 1
      const { data } = await api.get(`planets/${random.toFixed(0)}`)
      this.setState( { planet: data, loading: false } )
      data.films.forEach((filmUrl) => { this.handleFilms(filmUrl) })
    } catch (err) {
      this.setState(
        { 
          loading: false,
          planet: null,
          films: [],
          err: `Our robots crashed while exploring the planet. Please, try again`
        }
      )
    }
  }
  
  async handleFilms(filmUrl) {
    const { data } = await api.get(filmUrl.replace('https://swapi.co/api/', ''))
    const { title } = data
    this.setState(prevState => ({
      films: [...prevState.films, title],
      loading: false
    }))
  }

  render() {
    const { planet, films, loading, err } = this.state
    return (
      <div className='App'>
        <img
          src='https://starwarsblog.starwars.com/wp-content/uploads/2015/10/Seastrom_HeaderPhoto-2400x1200-900792609620.jpg'
          className='AppBackground'
          alt='stars-background'
        />
        {loading && (
          <PlanetInfoBox backgroundColor='#01242d'>
            <img 
              src='https://i.gifer.com/SxF.gif' 
              className='Loading' 
              alt='bb8-loading'
            />
          </PlanetInfoBox>
        )}

        {!!err && (
          <ZoomyDiv animation='1s'>
            <PlanetInfoBox padding='5vw'>
              <img src={require('./images/r2d2.png')} className='ErrorImage' alt='error'/>
              <h1 className='Error'>{err}</h1>
              <Button onClick={() => this.handlePlanet()}> Try Again </Button>
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
                  <strong className='CustomFont'>{`PoPuLATioN: `}</strong>
                  { planet.population !== 'unknown' ? 
                  parseInt(planet.population).toLocaleString()
                  : planet.population }
                </PlanetDetail>
                <PlanetDetail>
                  <strong className='CustomFont'>{`CLiMATE: `}</strong>
                  {planet.climate}
                </PlanetDetail>
                <PlanetDetail>
                <strong className='CustomFont'>{`TERRAiN: `}</strong>
                {planet.terrain}
                </PlanetDetail>
                <PlanetDetail>
                  <strong className='CustomFont'>{`FEATURED iN ${films.length} 
                  ${films.length === 1 ? 'FiLM' : 'FiLMS'}`}</strong>
                </PlanetDetail>
              </PlanetDetailsBox>

              <Button onClick={() => this.handlePlanet()}> NEW PLANET </Button>
            </PlanetInfoBox>
          </ZoomyDiv>
        )}
      </div>
    );
  }
}
