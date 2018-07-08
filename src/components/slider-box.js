import React from 'react'
import styled, { css } from 'styled-components'

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

const SliderBox = ({
  sliderValue,
  sliderOnChange,
  label,
  min,
  max
}) => (
  <SliderRow>
    <SliderTitle>
      {label}
    </SliderTitle>
    <SliderInput type='range' min={min} max={max} step='any' value={sliderValue} onChange={sliderOnChange} />
  </SliderRow>
)

export default SliderBox
