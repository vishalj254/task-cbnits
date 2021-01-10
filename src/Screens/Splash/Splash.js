/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  Text,
} from 'react-native';
import {Colors} from '../../Config/Colors';
import {FontType} from '../../Config/Fonts';
import {title} from '../../Config/Texts';

export default function Splash(props) {
  const [animationValue] = useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(animationValue, {
      toValue: 30,
      duration: 2000,
      easing: Easing.elastic(7),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      startAnimation();
    }, 500);
    setTimeout(() => {
      props.navigation.replace('Home');
    }, 2000);
  }, []);

  const animatedStyle = {
    transform: [{translateY: animationValue}],
  };
  return (
    <View style={styles.MainContainer}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.animatedBox, animatedStyle]}>
          <Text style={styles.appText}>{title}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: Colors.red,
  },
  animatedBox: {
    // backgroundColor: '#0091EA',
  },
  appText: {
    textAlign: 'center',
    fontFamily: FontType.blackFont,
    fontSize: 20,
    color: Colors.white,
  },
});
