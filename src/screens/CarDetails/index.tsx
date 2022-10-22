import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Car as ModelCar } from '../../database/model/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import { useNetInfo } from '@react-native-community/netinfo';

import Animated, 
{ 
  useSharedValue, 
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo
} from './styles';

interface Params {
      car: ModelCar;
};

export function CarDetails(){
  const [ carUpdated, setCarUpdated ] = React.useState<CarDTO>({} as CarDTO);

  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();

  const statusBarHeight = getStatusBarHeight();

  const scrollY = useSharedValue(0);
  const scrollhandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimationStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [300, statusBarHeight + 60],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  }); 

  function handleConfirmRental(){
    navigation.navigate('Scheduling', { car });
  };

  function handleBack(){
    navigation.goBack();
  };

  React.useEffect(() => {
    async function fetchCarUpdated(){
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    };
    
    if(netInfo.isConnected === true){
      fetchCarUpdated();
    };

  },[netInfo.isConnected]);

  return (
    <Container>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Animated.View
        style={[
          headerAnimationStyle, 
          styles.header,
          { backgroundColor: theme.colors.background_secondary}
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
          <Animated.View style={[sliderAnimationStyle]}>
            <Slider 
              imageUrl= {
                !!carUpdated.photos ?
                carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
              } 
            />
          </Animated.View>
        </CarImages>
      </Animated.View>
    
      <Animated.ScrollView
        contentContainerStyle = {{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 240,
        }}
        showsVerticalScrollIndicator = {false}
        onScroll = {scrollhandler}
        scrollEventThrottle = {16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ { netInfo.isConnected === true ? car.price : '...' }</Price>
          </Rent>
        </Details>
        {
          carUpdated.accessories &&
          <Accessories>  
            {
              carUpdated.accessories.map(accessory => (
                <Accessory 
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>
        }

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button 
          title="Escolher período do aluguel"
          onPress={handleConfirmRental} 
          loading={false}
          disabled={
            netInfo.isConnected === true ? false : true
          }
        />
        {
          netInfo.isConnected === false &&
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        }
      </Footer>

    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})