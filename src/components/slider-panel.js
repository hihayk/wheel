import React from 'react'
import styled from 'styled-components'
import SliderBox from './slider-box'

const SlidersBackdrop = styled.div`

`

const SlidersContainer = styled.div`

`
const SlidersWrapper = styled.div`
  height: 100%;
  left: 100%;
  display: flex;
  align-items: center;
  z-index: 120;
  background-color: white;
  top: 0;
`

const SliderPanel = ({
  saturationValue,
  handleSaturationChange,
  desaturationValue,
  handleDesaturationChange,
  lightenValue,
  handleLightenChange,
  darkenValue,
  handleDarkenChange,
  onSaturationChange,
  onDesaturationChange,
  onLightenChange,
  onDarkenChange
}) => (
  <SlidersContainer>
    <SlidersWrapper>
      <div>
        <SliderBox
          label='Saturate'
          sliderValue={saturationValue}
          sliderOnChange={handleSaturationChange}
          min={0}
          max={1}
        />

        <SliderBox
          label='Desaturate'
          sliderValue={desaturationValue}
          sliderOnChange={handleDesaturationChange}
          min={0}
          max={1}
        />

        <SliderBox
          label='Lighten'
          sliderValue={lightenValue}
          sliderOnChange={handleLightenChange}
          min={0}
          max={1}
        />

        <SliderBox
          label='Darken'
          sliderValue={darkenValue}
          sliderOnChange={handleDarkenChange}
          min={0}
          max={1}
        />
      </div>
    </SlidersWrapper>
    <SlidersBackdrop onClick={this.handleColorClick} />
  </SlidersContainer>
)

export default SliderPanel
