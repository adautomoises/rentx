import React from 'react';
import { useNavigation } from '@react-navigation/native';
import theme from '../../../styles/theme';
import {
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';

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


export function SignUpSecondStep(){
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
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
            />
            <PasswordInput 
              iconName='lock'      
              placeholder='Repetir Senha'
            />
          </Form>
          <Button 
            title='Cadastrar'
            color={theme.colors.success}
            loading={false} 
            disabled={false} 
            onPress={()=>{}}
          />
        </Container>
    </KeyboardAvoidingView>
  );
}