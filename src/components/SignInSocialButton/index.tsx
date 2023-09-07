import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import GoogleSvg from '@/assets/google.svg';
import AppleSvg from '@/assets/apple.svg';

import * as S from './styles';
import { useTheme } from 'styled-components';

interface Props extends RectButtonProps {
  title: string;
  iconName: 'google' | 'apple';
  loading?: boolean;
}

export function SignInSocialButton({
  title,
  iconName,
  loading = false,
  ...rest
}: Props) {
  const { colors } = useTheme();

  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        {iconName === 'google' ? <GoogleSvg /> : <AppleSvg />}
      </S.ImageContainer>

      {loading ? (
        <ActivityIndicator
          size={24}
          color={colors.shadow}
          style={{ flex: 0.8 }}
        />
      ) : (
        <S.Text>{title}</S.Text>
      )}
    </S.Button>
  );
}
