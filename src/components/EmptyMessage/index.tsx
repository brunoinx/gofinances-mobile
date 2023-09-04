import React from 'react';

import EmptyIcon from '@/assets/icons/not-found.svg';

import * as S from './styles';

interface IEmptyProps {
  message?: string;
}

export function EmptyMessage({
  message = 'Nenhuma transação foi registrada.',
}: IEmptyProps) {
  return (
    <S.Container>
      <EmptyIcon style={{ width: 170, height: 170 }} />
      <S.Message>{message}</S.Message>
    </S.Container>
  );
}
