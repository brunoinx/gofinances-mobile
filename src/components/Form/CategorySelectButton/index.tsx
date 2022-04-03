import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type CategoryProps = {
  label: string
} & TouchableOpacityProps

export function CategorySelectButton({ label, ...rest }: CategoryProps) {
  return (
    <S.Container activeOpacity={0.8} {...rest}>
      <S.Label>{label}</S.Label>

      <S.Icon name={'chevron-down'} />
    </S.Container>
  )
}
