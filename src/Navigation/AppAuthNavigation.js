import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Splash from '../Screens/Splash/Splash';
import Home from '../Screens/Home/Home';

export default function AppAuthNavigation() {
  const Auth = createStackNavigator();

  const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              scale: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.9],
                  })
                : 1,
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
  };

  return (
    <NavigationContainer theme={DefaultTheme}>
      <Auth.Navigator initialRouteName={'Splash'} headerMode={'none'}>
        <Auth.Screen
          name={'Splash'}
          options={{headerShown: false, ...MyTransition}}
          component={Splash}
        />
        <Auth.Screen
          name={'Home'}
          options={{headerShown: false, ...MyTransition}}
          component={Home}
        />
      </Auth.Navigator>
    </NavigationContainer>
  );
}
