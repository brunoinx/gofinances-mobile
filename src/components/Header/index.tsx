import React from 'react';

import * as S from './styles';

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <S.Header>
      <S.HeaderTitle>{title}</S.HeaderTitle>
    </S.Header>
  );
}
