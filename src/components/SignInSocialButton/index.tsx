import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GoogleSvg from '@/assets/google.svg';
import AppleSvg from '@/assets/apple.svg';

import * as S from './styles';

interface Props extends RectButtonProps {
  title: string;
  iconName: 'google' | 'apple';
}

export function SignInSocialButton({ title, iconName, ...rest }: Props) {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        {iconName === 'google' ? <GoogleSvg /> : <AppleSvg />}
      </S.ImageContainer>

      <S.Text>{title}</S.Text>
    </S.Button>
  );
}
