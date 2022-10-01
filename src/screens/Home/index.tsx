import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export function Home(){
  const [cars, setCars] = React.useState<CarDTO>();
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation();

  function handleCarDetails(){
    navigation.navigate('CarDetails');
  }


  React.useEffect(()=> {
    async function fetchCars(){
      try{
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

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

      { loading ? <Load /> : 
        <CarList
          data={cars}
          keyExtractor={ item => item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={handleCarDetails} />
          }
        />
      }
    </Container>
  );
}