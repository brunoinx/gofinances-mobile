import React from 'react';
import { format } from 'date-fns';

import { categories } from '@/mocks/categories';
import { TransactionDTO } from '@/dtos/transactionDTO';
import { formatToMoney } from '@/utils/formatToMoney';

import * as S from './styles';

type MovimentProps = {
  data: TransactionDTO;
};

export function Moviment({ data }: MovimentProps) {
  const dateFormatted = format(new Date(data.date), 'dd/MM/yyyy');
  const amountFormatted = formatToMoney(data.amount);

  const [category] = categories.filter(item => item.key === data.category);

  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>

      <S.Amount type={data.transactionType}>
        {data.transactionType === 'outcome' && '- '}
        {amountFormatted}
      </S.Amount>

      <S.Footer>
        <S.CategoryeWrapper>
          <S.Icon name={category.icon} />
          <S.FooterText>{category.name}</S.FooterText>
        </S.CategoryeWrapper>
        <S.FooterText>{dateFormatted}</S.FooterText>
      </S.Footer>
    </S.Container>
  );
}
