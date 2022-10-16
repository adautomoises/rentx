import { BorderlessButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  active: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
  height: ${RFPercentage(30)}px;

  padding-top:  62px;
  padding-top: ${getStatusBarHeight() + 30}px;

  background-color: ${({theme}) => theme.colors.header};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: ${({theme}) => theme.colors.background_secondary};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: 25px;
`;

export const AvatarProfileContainer = styled.View`
  width: 100%;

  align-items: center;
  position: absolute;

  margin-top: ${RFPercentage(20)}px;
`;

export const AvatarProfile = styled.View`
  width: 180px;
  height: 180px;

  border-radius: 90px;
  border-width: 1px;
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const ChangeAvatarProfile = styled(BorderlessButton)`
  width: 40px;
  height: 40px;

  justify-content: center;
  align-items: center;

  position: absolute;
  right: ${RFPercentage(15)}px;
  bottom: 0;

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

export const FormData = styled(BorderlessButton)``;

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

export const FormPassword = styled(BorderlessButton)``;

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