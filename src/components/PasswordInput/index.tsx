import React from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  IconContainer,
  IconContainerPassword,
  InputText
} from './styles';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}


export function PasswordInput({
  iconName,
  ...rest
}: InputProps){
  const theme = useTheme();
  const [ isPasswordVisible, setIsPasswordVisible ] = React.useState(true);

  function handleChangeVisibilityPassword(){
    setIsPasswordVisible(prevState => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather 
          name={iconName}
          size={24}
          color={theme.colors.text_detail}
        />
      </IconContainer>
      <InputText {...rest}
        secureTextEntry={isPasswordVisible}
      />

      <BorderlessButton
        onPress={handleChangeVisibilityPassword}
      >
        <IconContainerPassword>
          <Feather 
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainerPassword>
      </BorderlessButton>
    </Container>
  );
}