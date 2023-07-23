import React from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { Input, InputProps } from '../Input';

import * as S from './styles';

export function InputForm<FormType extends FieldValues>({
  control,
  name,
  rules,
  ...rest
}: UseControllerProps<FormType> & InputProps) {
  return (
    <S.Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange, onBlur, name }, fieldState }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={fieldState.error?.message}
            {...rest}
          />
        )}
      />
    </S.Container>
  );
}
