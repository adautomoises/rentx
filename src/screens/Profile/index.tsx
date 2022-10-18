import React from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

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
  OptionTitle,
  Section
} from './styles';

export function Profile(){
  const { user } = useAuth();

  const [ option, setOption ] = React.useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [ name, setName ] = React.useState(user.name);
  const [ avatar, setAvatar ] = React.useState(user.avatar);
  const [ driverLicense, setDriverLicense ] = React.useState(user.driver_license);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.navigate('Home');
  };
  function handleSignOut(){

  };

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit'){
    setOption(optionSelected);
  };

  async function handleAvatarSelect(){
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [ 4, 4 ],
      quality: 1
    });
    
    if(result.cancelled){
      return;
    };

    if(result.uri){
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              { !!avatar && <Photo source={{uri: avatar}} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather 
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight()}}>
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
            { option === 'dataEdit' ?
              <Section>
                <Input 
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input 
                  iconName='mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input 
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
              :
              <Section>
                <PasswordInput 
                  iconName='lock'
                  placeholder='Senha atual'
                />
                <PasswordInput 
                  iconName='lock'
                  placeholder='Nova senha'
                />
                <PasswordInput 
                  iconName='lock'
                  placeholder='Repetir senha'
                />
              </Section>
            }
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}