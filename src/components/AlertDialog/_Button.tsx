import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  type: 'confirm' | 'cancel';
  loading?: boolean;
}

export function Button({ title, type, ...rest }: ButtonProps) {
  return (
    <S.Button activeOpacity={0.7} type={type} {...rest}>
      <S.ButtonText>
        {title ? title : type === 'confirm' ? 'Confirmar' : 'Cancelar'}
      </S.ButtonText>
    </S.Button>
  );
}
