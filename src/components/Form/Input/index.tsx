import React, { useState } from 'react'
import { TextInputProps } from 'react-native'

import * as S from './styles'

type InputProps = TextInputProps

export function Input({ ...rest }: InputProps) {
  const [isFocus, setIsFocus] = useState(false)

  function handleInputFocus(event: 'focus' | 'blur') {
    if (event === 'focus') return setIsFocus(true)
    setIsFocus(false)
  }

  return (
    <S.InputContainer
      isFocused={isFocus}
      onFocus={() => handleInputFocus('focus')}
      onBlur={() => handleInputFocus('blur')}
      {...rest}
    />
  )
}
