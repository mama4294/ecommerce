import React from 'react'
import {BaseButton, GoogleButton, InvertedButton} from "./button.styles.jsx"


export const BUTTON_TYPE_CLASS = {
    base: 'base',
    google: 'google-sign-in',
    inverted: "inverted"
}

const getButton = (buttonType = BUTTON_TYPE_CLASS.base) => (
  {
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
  }[buttonType]
)

export const Button = ({children, buttonType, ...otherProps}) => {
  const ButtonComponent = getButton(buttonType)
  return (
    <ButtonComponent {...otherProps} >
        {children}
    </ButtonComponent>
  )
}
