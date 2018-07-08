import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled, { css } from 'styled-components'
import colorString from 'color-string'

const wheelRadius = 320
const colorCircleSize = 32

const ColorBox = styled.div`
  width: ${colorCircleSize}px;
  height: ${colorCircleSize}px;
  border-radius: 50%;
  transition: transform .2s;
  ${props => props.colorSettinsOpen && `transform: scale(1.8)`};
  cursor: pointer;
`

const ColorBoxWrapper = styled.div`
  height: ${wheelRadius / 2}px;
  transform-origin: center bottom;
  position: absolute;

  &:after {
    content: '';
    width: 6px;
    height: 6px;
    display: block;
    border-radius: 50%;
    top: 48px;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;

    ${props => props.hasChanged && `background-color: #555`};
  }
`

const ColorBlocks = styled.div`
  position: relative;
  height: ${wheelRadius}px;
  width: ${wheelRadius}px;
  padding-left: ${wheelRadius / 2 - colorCircleSize / 2}px;
  z-index: 110;
`

const SlidersBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(255,255,255,0);
  left: 0;
  top: 0;
  z-index: 80;
`

const SlidersContainer = styled.div`

`

const SlidersWrapper = styled.div`
  position: absolute;
  margin-left: 48px;
  height: 100%;
  left: 100%;
  display: flex;
  align-items: center;
  z-index: 100;
  background-color: white;
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

const sliderThumbStyles = css`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #404040;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5px;
`

const sliderTrackStyles = css`
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  background: #D8D8D8;
  border-radius: 2px;
`

const SliderInput = styled.input`
  width: 224px;
  height: 12px;
  -webkit-appearance: none;

  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    ${sliderTrackStyles}
  }
  &::-webkit-slider-thumb {
    ${sliderThumbStyles}
  }
  &:focus::-webkit-slider-runnable-track {
    background: #aaa;
  }
  &::-moz-range-track {
    ${sliderTrackStyles}
  }
  &::-moz-range-thumb {
    ${sliderThumbStyles}
  }
  &::-ms-track {
    ${sliderTrackStyles}
  }
  &::-ms-fill-lower {
    background: #D8D8D8;
    border-radius: 2px;
  }
  &::-ms-fill-upper {
    background: #D8D8D8;
    border-radius: 2px;
  }
  &::-ms-thumb {
    ${sliderThumbStyles}
  }
  &:focus::-ms-fill-lower {
    background: #D8D8D8;
  }
  &:focus::-ms-fill-upper {
    background: #D8D8D8;
  }
`

const SliderTitle = styled.div`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
`

const SliderRow = styled.div`
  margin-bottom: 16px;
`

const ColorCodes = styled.div`
  max-height: 100vh;
  padding: 32px 0;
  overflow: auto;
  font-size: 16px;
  line-height: 24px;
`

class ColorBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      saturationValue: 0,
      desaturationValue: 0,
      lightenValue: 0,
      darkenValue: 0,
      colorSettinsOpen: false
    }
    this.handleSaturationChange = this.handleSaturationChange.bind(this)
    this.handleDesaturationChange = this.handleDesaturationChange.bind(this)
    this.handleLightenChange = this.handleLightenChange.bind(this)
    this.handleDarkenChange = this.handleDarkenChange.bind(this)

    this.handleColorClick = this.handleColorClick.bind(this)
    this.handleSettingsCloseClick = this.handleSettingsCloseClick.bind(this)
  }

  handleSaturationChange (e) {
    this.setState({
      saturationValue: e.target.value,
      desaturationValue: 0
    })
  }

  handleDesaturationChange (e) {
    this.setState({
      desaturationValue: e.target.value,
      saturationValue: 0
    })
  }

  handleLightenChange (e) {
    this.setState({
      lightenValue: e.target.value,
      darkenValue: 0
    })
  }

  handleDarkenChange (e) {
    this.setState({
      darkenValue: e.target.value,
      lightenValue: 0
    })
  }

  handleColorClick (e) {
    if (!this.state.colorSettinsOpen) {
      this.setState({
        colorSettinsOpen: true
      })
    } else {
      this.setState({
        colorSettinsOpen: false
      })
    }
  }

  handleSettingsCloseClick (e) {
    this.setState({
      colorSettinsOpen: false
    })
  }

  render () {
    const settingsHasChanged = this.state.saturationValue > 0 || this.state.desaturationValue > 0 || this.state.lightenValue > 0 || this.state.darkenValue > 0

    return (
      <div>
        <ColorBoxWrapper
          rotateAngle={this.props.rotateAngle}
          onClick={this.handleColorClick}
          hasChanged={settingsHasChanged}
          style={{
            transform: `rotate(${this.props.rotateAngle}deg)`
          }}
        >
          <ColorBox
            colorSettinsOpen={this.state.colorSettinsOpen}
            style={{
              backgroundColor: Color(this.props.color).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue)
            }}
          />
        </ColorBoxWrapper>

        {this.state.colorSettinsOpen &&
          <SlidersContainer>
            <SlidersWrapper>
              <div>
                <div>
                  <SliderRow>
                    <SliderTitle>
                      Saturate
                    </SliderTitle>
                    <SliderInput type='range' min={0} max={1} step='any' value={this.state.saturationValue} onChange={this.handleSaturationChange} />
                  </SliderRow>

                  <SliderRow>
                    <SliderTitle>
                      Desaturate
                    </SliderTitle>
                    <SliderInput type='range' min={0} max={1} step='any' value={this.state.desaturationValue} onChange={this.handleDesaturationChange} />
                  </SliderRow>

                  <SliderRow>
                    <SliderTitle>
                      Lighten
                    </SliderTitle>
                    <SliderInput type='range' min={0} max={1} step='any' value={this.state.lightenValue} onChange={this.handleLightenChange} />
                  </SliderRow>

                  <SliderRow>
                    <SliderTitle>
                      Darken
                    </SliderTitle>
                    <SliderInput type='range' min={0} max={1} step='any' value={this.state.darkenValue} onChange={this.handleDarkenChange} />
                  </SliderRow>
                </div>

                {colorString.to.hex(Color(this.props.color).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue).rgb().round().array())}

              </div>
            </SlidersWrapper>
            <SlidersBackdrop onClick={this.handleColorClick} />
          </SlidersContainer>
        }
      </div>
    )
  }
}

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
            <SliderRow>
              <SliderTitle>
                Hue
              </SliderTitle>
              <SliderInput type='range' min={0} max={359} step='any' value={this.state.initialColorHue} onChange={this.handleInitialColorHue} />
            </SliderRow>

            <SliderRow>
              <SliderTitle>
                Saturation
              </SliderTitle>
              <SliderInput type='range' min={0} max={100} step='any' value={this.state.initialColorSaturation} onChange={this.handleInitialColorSaturation} />
            </SliderRow>

            <SliderRow>
              <SliderTitle>
                Lightness
              </SliderTitle>
              <SliderInput type='range' min={0} max={100} step='any' value={this.state.initialColorLightness} onChange={this.handleInitialColorLightness} />
            </SliderRow>
          </div>
        </LeftSection>

        <CenterSection>
          <ColorBlocks>
            <ColorsAmountInput min={1} max={28} type='number' value={this.state.colorsAmount} onChange={this.handleColorsAmountChange} />

            {colorsList.map((colorItem, index) => (
              <ColorBlock color={colorItem} rotateAngle={index * 360 / this.state.colorsAmount} />
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
