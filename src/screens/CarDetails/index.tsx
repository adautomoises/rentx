import React from 'react';
import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About
} from './styles';

export function CarDetails(){
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>
      <CarImages>
        <Slider 
          imageUrl= {['https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841510442727128.webp?s=fill&w=236&h=135&q=70&t=true']} 
        />
      </CarImages>
    
      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>
        <About>
          Este é automóvel desportivo. Surgiu do 
          lendário touro de lide indultado na praça 
          Real Maestranza de Sevilla. É um belíssimo 
          carro para quem gosta de acelerar.
        </About>
      </Content>

    </Container>
  );
}