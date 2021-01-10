'use strict';
import {Dimensions} from 'react-native';
const IPHONE_5_SERIES = Dimensions.get('window').height <= 568 ? true : false;
const FontType = {
  blackFont: 'Lato-Black',
  blackItalicFont: 'Lato-BlackItalic',
  boldFont: 'Lato-Bold',
  boldItalicFont: 'Lato-BoldItalic',
  lightFont: 'Lato-Light',
  lightItalicFont: 'Lato-LightItalic',
  regularFont: 'Lato-Regular',
  regularItalicFont: 'Lato-RegularItalic',
};

const FontSize = {
  h1: IPHONE_5_SERIES ? 26 : 30,
  h2: IPHONE_5_SERIES ? 22 : 24,
  h3: IPHONE_5_SERIES ? 16 : 18,
  h4: IPHONE_5_SERIES ? 14 : 16,

  contextText: 14,
  toolbarText: 28,
  smallText: 10,
  labelText: 12,
  textInput: 15,
  buttonText: 16,
  newButtonText: 17,
  mainButton: 15,
};

export {FontSize, FontType};
