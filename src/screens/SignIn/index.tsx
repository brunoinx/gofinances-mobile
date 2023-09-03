import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  ANDROID_GOOGLE_CLIENT_ID,
  EXPO_CLIENT_ID,
  IOS_GOOGLE_CLIENT_ID,
} from '@env';

import { useAuth } from '@/hooks/useAuth';
import { getUserStorage } from '@/storage/user';
import { SignInSocialButton } from '@/components/SignInSocialButton';

import LogoSvg from '@/assets/logo.svg';
import * as S from './styles';
import { requestGoogleUserData } from '@/services/requestGoogleUserData';

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const { handleUpdateUserData, handleSocialAuthentication } = useAuth();
  const [_, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
    iosClientId: IOS_GOOGLE_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success' && response.authentication.accessToken) {
      handleSignInWithGoogle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  async function handleSignInWithGoogle() {
    try {
      const userStorage = await getUserStorage();

      if (!userStorage?.id) {
        if (response?.type === 'success') {
          const user = await requestGoogleUserData(
            response.authentication.accessToken,
          );

          handleSocialAuthentication(user);
        }
      } else {
        handleUpdateUserData(userStorage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            iconName="google"
            onPress={() => promptAsync()}
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              iconName="apple"
              onPress={() => {}}
            />
          )}
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}
