import React, { Component } from 'react'
import Color from 'color'
import styled from 'styled-components'
import colorString from 'color-string'
import SliderBox from './slider-box'

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

class WheelItem extends Component {
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

          {this.state.colorSettinsOpen && (
            <SlidersContainer>
              <SlidersWrapper>
                <div>
                  <div>
                    <SliderBox
                      label='Saturate'
                      sliderValue={this.state.saturationValue}
                      sliderOnChange={this.handleSaturationChange}
                      min={0}
                      max={1}
                    />

                    <SliderBox
                      label='Desaturate'
                      sliderValue={this.state.desaturationValue}
                      sliderOnChange={this.handleDesaturationChange}
                      min={0}
                      max={1}
                    />

                    <SliderBox
                      label='Lighten'
                      sliderValue={this.state.lightenValue}
                      sliderOnChange={this.handleLightenChange}
                      min={0}
                      max={1}
                    />

                    <SliderBox
                      label='Darken'
                      sliderValue={this.state.darkenValue}
                      sliderOnChange={this.handleDarkenChange}
                      min={0}
                      max={1}
                    />
                  </div>

                  {colorString.to.hex(Color(this.props.color).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue).rgb().round().array())}

                </div>
              </SlidersWrapper>
              <SlidersBackdrop onClick={this.handleColorClick} />
            </SlidersContainer>
          )}
        </div>
      </div>
    )
  }
}

const Wheel = ({ colorsList, colorsAmount }) => (
  <div>
    {colorsList.map((colorsListItem, index) => (
      <WheelItem rotateAngle={index * 360 / colorsAmount} color={colorsListItem} />
    ))}
  </div>
)

export default Wheel
