import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { AntDesign } from '@expo/vector-icons';

import { LoadAnimation } from '../../components/LoadAnimation';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFoorterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  user_id: string;
  id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [ cars, setCars ] = React.useState<CarProps[]>([]);
  const [ loading, setLoading ] = React.useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack(){
    navigation.goBack();
  };

  React.useEffect(() => {
    async function fetchCars(){
      try{
        const response = await api.get('schedules_byuser?user_id=1');
        setCars(response.data);
      } catch (e) { 
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  },[]);

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor= "transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Seus agendamentos,{'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>
      { loading ? <LoadAnimation /> :
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFoorterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFoorterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }
    </Container>
  );
}