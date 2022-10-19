import React from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

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
  const { user, signOut, updatedUser } = useAuth();

  const [ option, setOption ] = React.useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [ name, setName ] = React.useState(user.name);
  const [ avatar, setAvatar ] = React.useState(user.avatar);
  const [ driverLicense, setDriverLicense ] = React.useState(user.driver_license);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.navigate('Home');
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
  };

  async function handleProfileUpdate(){
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
        .required('CNH é obrigatória'),
        name: Yup.string()
        .required('Nome é obrigatório')
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

      Alert.alert("Perfil atualizado!")

    } catch (error) {
      console.log(error);
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert("Não foi possível atualizar o perfil")
      }
    }
  };

  async function handleSignOut(){
    Alert.alert(
      'Tem certeza?',
      'Se você sair, irá precisar de internet para conectar-se novamente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Sair',
          onPress: () => signOut()
        }
      ]
    );
  };

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
            <Button 
              title='Salvar alterações'
              onPress={handleProfileUpdate} 
              loading={false} 
              disabled={false}
            />
          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}