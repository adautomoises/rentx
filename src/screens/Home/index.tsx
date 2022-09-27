import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,

} from './styles';

export function Home(){
  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao Dia',
      price: 120,
    },
    thumbnail: 'https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841510442727128.webp?s=fill&w=236&h=135&q=70&t=true'
  }
  const carDataTwo = {
    brand: 'Porsche',
    name: 'Panamera',
    rent: {
      period: 'Ao Dia',
      price: 340,
    },
    thumbnail: 'https://www.webmotors.com.br/imagens/prod/347468/PORSCHE_PANAMERA_2.9_V6_EHYBRID_4_PDK_34746806265508980.webp?s=fill&w=440&h=330&q=80&t=true'
  }

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
            />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
         </HeaderContent>
      </Header>

      <Car data={carDataOne}/>
      <Car data={carDataTwo}/>

    </Container>
  );
}