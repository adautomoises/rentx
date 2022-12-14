import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Title
} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  color?: string;
  loading: boolean;
  light?: boolean;
  disabled: boolean;
  onPress: () => void;
}

export function Button({
  title, 
  color,
  onPress,
  disabled = true,
  loading = false,
  light = false
}: Props){

  const theme = useTheme();

  return (
    <Container
      color={color ? color : theme.colors.main}
      onPress={onPress}
      disabled={disabled}
      style={{ opacity: (disabled || loading ) ? .5 : 1}}
    >
      {
        loading ?
        <ActivityIndicator color={theme.colors.shape} /> :
        <Title light = {light} >{title}</Title>
      }
    </Container>
  );
}