import React from 'react';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../styles/theme';
import {
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
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


export function SignUpFirstStep(){
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  };

  function handleNextSignUp(){
    navigation.navigate('SignUpSecondStep');
  };

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
              <Bullet active />
              <Bullet />
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
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName='user'
              placeholder='Nome'
            />
            <Input 
              iconName='mail'
              placeholder='E-mail'
              keyboardType='email-address'
            />
            <Input 
              iconName='credit-card'
              placeholder='CNH'
              keyboardType='numeric'
            />
          </Form>
          <Button 
            title='Próximo' 
            loading={false} 
            disabled={false} 
            onPress={handleNextSignUp}
          />
        </Container>
    </KeyboardAvoidingView>
  );
}