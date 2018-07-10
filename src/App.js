import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import Wheel from './components/wheel'
import SliderBox from './components/slider-box'
import SliderPanel from './components/slider-panel'

const wheelRadius = 320

const Logo = styled.div`
  position: absolute;
  top: 72px;
  left: 88px;
`

const WheelHelper = styled.div`
  width: ${wheelRadius}px;
  position: relative;
`

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  min-width: 1240px;
`

const LeftSection = styled.div`
  padding-right: 48px;
  padding-left: 88px;
`

const CenterSection = styled.div`
  flex: 2;
`

const ColorsAmountInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 56px;
  height: 40px;
  z-index: 2;
  font: inherit;
  border: 0;
  text-align: center;
  font-size: 24px;
  padding: 4px;
  color: inherit;
  appearance: none;
  z-index: 120;

  &::-webkit-inner-spin-button {
    appearance: none;
  }
`

const ColorRectangle = styled.div`
  ${props => props.selected && `border-left: 8px solid black;`}
`

const baseColorsState = {
  saturationValue: 0.2,
  desaturationValue: 0,
  lightenValue: 0,
  darkenValue: 0
}

const getColorsArray = (length) => {
  const array = new Array(length)

  return array.fill({ ...baseColorsState })
}

class App extends Component {
  constructor (props) {
    super(props)
    const defaultState = {
      initialColor: 'blue',
      initialColorHue: 153,
      initialColorLightness: 56,
      initialColorSaturation: 35,
      colorsAmount: 2,
      colors: getColorsArray(2),
      selectedColorIndex: 0
    }
    const hashState = this.getHashObject()

    this.state = hashState || defaultState

    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleColorsAmountChange = this.handleColorsAmountChange.bind(this)

    this.handleInitialColorHue = this.handleInitialColorHue.bind(this)
    this.handleInitialColorLightness = this.handleInitialColorLightness.bind(this)
    this.handleInitialColorSaturation = this.handleInitialColorSaturation.bind(this)
    this.updateHash = this.updateHash.bind(this)
    this.handleColorClick = this.handleColorClick.bind(this)

    this.handleSaturationChange = this.handleSaturationChange.bind(this)
  }

  componentDidUpdate () {
    this.updateHash()
  }

  updateHash () {
    window.location.hash = encodeURI(JSON.stringify(this.state))
  }

  getHash () {
    const hash = decodeURI(window.location.hash)

    if (hash) {
      return hash.substr(1, hash.length)
    }

    return null
  }

  getHashObject () {
    return JSON.parse(this.getHash())
  }

  handleInitialColorHue (e) {
    this.setState({
      initialColorHue: e.target.value
    })
  }

  handleInitialColorLightness (e) {
    this.setState({
      initialColorLightness: e.target.value
    })
  }

  handleInitialColorSaturation (e) {
    this.setState({
      initialColorSaturation: e.target.value
    })
  }

  handleSaturationChange (e) {
    var stateCopy = Object.assign({}, this.state)
    stateCopy.colors = stateCopy.colors.slice()
    stateCopy.colors[this.state.selectedColorIndex] = Object.assign({}, stateCopy.colors[this.state.selectedColorIndex])
    stateCopy.colors[this.state.selectedColorIndex].saturationValue = e.target.value
    this.setState(stateCopy)
  }

  handleColorChange (e) {
    this.setState({
      initialColor: e.target.value
    })
  }

  handleColorsAmountChange (e) {
    this.setState({
      colorsAmount: e.target.value,
      colors: getColorsArray(+e.target.value)
    })
  }

  handleColorClick (index) {
    this.setState({
      selectedColorIndex: index
    })
  }

  render () {
    const getInitialColor = () => {
      return `hsl(${this.state.initialColorHue}, ${this.state.initialColorSaturation}%, ${this.state.initialColorLightness}%)`
    }

    const colorsList = []

    let step
    for (step = 0; step < this.state.colorsAmount; step++) {
      colorsList.push(Color(getInitialColor()).rotate(step * 360 / this.state.colorsAmount).string())
    }

    return (
      <MainContainer>
        <Logo>
          Wheel
        </Logo>
        <LeftSection>
          <div>
            <SliderBox
              label='Hue'
              sliderValue={this.state.initialColorHue}
              sliderOnChange={this.handleInitialColorHue}
              min={0}
              max={359}
              step={0.1}
            />
            <SliderBox
              label='Saturation'
              sliderValue={this.state.initialColorSaturation}
              sliderOnChange={this.handleInitialColorSaturation}
              min={0}
              max={100}
              step={0.1}
            />
            <SliderBox
              label='Lightness'
              sliderValue={this.state.initialColorLightness}
              sliderOnChange={this.handleInitialColorLightness}
              min={0}
              max={100}
              step={0.1}
            />
          </div>
        </LeftSection>

        <CenterSection>
          <WheelHelper>
            <ColorsAmountInput min={1} max={28} type='number' value={this.state.colorsAmount} onChange={this.handleColorsAmountChange} />

            {colorsList.map((color, index) => (
              <ColorRectangle
                style={{
                  background: this.state.selectedColorIndex === index
                    ? Color(color).saturate(this.state.colors[this.state.selectedColorIndex].saturationValue)
                    : color
                }}
                onClick={() => this.handleColorClick(index)}
                selected={index === this.state.selectedColorIndex}
              >
                .
                {console.log(this.state.colors[this.state.selectedColorIndex].saturationValue)}
              </ColorRectangle>
            ))}
          </WheelHelper>
        </CenterSection>

        <input
          min={0}
          max={1}
          type='range'
          step={0.1}
          value={this.state.colors[this.state.selectedColorIndex].saturationValue}
          onChange={this.handleSaturationChange}
        />

      </MainContainer>
    )
  }
}

export default App
