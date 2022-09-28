import React from 'react';
import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';


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
  Accessories,
  Footer
} from './styles';

export function CarDetails(){
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>
      <CarImages>
        <Slider 
          imageUrl= {['https://www.webmotors.com.br/imagens/prod/348272/LAMBORGHINI_HURACAN_5.2_V10_GASOLINA_LP_640_EVO_SPYDER_LDF_34827202075115677.webp?s=fill&w=130&h=97&q=70&t=true)']} 
        />
      </CarImages>
    
      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracán</Name>
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

      <Footer>
        <Button title="Escolher período do aluguel"/>
      </Footer>

    </Container>
  );
}