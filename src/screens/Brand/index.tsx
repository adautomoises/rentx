import React from 'react';
import { StatusBar } from 'react-native';
import BrandSvg from '../../assets/brand.svg';


import {
  Container
} from './styles';

export function Brand(){
  return (
    <Container>
      <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor= "transparent"
      />
      <BrandSvg width={80} height={50} />
    </Container>
  );
}