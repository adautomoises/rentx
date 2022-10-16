import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  active: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(200)}px;

  padding: 0 24px;
  align-items: center; 

  background-color: ${({theme}) => theme.colors.header};
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({theme}) => theme.fonts.secondary_600};
  color: ${({theme}) => theme.colors.background_secondary};
`;

export const LogOutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;

  border-radius: 90px;
  background-color: ${({theme}) => theme.colors.shape};
  margin-top: 48px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;

  justify-content: center;
  align-items: center;

  position: absolute;
  right: 10px;
  bottom: 10px;

  background-color: ${({theme}) => theme.colors.main};
`;

export const WrapperDatas = styled.View`
  width: 100%;

  margin-top: ${RFPercentage(15)}px;
`;

export const FormDatas = styled.View`  
  justify-content: center;
  align-items: center;

  padding: 24px;
`;

export const HeaderFormDatas = styled.View`
  width: 100%;
  
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.shape};
  margin-bottom: 24px;
`;

export const FormData = styled(RectButton)``;

export const FormDataTitle = styled.Text<Props>`
  height: ${RFValue(38)}px;

  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: 20px;

  border-bottom-color: ${({theme, active}) => 
  active ? theme.colors.main : 'none'};
  border-bottom-width: ${({active}) => 
  active ? 2 : 0 }px;
`;

export const FormPassword = styled(RectButton)``;

export const FormPasswordTitle = styled.Text<Props>`
  height: ${RFValue(38)}px;

  color: ${({theme}) => theme.colors.title};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: 20px;
  
  border-bottom-color: ${({theme, active}) => 
  active ? theme.colors.main : 'none'};
  border-bottom-width: ${({active}) => 
  active ? 2 : 0 }px;
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
  padding-top: 0;
`;