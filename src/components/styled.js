import styled from 'styled-components';
import '../App.css'

export const PlanetInfoBox = styled.div`
  border-radius: ${props => props.borderRadius || '2%' };
  background-color: ${props => props.backgroundColor || 'rgba(255, 255, 255, 0.9)'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 70%;
  padding: ${props => props.padding || '0'};
  overflow: hidden;
  border: ${props => props.border || 'none'}
`

export const PlanetNameBox = styled.div`
  border-width: 1px #ffffff90;
  border-bottom: solid;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1vh 1vh;
  height: 100%;
  width: 100%;
`

export const PlanetName = styled.h1`
  color: #222;
  font-size: 8vh;
  font-family: 'Starjedi', sans-serif;
  letter-spacing: 0.1em
  text-transform: lowercase
`

export const PlanetDetailsBox = styled.div`
  padding: 5vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const PlanetDetail = styled.p`
  font-size: 3vh;
  text-transform: uppercase;
`

export const Button = styled.button`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 30px;
  font-size: 3vh;
  background-color: #e0cc1b;
  border: 1px transparent;
  border-radius: 5px;
  transition: 0.5;
  cursor: pointer;
  font-weight: '1000';
  transition: 0.5s;
`