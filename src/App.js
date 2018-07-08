import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import colorString from 'color-string'
import Wheel from './components/wheel'
import SliderBox from './components/slider-box'

const wheelRadius = 320
const colorCircleSize = 32

const ColorBlocks = styled.div`
  position: relative;
  height: ${wheelRadius}px;
  width: ${wheelRadius}px;
  padding-left: ${wheelRadius / 2 - colorCircleSize / 2}px;
  z-index: 110;
`

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
`

const LeftSection = styled.div`
  padding-right: 48px;
  padding-left: 88px;
`

const CenterSection = styled.div`
  flex: 2;
`

const RightSection = styled.div`
  padding-right: 88px;
  padding-left: 48px;
  text-align: right;
  border-left: 1px solid rgba(0,0,0,.1);
  max-height: 100vh;
  align-self: stretch;
  display: flex;
  align-items: center;
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

  &::-webkit-inner-spin-button {
    appearance: none;
  }
`

const ColorCodes = styled.div`
  max-height: 100vh;
  padding: 32px 0;
  overflow: auto;
  font-size: 16px;
  line-height: 24px;
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
            />
            <SliderBox
              label='Saturation'
              sliderValue={this.state.initialColorSaturation}
              sliderOnChange={this.handleInitialColorSaturation}
              min={0}
              max={100}
            />
            <SliderBox
              label='Lightness'
              sliderValue={this.state.initialColorLightness}
              sliderOnChange={this.handleInitialColorLightness}
              min={0}
              max={100}
            />
          </div>
        </LeftSection>

        <CenterSection>
          <ColorBlocks>
            <ColorsAmountInput min={1} max={28} type='number' value={this.state.colorsAmount} onChange={this.handleColorsAmountChange} />

            {colorsList.map((colorItem, index) => (
              <Wheel color={colorItem} rotateAngle={index * 360 / this.state.colorsAmount} />
            ))}
          </ColorBlocks>
        </CenterSection>

        <RightSection>
          <ColorCodes>
            {colorsList.map((colorItem, index) => (
              <div>
                {colorString.to.hex(Color(colorItem).rgb().round().array())}
              </div>
            ))}
          </ColorCodes>
        </RightSection>

      </MainContainer>
    )
  }
}

export default App
