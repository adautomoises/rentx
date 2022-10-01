import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles';

export function SchedulingDetails(){
  const theme = useTheme();
  const navigation = useNavigation();
  function handleConfirmRental(){
    navigation.navigate('SchedulingComplete');
  }
  function handleBack(){
    navigation.goBack();
  }
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>29/09/2022</DateValue>
          </DateInfo>

            <Feather 
              name="chevron-right"
              size={RFValue(10)}
              color={theme.colors.text}
            />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>29/09/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diarías</RentalPriceQuota>
            <RentalPriceTotal>R$ 2900</RentalPriceTotal>
          </RentalPriceDetails>

        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora" 
          color="green"
          onPress={handleConfirmRental}
        />
      </Footer>

    </Container>
  );
}