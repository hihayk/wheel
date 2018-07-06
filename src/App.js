import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'

const ColorBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`

const ColorBoxWrapper = styled.div`
  height: 240px;
  transform-origin: center center;
  transform: rotate(${props => props.rotateAngle}deg);
  position: absolute;
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      saturationValue: 0,
      initialColor: '#2EA194',
      colorsAmount: 12
    }
    this.handleSaturationChange = this.handleSaturationChange.bind(this)
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
      <div style={{margin: 128}}>
        Wheel

        <br />

        <input type='number' value={this.state.colorsAmount} onChange={this.handleColorsAmountChange} />

        <br />
        <br />

        <input type='color' value={this.state.initialColor} onChange={this.handleColorChange} />

        <br />
        <br />

        {colorsList.map((colorItem, index) => (
          <ColorBoxWrapper rotateAngle={index * 360 / this.state.colorsAmount} key={index}>
            <ColorBox
              style={{
                backgroundColor: colorItem
              }}
            />
          </ColorBoxWrapper>
        ))}
      </div>
    )
  }
}

export default App
