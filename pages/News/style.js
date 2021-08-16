import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const CARD_HEIGHT = windowHeight * 0.78;
export const CARD_WIDTH = windowWidth * 0.9;
export const ACTION_OFFSET = 100;
export const OUT_OF_SCREEN = windowWidth + 0.5 * windowWidth;