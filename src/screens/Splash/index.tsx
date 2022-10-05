import React from 'react';
import { StatusBar, Button, StyleSheet, Dimensions } from 'react-native';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;

import {
  Container
} from './styles';

export function Splash(){
  const animation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(animation.value, {
        duration: 500,
        easing: Easing.bezier(1,0,0,1)
      })}]
    }
  })

  function handleAnimationPosition(){
    animation.value = Math.random()*(WIDTH-100);
  }

  return (
    <Container>
      <StatusBar 
          barStyle="light-content"
          translucent
          backgroundColor= "transparent"
      />
      <Animated.View style={[styles.box, animatedStyles]}/>
        <Button title="Mover" onPress={handleAnimationPosition}/>

    </Container>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});