import React from 'react';

import * as S from './styles';

interface OverlayProps {
  onRequestClose: () => void;
  children: React.ReactNode;
}

export function Overlay({ children, onRequestClose }: OverlayProps) {
  return (
    <S.Overlay activeOpacity={1} onPress={onRequestClose}>
      {children}
    </S.Overlay>
  );
}
