import React from 'react'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'

import { Input } from '../Input'

import * as S from './styles'

type InputFormProps = {
  name: string
  control: Control
} & TextInputProps

export function InputForm({ name, control, ...rest }: InputFormProps) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
    </S.Container>
  )
}
