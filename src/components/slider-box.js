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

const SliderText = styled.div`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  font-weight: bold;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Label = styled.div`
  user-select: none;
`
const Value = styled.div`
  opacity: .6;
  user-select: none;
`

const SliderRow = styled.div`
  margin-bottom: 24px;
`

const SliderInput = styled.input`
  width: 224px;
  height: 12px;
  -webkit-appearance: none;
  margin: 0;
  display: block;
  cursor: pointer;

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
  max,
  step
}) => (
  <SliderRow>
    <SliderText>
      <Label>
        {label}
      </Label>
      <Value>
        {sliderValue}
      </Value>
    </SliderText>
    <SliderInput type='range' min={min} max={max} step={step} value={sliderValue} onChange={sliderOnChange} />
  </SliderRow>
)

SliderBox.defaultProps = {
  step: 0.01
}

export default SliderBox
