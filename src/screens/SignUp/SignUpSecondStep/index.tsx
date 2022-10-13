import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import theme from '../../../styles/theme';
import {
  StatusBar,
  KeyboardAvoidingView,
  Alert
} from 'react-native';

import { Confirmation } from '../../Confirmation'
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles';

interface Params {
  user: {
    name: string;
    email: string; 
    driverLicense: string;
  }
}

export function SignUpSecondStep(){
  const [ password, setPassword ] = React.useState('');
  const [ passwordConfirm, setPasswordConfirm ] = React.useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack(){
    navigation.goBack();
  };

  function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação.');
    }
    
    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais');
    }
    navigation.navigate('Confirmation', {
      nextScreenRoute: 'SignIn',
      title: 'Conta Criada!',
      message: `Agora é só fazer login\ne aproveitar.`
    });
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
        <Container>
          <StatusBar 
            barStyle='dark-content'
            backgroundColor={theme.colors.background_primary}
            translucent
          />
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet />
              <Bullet active/>
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>
          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil.
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName='lock'
              placeholder='Senha'
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName='lock'      
              placeholder='Repetir Senha'
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>
          <Button 
            title='Cadastrar'
            color={theme.colors.success}
            loading={false} 
            disabled={false} 
            onPress={handleRegister}
          />
        </Container>
    </KeyboardAvoidingView>
  );
}