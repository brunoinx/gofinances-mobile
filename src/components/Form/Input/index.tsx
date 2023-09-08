import React from 'react';
import { TextInputProps } from 'react-native';

import * as S from './styles';

export interface InputProps extends TextInputProps {
  errorMessage?: string;
}

export function Input({ errorMessage, ...rest }: InputProps) {
  return (
    <>
      <S.InputContainer error={!!errorMessage} {...rest} />

      <S.ErrorText>{errorMessage}</S.ErrorText>
    </>
  );
}
