import React from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import {
  Container
} from './styles';

export function MyCars(){
  const [ cars, setCars ] = React.useState<CarDTO>({} as CarDTO);
  const [ loading, setLoading ] = React.useState(true);

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

    </Container>
  );
}