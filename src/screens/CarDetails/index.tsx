import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

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
  About,
  Accessories
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

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg}/>
          <Accessory name="3.2s" icon={accelerationSvg}/>
          <Accessory name="800 HP" icon={forceSvg}/>
          <Accessory name="Gasolina" icon={gasolineSvg}/>
          <Accessory name="Auto" icon={exchangeSvg}/>
          <Accessory name="2 pessoas" icon={peopleSvg}/>
        </Accessories>

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