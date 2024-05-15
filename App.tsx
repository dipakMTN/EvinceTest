import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text,  Button, StyleSheet, Dimensions } from 'react-native';

const GridItem = ({ number, onPress, disabled, itemSize }) => (
  <View style={[styles.gridItem, { width: itemSize, height: itemSize }, disabled && styles.disabledGridItem]} onTouchStart={() => onPress(number)}>
    <Text>{number}</Text>
  </View>
);

const Grid = ({ size, disabledNumbers, onNumberPress }) => {
  const screenWidth = Dimensions.get('window').width;
  const gridSize = size * size;
  const itemSize = screenWidth / size - 10; // Subtracting 10 for margin
  const gridItems = Array.from({ length: gridSize }, (_, index) => index + 1);

  return (
    <View style={styles.gridContainer}>
      {gridItems.map((number) => (
        <GridItem key={number} number={number} onPress={() => onNumberPress(number)} disabled={disabledNumbers.includes(number)} itemSize={itemSize} />
      ))}
    </View>
  );
};

const App = () => {
  const [gridSize, setGridSize] = useState(3); // Default grid size is 3x3
  const [disabledNumbers, setDisabledNumbers] = useState([]);
  const [generatedNumber, setGeneratedNumber] = useState(null);
  const [isGenerateButtonEnabled, setGenerateButtonEnabled] = useState(true);
  const [generatedNumbersHistory, setGeneratedNumbersHistory] = useState([]);


  const onNumberPress = (number) => {
    console.log(number)
    console.log(generatedNumber)
    if(generatedNumber === number) {
      setGenerateButtonEnabled(true)
    }
  }

  const generateUniqueNumber = () => {
    if (disabledNumbers.length === gridSize * gridSize) {
      // All possible numbers in Grid are generated and added in Disabled numbers list
      return -1;
    }
  
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * (gridSize * gridSize)) + 1;
    } while (disabledNumbers.includes(randomNum));
    return randomNum;
  };

  const generateNumber = () => {
    const randomNum = generateUniqueNumber();
    
    if(randomNum === -1) {
      console.log("All possible numbers generated")
    }

    setGeneratedNumber(randomNum);
    setDisabledNumbers([...disabledNumbers, randomNum]);
    setGenerateButtonEnabled(false);
    setGeneratedNumbersHistory([...generatedNumbersHistory, randomNum]);
  };

  const handleGridPress = (number) => {
    if (number === generatedNumber) {
      const randomNum = generateUniqueNumber();
      setGeneratedNumber(randomNum);
      setDisabledNumbers([...disabledNumbers, randomNum]);
      setGenerateButtonEnabled(false);
    }
  };

  const resetGrid = () => {
    setGeneratedNumber(null);
    setDisabledNumbers([]);
    setGenerateButtonEnabled(true);
    setGeneratedNumbersHistory([]);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={gridSize}
        onValueChange={(itemValue) => {
          setGridSize(itemValue);
          resetGrid();
        }}
        style={styles.picker}
      >
        {[...Array(8)].map((_, index) => (
          <Picker.Item key={index} label={(index + 2).toString()} value={index + 2} />
        ))}
      </Picker>
      <Grid size={gridSize} onNumberPress={onNumberPress} disabledNumbers={disabledNumbers} />
      <Button
        title="Generate"
        onPress={generateNumber}
        disabled={!isGenerateButtonEnabled}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  disabledGridItem: {
    backgroundColor: 'lightgrey',
  },
  button: {
    marginTop: 50,
  },
});

export default App;
