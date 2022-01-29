import React from 'react'

import * as S from './styles'

type Category = {
  name: string
  icon: string
}

type DataProps = {
  title: string
  amount: string
  type: 'positive' | 'negative'
  category?: Category
  date: string
}

type MovimentProps = {
  data: DataProps
}

export function Moviment({ data }: MovimentProps) {
  return (
    <S.Container>
      <S.Title>{data.title}</S.Title>

      <S.Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </S.Amount>

      <S.Footer>
        <S.CategoryeWrapper>
          <S.Icon name={data.category?.icon} />
          <S.FooterText>{data.category?.name}</S.FooterText>
        </S.CategoryeWrapper>
        <S.FooterText>{data.date}</S.FooterText>
      </S.Footer>
    </S.Container>
  )
}
