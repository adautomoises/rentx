import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface ButtonProps {
  color: string;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background-color: ${({ color }) => color};
`;
export const Title = styled.Text<ButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) => light ?
   theme.colors.header : theme.colors.shape};
`;