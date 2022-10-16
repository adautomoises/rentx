import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
  Container,
  IconContainer,
  InputText
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
  firstValue?: string;
}

export function Input({
  iconName,
  value,
  firstValue,
  ...rest
}: InputProps){
  const theme = useTheme();
  const [ isFocused, setIsFocused ] = React.useState(false);
  const [ isFilled, setIsFilled ] = React.useState(false);

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);
  }
  
  return (
    <Container>
      <IconContainer
        isFocused={isFocused}
      >
        <Feather 
          name={iconName}
          size={24}
          color={ (isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>
      <InputText {...rest}
        value={firstValue}
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </Container>
  );
}