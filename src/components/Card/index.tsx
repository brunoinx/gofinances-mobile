import React from 'react';

import * as S from './styles';

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-up-circle',
  dollar: 'dollar-sign',
};

type CardProps = {
  title: string;
  amount: string;
  lastMoviment: string;
  type: 'up' | 'down' | 'dollar';
};

export function Card({ title, amount, lastMoviment, type }: CardProps) {
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon name={icon[type]} type={type} />
      </S.Header>

      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>

        <S.LastMoviment type={type}>{lastMoviment}</S.LastMoviment>
      </S.Footer>
    </S.Container>
  );
}
