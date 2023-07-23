import React from 'react';

import * as S from './styles';

type Props = {
  title: string;
  onPress: () => void;
};

export function Button({ title, onPress }: Props) {
  return (
    <S.RootView>
      <S.Container onPress={onPress}>
        <S.Title>{title}</S.Title>
      </S.Container>
    </S.RootView>
  );
}
