import React from 'react';
import {Dimensions} from 'react-native';

export const playerSize = 25;
export const playerTop = Dimensions.get('window').height-(playerSize)*3;
export const invulnerabilityTime = 7500;