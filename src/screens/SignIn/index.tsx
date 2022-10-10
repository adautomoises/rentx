import React from 'react';
import { 
  StatusBar, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native';
import * as Yup from 'yup'; 
import { useNavigation } from '@react-navigation/native';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';
import theme from '../../styles/theme';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer
} from './styles';

export function SignIn(){
  const [ email, setEmail ] = React.useState('');
  const [ password, setPassword ] = React.useState('');

  const navigation = useNavigation();
  function startApp(){
    navigation.navigate('Home');
  };

  async function handleSignIn(){
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
        .required('A senha é obrigatória'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });
      await schema.validate({ email, password });
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        return Alert.alert('Opa', error.message)
      } else {
        Alert.alert('Erro na autenticação','Ocorreu um erro ao fazer login, verifique as credenciais')
      }
    }

  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar 
            barStyle='dark-content'
            backgroundColor={theme.colors.background_primary}
            translucent
            
          />
          <Header>
            <Title>
              Estamos {'\n'}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar {'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button 
              title = "Login"
              onPress = {handleSignIn}
              loading = {false}
            />
            <Button 
              title = "Criar conta gratuida"
              onPress = {()=>{}}
              loading = {false}
              color = {theme.colors.background_secondary}
              light
            />
            <Button 
              title = "Pular Cadastro"
              onPress = {startApp}
              loading = {false}
              color = {theme.colors.success}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}