import React from 'react';
import {StyleSheet, View} from 'react-native';
import GridItem from './GridItem';

interface GridProps {
  size: number;
  disabledNumbers: number[];
  onNumberPress: (num: number) => void;
  gridBoxWidth: number
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const Grid = ({size, disabledNumbers, onNumberPress, gridBoxWidth}: GridProps) => {

  const gridSize = size * size;
  const itemSize = gridBoxWidth / size;
  const gridItems = Array.from({length: gridSize}, (_, index) => index + 1);

  console.log("item size", itemSize)

  return (
    <View style={styles.gridContainer}>
      {gridItems.map(number => (
        <GridItem
          key={number}
          number={number}
          onPress={() => onNumberPress(number)}
          disabled={disabledNumbers.includes(number)}
          itemSize={itemSize}
        />
      ))}
    </View>
  );
};

export default Grid;
