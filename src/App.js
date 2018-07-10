import React, { Component } from 'react'
import './App.css'
import Color from 'color'
import styled from 'styled-components'
import Wheel from './components/wheel'
import SliderBox from './components/slider-box'
import SliderPanel from './components/slider-panel'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
      colorsAmount: 3,
      colors: [
        { colorValue: 'lightblue', number: 1 },
        { colorValue: 'lightblue', number: 1 },
        { colorValue: 'lightgreen', number: 0 }
      ]
    }
  }

  handleSelection (index) {
    this.setState({
      selected: index
    })
  }

  handleChange (e) {
    const modifiedNames = [...this.state.colors]
    modifiedNames[this.state.selected].number = e.target.value

    this.setState({
      colors: modifiedNames
    })
  }

  render () {
    const getInitialColor = () => {
      return `hsl(${10}, ${20}%, ${50}%)`
    }

    const colorsList = []

    let step
    for (step = 0; step < this.state.colorsAmount; step++) {
      colorsList.push(Color(getInitialColor()).rotate(step * 360 / this.state.colorsAmount).string())
    }

    console.log(colorsList)

    return (
      <div>
        {colorsList.map((colorsListItem) => (
          <div style={{ background: colorsListItem }}>.</div>
        ))}

        <br />
        <br />

        {this.state.colors.map((color, index) => (
          <div
            style={{ border: index === this.state.selected && `2px solid black` }}
            onClick={() => this.handleSelection(index)}
          >
            {color.number}
            {color.colorValue}
            <div
              style={{
                background: Color(color.colorValue).saturate(color.number)
              }}>
              .
            </div>
          </div>
        ))}
        <input type='range' min={0} max={1} step={0.1} value={this.state.colors[this.state.selected].number} onChange={(e) => this.handleChange(e)} />
      </div>
    )
  }
}

export default App
