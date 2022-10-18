import React from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogOutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle
} from './styles';

export function Profile(){
  const [ option, setOption ] = React.useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.navigate('Home');
  };
  function handleSignOut(){

  };

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView 
      behavior='position' enabled
      keyboardVerticalOffset={60}
    >
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
      >
        <Container>
          <StatusBar 
            barStyle='light-content'
            backgroundColor={theme.colors.header}
            translucent
          />
          <Header>
            <HeaderTop>
              <BackButton
                onPress={handleBack}
                color={theme.colors.shape}
              />

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogOutButton onPress={handleSignOut}>
                <Feather 
                  name="power" size={24}
                  color={theme.colors.shape}
                />
              </LogOutButton> 
            </HeaderTop>
            <PhotoContainer>
              <Photo source={{uri: "https://github.com/adautomoises.png"}} />
              <PhotoButton onPress={()=>{}}>
                <Feather 
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option active={option === 'passwordEdit'}>
                <OptionTitle
                  active={option === 'passwordEdit'}
                  onPress={() => handleOptionChange('passwordEdit')}  
                >
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}