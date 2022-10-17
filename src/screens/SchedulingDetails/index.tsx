import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { BackButton } from '../../components/BackButton';
import { Slider } from '../../components/Slider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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

interface RentalPeriod {
  start: string;
  end: string;
}

interface Params {
  car: CarDTO;
  dates: string[];
};

export function SchedulingDetails() {
  const [loading, setLoading] = React.useState(false);
  const [rentalPeriod, setRentalPeriod] = React.useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

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

  async function handleConfirmRental() {
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ];

    await api.post('schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(parseISO(dates[0]), "dd/MM/yyyy"),
      endDate: format(parseISO(dates[dates.length - 1]), "dd/MM/yyyy")
    });

    setLoading(true);

    await api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
      .then(() => {
        navigation.navigate('Confirmation', {
          nextScreenRoute: 'Home',
          title: 'Carro alugado!',
          message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
        });
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Não foi possível confirmar o agendamento.")
      })
  }

  function handleBack() {
    navigation.goBack();
  }

  React.useEffect(() => {
    setRentalPeriod({
      start: format(parseISO(dates[0]), "dd/MM/yyyy"),
      end: format(parseISO(dates[dates.length - 1]), "dd/MM/yyyy"),
    });
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerAnimationStyle,
          styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}
      >
        <Header>
          <BackButton onPress={handleBack} />
        </Header>
        <CarImages>
          <Animated.View style={[sliderAnimationStyle]}>
            <Slider
              imageUrl={car.photos}
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
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
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
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diarías`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>

        </RentalPrice>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          loading={loading}
          disabled={false}
        />
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
});