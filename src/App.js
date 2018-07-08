import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import Wheel from './components/wheel'
import SliderBox from './components/slider-box'

const wheelRadius = 320

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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      saturationValue: 0,
      initialColor: 'blue',
      initialColorHue: 153,
      initialColorLightness: 56,
      initialColorSaturation: 35,
      colorsAmount: 21
    }
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleColorsAmountChange = this.handleColorsAmountChange.bind(this)

    this.handleInitialColorHue = this.handleInitialColorHue.bind(this)
    this.handleInitialColorLightness = this.handleInitialColorLightness.bind(this)
    this.handleInitialColorSaturation = this.handleInitialColorSaturation.bind(this)
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
    this.setState({
      saturationValue: e.target.value
    })
  }

  handleColorChange (e) {
    this.setState({
      initialColor: e.target.value
    })
  }

  handleColorsAmountChange (e) {
    this.setState({
      colorsAmount: e.target.value
    })
  }

  render () {
    const getInitialColor = () => {
      return `hsl(${this.state.initialColorHue}, ${this.state.initialColorSaturation}%, ${this.state.initialColorLightness}%)`
    }

    console.log(getInitialColor())

    const colorsList = []

    let step
    for (step = 0; step < this.state.colorsAmount; step++) {
      colorsList.push(Color(getInitialColor()).rotate(step * 360 / this.state.colorsAmount).string())
    }

    return (
      <MainContainer>
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
            <Wheel colorsList={colorsList} colorsAmount={this.state.colorsAmount} />
          </WheelHelper>
        </CenterSection>

      </MainContainer>
    )
  }
}

export default App
