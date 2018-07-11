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
  ${props => props.colorIsHighlighted && `box-shadow: 0 0 0 4px white, 0 0 0 6px rgba(0,0,0,.5);`};
  cursor: pointer;
`

const SecColorBox = styled.div`
  width: ${colorCircleSize}px;
  height: ${colorCircleSize}px;
  border-radius: 50%;
  transition: transform .2s;
  ${props => props.secColorSettinsOpen && `transform: scale(1.8)`};
  cursor: pointer;
  position: relative;
  top: 20px;
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
    top: 39px;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    z-index: -1;

    ${props => props.hasChanged && `background-color: #555`};
  }
`

const SlidersBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(255,0,0,0);
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
  display: flex;
`

class WheelItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      saturationValue: 0,
      desaturationValue: 0,
      lightenValue: 0,
      darkenValue: 0,

      colorSettinsOpen: false,
      secColorSettinsOpen: false,

      secSaturationValue: 0,
      secDesaturationValue: 0,
      secLightenValue: 0,
      secDarkenValue: 0,

      showSecColor: false,
      settingsLinked: true,

      colorIsHighlighted: false
    }
    this.handleSaturationChange = this.handleSaturationChange.bind(this)
    this.handleDesaturationChange = this.handleDesaturationChange.bind(this)
    this.handleLightenChange = this.handleLightenChange.bind(this)
    this.handleDarkenChange = this.handleDarkenChange.bind(this)

    this.handleColorClick = this.handleColorClick.bind(this)
    this.handleSettingsCloseClick = this.handleSettingsCloseClick.bind(this)
    this.handleBackdropClick = this.handleBackdropClick.bind(this)
    this.handleSecColorClick = this.handleSecColorClick.bind(this)

    this.handleSecSaturationChange = this.handleSecSaturationChange.bind(this)
    this.handleSecDesaturationChange = this.handleSecDesaturationChange.bind(this)
    this.handleSecLightenChange = this.handleSecLightenChange.bind(this)
    this.handleSecDarkenChange = this.handleSecDarkenChange.bind(this)

    this.handleDuplicate = this.handleDuplicate.bind(this)
    this.handleRemoveDuplicate = this.handleRemoveDuplicate.bind(this)
    this.handleColorCodeHover = this.handleColorCodeHover.bind(this)
  }

  handleSaturationChange (e) {
    if (this.state.showSecColor) {
      this.setState({
        saturationValue: e.target.value,
        desaturationValue: 0,

        settingsLinked: false
      })
    } else {
      this.setState({
        saturationValue: e.target.value,
        desaturationValue: 0,

        secSaturationValue: e.target.value,
        secDesaturationValue: 0
      })
    }
  }

  handleDesaturationChange (e) {
    if (this.state.showSecColor) {
      this.setState({
        desaturationValue: e.target.value,
        saturationValue: 0,

        settingsLinked: false
      })
    } else {
      this.setState({
        desaturationValue: e.target.value,
        saturationValue: 0,

        secDesaturationValue: e.target.value,
        secSaturationValue: 0
      })
    }
  }

  handleLightenChange (e) {
    if (this.state.showSecColor) {
      this.setState({
        lightenValue: e.target.value,
        darkenValue: 0,

        settingsLinked: false
      })
    } else {
      this.setState({
        lightenValue: e.target.value,
        darkenValue: 0,

        secLightenValue: e.target.value,
        secDarkenValue: 0
      })
    }
  }

  handleDarkenChange (e) {
    if (this.state.showSecColor) {
      this.setState({
        darkenValue: e.target.value,
        lightenValue: 0,

        settingsLinked: false
      })
    } else {
      this.setState({
        darkenValue: e.target.value,
        lightenValue: 0,

        secDarkenValue: e.target.value,
        secLightenValue: 0
      })
    }
  }

  handleSecSaturationChange (e) {
    this.setState({
      settingsLinked: false,
      secSaturationValue: e.target.value,
      secDesaturationValue: 0
    })
  }

  handleSecDesaturationChange (e) {
    this.setState({
      settingsLinked: false,
      secDesaturationValue: e.target.value,
      secSaturationValue: 0
    })
  }

  handleSecLightenChange (e) {
    this.setState({
      settingsLinked: false,
      secLightenValue: e.target.value,
      secDarkenValue: 0
    })
  }

  handleSecDarkenChange (e) {
    this.setState({
      settingsLinked: false,
      secDarkenValue: e.target.value,
      secLightenValue: 0
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

  handleSecColorClick (e) {
    if (!this.state.secColorSettinsOpen) {
      this.setState({
        secColorSettinsOpen: true
      })
    } else {
      this.setState({
        secColorSettinsOpen: false
      })
    }
  }

  handleSettingsCloseClick (e) {
    this.setState({
      colorSettinsOpen: false,
      secColorSettinsOpen: false
    })
  }

  handleBackdropClick (e) {
    this.setState({
      colorSettinsOpen: false,
      secColorSettinsOpen: false
    })
  }

  handleDuplicate () {
    this.setState({
      showSecColor: true,
      colorSettinsOpen: false,
      secColorSettinsOpen: true
    })
  }

  handleRemoveDuplicate () {
    this.setState({
      showSecColor: false,
      secColorSettinsOpen: false
    })
  }

  handleColorCodeHover () {
    if (this.state.colorIsHighlighted) {
      this.setState({
        colorIsHighlighted: false
      })
    } else {
      this.setState({
        colorIsHighlighted: true
      })
    }
  }

  render () {
    const settingsHasChanged = this.state.saturationValue > 0 || this.state.desaturationValue > 0 || this.state.lightenValue > 0 || this.state.darkenValue > 0

    return (
      <WheelItemWrapper>
        <ColorBoxWrapper
          rotateAngle={this.props.rotateAngle}
          hasChanged={settingsHasChanged}
          style={{
            transform: `rotate(${this.props.rotateAngle}deg)`
          }}
        >
          <ColorBox
            onClick={this.handleColorClick}
            colorSettinsOpen={this.state.colorSettinsOpen}
            colorIsHighlighted={this.state.colorIsHighlighted}
            style={{
              backgroundColor: Color(this.props.color).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue)
            }}
          />
          {this.state.showSecColor && (
            <SecColorBox
              secColorSettinsOpen={this.state.secColorSettinsOpen}
              onClick={this.handleSecColorClick}
              style={{ width: 32, backgroundColor: Color(this.props.color).saturate(this.state.settingsLinked ? this.state.saturationValue : this.state.secSaturationValue).desaturate(this.state.settingsLinked ? this.state.desaturationValue : this.state.secDesaturationValue).lighten(this.state.settingsLinked ? this.state.lightenValue : this.state.secLightenValue).darken(this.state.settingsLinked ? this.state.darkenValue : this.state.secDarkenValue) }}
            />
          )}
        </ColorBoxWrapper>

        {(this.state.secColorSettinsOpen || this.state.colorSettinsOpen) && (
          <SlidersBackdrop onClick={this.handleBackdropClick} />
        )}

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

                <div onClick={this.handleDuplicate}>
                  Duplicate
                </div>
              </div>
            </SlidersWrapper>
          </SlidersContainer>
        )}

        {this.state.secColorSettinsOpen && (
          <SlidersContainer>
            <SlidersWrapper>
              <div>
                <SliderBox
                  label='Saturate'
                  sliderValue={this.state.secSaturationValue}
                  sliderOnChange={this.handleSecSaturationChange}
                  min={0}
                  max={1}
                />

                <SliderBox
                  label='Desaturate'
                  sliderValue={this.state.secDesaturationValue}
                  sliderOnChange={this.handleSecDesaturationChange}
                  min={0}
                  max={1}
                />

                <SliderBox
                  label='Lighten'
                  sliderValue={this.state.secLightenValue}
                  sliderOnChange={this.handleSecLightenChange}
                  min={0}
                  max={1}
                />

                <SliderBox
                  label='Darken'
                  sliderValue={this.state.secDarkenValue}
                  sliderOnChange={this.handleSecDarkenChange}
                  min={0}
                  max={1}
                />

                <div onClick={this.handleRemoveDuplicate}>
                  Remove
                </div>
              </div>
            </SlidersWrapper>
          </SlidersContainer>
        )}

        <ColorCodesSection style={{ top: `-100px` }}>
          <div onMouseOver={this.handleColorCodeHover} onMouseOut={this.handleColorCodeHover}>{colorString.to.hex(Color(this.props.color).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue).rgb().round().array())}</div>

          {this.state.showSecColor && (<span>&nbsp;+&nbsp;</span>)}

          {this.state.showSecColor && colorString.to.hex(Color(this.props.color).saturate(this.state.secSaturationValue).desaturate(this.state.secDesaturationValue).lighten(this.state.secLightenValue).darken(this.state.secDarkenValue).rgb().round().array())}
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
