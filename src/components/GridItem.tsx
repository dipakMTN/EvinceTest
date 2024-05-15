import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface GridItemProps {
  number: number;
  onPress: (num: number) => void;
  disabled: boolean;
  itemSize: number;
}

const styles = StyleSheet.create({

  gridItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  disabledGridItem: {
    backgroundColor: 'lightgrey',
  }
});

const GridItem = ({number, onPress, disabled, itemSize}: GridItemProps) => (
  <View
    style={[
      styles.gridItem,
      {width: itemSize, height: itemSize},
      disabled && styles.disabledGridItem,
    ]}
    onTouchStart={() => onPress(number)}>
    <Text>{number}</Text>
  </View>
);


export default GridItem