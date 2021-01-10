import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../Config/Colors';
import {FontType} from '../../Config/Fonts';
import {title} from '../../Config/Texts';

const AppHeader = () => {
  return (
    <View style={styles.appView}>
      <Text style={styles.appText}>{title}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  appView: {
    height: StatusBar.currentHeight * 2,
    backgroundColor: Colors.red,
    justifyContent: 'center',
  },
  appText: {
    textAlign: 'center',
    fontFamily: FontType.blackFont,
    fontSize: 20,
    color: Colors.white,
  },
});
