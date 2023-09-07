import React from 'react';

import * as S from './styles';

interface ContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function Content({ title, description, children }: ContentProps) {
  return (
    <S.Content>
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>

      <S.Footer>{children}</S.Footer>
    </S.Content>
  );
}
