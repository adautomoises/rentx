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
  onPress: () => void;
}

export function Button({
  title, 
  color,
  onPress,
  loading = false,
  light = false
}: Props){

  const theme = useTheme();

  return (
    <Container
      color={color ? color : theme.colors.main}
      onPress={onPress}
    >
      {
        loading ?
        <ActivityIndicator color={theme.colors.shape} /> :
        <Title light = {light} >{title}</Title>
      }
    </Container>
  );
}