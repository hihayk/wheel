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
  width: ${colorCircleSize}px;
  transform-origin: center bottom;
  position: absolute;
  top: 0;
  margin-left: ${wheelRadius / 2 - colorCircleSize / 2}px;

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

const WheelWrapper = styled.div`
  z-index: 110;
  position: relative;
  height: ${wheelRadius}px;
  width: ${wheelRadius}px;
`

const WheelItemWrapper = styled.div`
`

const SlidersWrapper = styled.div`
  margin-left: 48px;
  height: 100%;
  left: 100%;
  display: flex;
  align-items: center;
  z-index: 120;
  background-color: white;
  position: absolute;
  top: 0;
`

const ColorCodesSection = styled.div`
  border-left: 1px solid rgba(0,0,0,.1);
  margin-left: ${wheelRadius + 244 + 96}px;
  padding-left: 48px;
  font-size: 16px;
  line-height: 24px;
  position: relative;
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
      <WheelItemWrapper>
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
            </SlidersWrapper>
            <SlidersBackdrop onClick={this.handleColorClick} />
          </SlidersContainer>
        )}

        <ColorCodesSection style={{ top: `-100px` }}>
          {colorString.to.hex(Color(this.props.color).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue).rgb().round().array())}
        </ColorCodesSection>
      </WheelItemWrapper>
    )
  }
}

const Wheel = ({ colorsList, colorsAmount }) => (
  <WheelWrapper>
    {colorsList.map((colorsListItem, index) => (
      <WheelItem rotateAngle={index * 360 / colorsAmount} color={colorsListItem} colorsAmount={colorsAmount} key={index} />
    ))}
  </WheelWrapper>
)

export default Wheel
