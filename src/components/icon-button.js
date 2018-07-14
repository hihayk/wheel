import React from 'react'
import styled from 'styled-components'
import eye from '../icons/eye.svg'
import duplicate from '../icons/duplicate.svg'
import cross from '../icons/cross.svg'
import trash from '../icons/trash.svg'

const icons = {
  eye: eye,
  duplicate: duplicate,
  cross: cross,
  trash: trash
}

const ButtonWrapper = styled.button`
  appearance: none;
  border: none;
  background-color: rgba(0,0,0,.1);
  height: 32px;
  width: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: background-color .3s;

  &:hover {
    background-color: rgba(0,0,0,.2);
  }
`

const IconImg = styled.img`
  display: block;
  transition: opacity .3s;
  ${props => props.isDisabled && 'opacity: 0.4'};
`

const IconButton = ({
  icon,
  onClick,
  isDisabled,
  title
}) => (
  <ButtonWrapper onClick={onClick} isDisabled={isDisabled} title={title}>
    <IconImg src={icons[icon]} isDisabled={isDisabled} />
  </ButtonWrapper>
)

export default IconButton
