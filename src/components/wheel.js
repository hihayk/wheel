import React, { Component } from 'react'
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

const WheelWrapper = styled.div`
  z-index: 110;
  position: relative;
  height: ${wheelRadius}px;
  width: ${wheelRadius}px;
`

const WheelItemWrapper = styled.div`
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
      rotateValue: 0,
      colorSettinsOpen: false
    }
    this.handleSaturationChange = this.handleSaturationChange.bind(this)
    this.handleDesaturationChange = this.handleDesaturationChange.bind(this)
    this.handleLightenChange = this.handleLightenChange.bind(this)
    this.handleDarkenChange = this.handleDarkenChange.bind(this)
    this.handleRotateChange = this.handleRotateChange.bind(this)

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

  handleRotateChange (e) {
    this.setState({
      rotateValue: e.target.value
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
    const settingsHasChanged = this.state.saturationValue > 0 || this.state.desaturationValue > 0 || this.state.lightenValue > 0 || this.state.darkenValue > 0 || this.state.rotateValue > 0

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
              backgroundColor: Color(this.props.color).rotate(this.state.rotateValue).saturate(this.state.saturationValue).desaturate(this.state.desaturationValue).lighten(this.state.lightenValue).darken(this.state.darkenValue)
            }}
          />
        </ColorBoxWrapper>

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
