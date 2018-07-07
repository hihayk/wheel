import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
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
`

const SlidersWrapper = styled.div`
  position: absolute;
  margin-left: 64px;
  height: 100%;
  left: 100%;
  display: flex;
  align-items: center;
`

const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
`

const LeftSection = styled.div`
  flex: 1;
  padding-left: 88px;
`

const CenterSection = styled.div`

`

const RightSection = styled.div`
  flex: 1;
  padding-right: 88px;
  text-align: right;
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
  text-align: right;
  font-size: 24px;
  padding: 4px;
  color: inherit;
`

const ColorInput = styled.input`
  border: none;
  padding: 0;
  width: ${colorCircleSize}px;
  height: ${colorCircleSize}px;
  border-radius: 50%;
  apparience: none;

  position: absolute;
  top: 0;
  left: ${wheelRadius / 2 - colorCircleSize / 2}px;
  z-index: 1;

  &::-webkit-color-swatch {
    border-radius: 50%;
    border: none;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }
`

const SliderInput = styled.input`
  width: 256px;
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
    this.setState({
      colorSettinsOpen: true
    })
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

              <div onClick={this.handleSettingsCloseClick}>close</div>
            </div>
          </SlidersWrapper>
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
      initialColor: '#2EA194',
      colorsAmount: 12,
      colorSettinsOpen: false
    }
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleColorsAmountChange = this.handleColorsAmountChange.bind(this)
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
    const initialColor = this.state.initialColor
    const colorsList = []

    let step
    for (step = 0; step < this.state.colorsAmount; step++) {
      colorsList.push(Color(initialColor).rotate(step * 360 / this.state.colorsAmount).string())
    }

    return (
      <MainContainer>
        <LeftSection>
          Wheel
        </LeftSection>

        <CenterSection>
          <ColorBlocks>
            <ColorsAmountInput min={1} max={28} type='number' value={this.state.colorsAmount} onChange={this.handleColorsAmountChange} />
            <ColorInput type='color' value={this.state.initialColor} onChange={this.handleColorChange} />

            {colorsList.map((colorItem, index) => (
              <ColorBlock color={colorItem} rotateAngle={index * 360 / this.state.colorsAmount} />
            ))}
          </ColorBlocks>
        </CenterSection>

        <RightSection>
          {colorsList.map((colorItem, index) => (
            <div>
              {colorString.to.hex(Color(colorItem).rgb().round().array())}
            </div>
          ))}
        </RightSection>

      </MainContainer>
    )
  }
}

export default App
