import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}
