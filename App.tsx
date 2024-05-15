import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {View, Button, StyleSheet, Dimensions} from 'react-native';
import Grid from './src/components/Grid';

const App = () => {
  const [gridSize, setGridSize] = useState<number>(2); // Default grid size is 2x2
  const [disabledNumbers, setDisabledNumbers] = useState<number[]>([]);
  const [generatedNumber, setGeneratedNumber] = useState<number | undefined>(
    undefined,
  );
  const [isGenerateButtonEnabled, setGenerateButtonEnabled] =
    useState<boolean>(true);
  const [generatedNumbersHistory, setGeneratedNumbersHistory] = useState<
    number[]
  >([]);

  const onNumberPress = (number: number) => {
    console.log(number);
    console.log(generatedNumber);
    if (generatedNumber === number) {
      setGenerateButtonEnabled(true);
    }
  };

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

    if (randomNum === -1) {
      console.log('All possible numbers generated');
    }

    setGeneratedNumber(randomNum);
    setDisabledNumbers([...disabledNumbers, randomNum]);
    setGenerateButtonEnabled(false);
    setGeneratedNumbersHistory([...generatedNumbersHistory, randomNum]);
  };

  const resetGrid = () => {
    setGeneratedNumber(undefined);
    setDisabledNumbers([]);
    setGenerateButtonEnabled(true);
    setGeneratedNumbersHistory([]);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={gridSize}
        onValueChange={itemValue => {
          setGridSize(itemValue);
          resetGrid();
        }}
        style={styles.picker}>
        {[...Array(8)].map((_, index) => (
          <Picker.Item
            key={index}
            label={(index + 2).toString()}
            value={index + 2}
          />
        ))}
      </Picker>
      <Grid
        size={gridSize}
        onNumberPress={onNumberPress}
        disabledNumbers={disabledNumbers}
        gridBoxWidth={Dimensions.get('window').width * 0.9}
      />
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
    justifyContent: 'space-around'
  },
  picker: {
    height: 50,
    width: 100,
  },
  button: {
    marginTop: 50,
  },
});

export default App;
