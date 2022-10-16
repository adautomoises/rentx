import React from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButtonProps, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogOutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  WrapperDatas,
  FormDatas,
  HeaderFormDatas,
  FormData,
  FormDataTitle,
  FormPassword,
  FormPasswordTitle,
  Footer
} from './styles';

export function Profile(){
  const { user } = useAuth();
  const [ name, setName ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ driverLicense, setDriverLicense ] = React.useState('');
  const [ password, setPassword ] = React.useState('');
  const [ newPassword, setNewPassword ] = React.useState('');
  const [ confirmNewPassword, setConfirmNewPassword ] = React.useState('');
  const [ active, setActive ] = React.useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.navigate('Home');
  };
  function handleSignOut(){

  };

  function handleChangeFormDatas() {
    setActive(prevState => !prevState);
  };

  React.useEffect(()=>{
    async function loadDatas(){
      setName(user.name);
      setEmail(user.email);
      setDriverLicense(user.driver_license);
    }

    loadDatas();
  },[]);


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

          <WrapperDatas>
            <FormDatas>
              <HeaderFormDatas>
                <FormData
                  onPress={handleChangeFormDatas}
                  enabled={!active}
                >
                  <FormDataTitle active={active}>
                    Dados
                  </FormDataTitle>
                </FormData>
                <FormPassword
                  onPress={handleChangeFormDatas}
                  enabled={active}
                >
                  <FormPasswordTitle active={!active}>
                    Trocar senha
                  </FormPasswordTitle>
                </FormPassword>
              </HeaderFormDatas>
              {
                active ? <>
                <Input 
                iconName='user'
                placeholder='Nome'
                onChangeText={setName}
                value={name}
                firstValue={name}
                style={{
                  color: theme.colors.title
                }}
              />
              <Input 
                iconName='mail'
                placeholder='E-mail'
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
                firstValue={email}
                style={{
                  color: theme.colors.title
                }}
              />
              <Input 
                iconName='credit-card'
                placeholder='CNH'
                keyboardType='numeric'
                onChangeText={setDriverLicense}
                value={driverLicense}
                firstValue={driverLicense}
                style={{
                  color: theme.colors.title
                }}
              />
              </>
              :
              <>
              <Input 
                iconName='lock'
                placeholder='Senha atual'
                onChangeText={setPassword}
                value={password}
                style={{
                  color: theme.colors.title
                }}
              />
              <Input 
                iconName='lock'
                placeholder='Senha'
                onChangeText={setNewPassword}
                value={newPassword}
                style={{
                  color: theme.colors.title
                }}
              />
              <Input 
                iconName='lock'
                placeholder='Repetir senha'
                onChangeText={setConfirmNewPassword}
                value={confirmNewPassword}
                style={{
                  color: theme.colors.title
                }}
              />
              </>
              }
            </FormDatas>
          </WrapperDatas>

          <Footer>
            <Button 
              title='Salvar alterações'
              loading={false} 
              disabled={true} 
              onPress={() => {}}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}