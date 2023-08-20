import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

const colors = {
  colorKeyboard: '#2c3e50',
  colorDisplay: '#27ae60'
}

type ButtonProps = {
  title: string,
  type: "number" | "operator",
  onPress?: () => void,
}

type Operators = "+" | "-" | "*" | "/" | "=" | "";

function Button(props: ButtonProps) {


  const colorBG = props.type === "number" ? "#34495e" : "#f39c12";
  const colorText = props.type === "number" ? "#ecf0f1" : "#34495e";


  return (
    <TouchableOpacity onPress={props.onPress} style={{ width: 100, height: 100, backgroundColor: colorBG, borderRadius: 50, alignItems: 'center', justifyContent: "center"}}>
      <Text style={{color: colorText, fontSize: 30}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default function App() {
  const [value1, setValue1] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operators>("");

  const [result, setResult] = useState<number | null>(0);

  const [display, setDisplay] = useState<Array<string>>([]);

  const handlePressNumberButton = (value: Number) => {
    setDisplay((prev) => {
      if (prev[0] === "+" || prev[0] === "-" || prev[0] === "*" || prev[0] === "/") {
        return [String(value)];
      } 

      return [...prev, String(value)];
    });
  }

  const removeLastNumber = () => {
    setDisplay((prev) => prev.slice(0, prev.length - 1));
  }

  let numberToDisplay = display.join("");

  function calculeValues() {
    if(value1 && value2) {
      if (operator === "+") {
        return value1 + value2;
      } else if (operator === "-") {
        return value1 - value2;
      } else if (operator === "*") {
        return value1 * value2;
      } else if (operator === "/") {
        return value1 / value2;
      }
    }
  }

  const pressOnOperator = (operator: Operators) => {
    if(operator !== "=") {
      setOperator(operator);
      setDisplay([operator]);
    }

    if (value1 === null) {
      setValue1(Number(numberToDisplay));
    } else if (value2 === null) {
      setValue2(Number(numberToDisplay));
    }

    if (operator === "=") {
      setTimeout(() => {
        const value = calculeValues();

        setResult(value || null);
      }, 100)
    }
  }
  
  const clearAllStates = () => {
    setValue1(null);
    setValue2(null);
    setOperator("");
    setResult(null);
    setDisplay([]);
  }
 

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.view1}>
        <Text style={styles.countText}>{result || numberToDisplay}</Text>
      </SafeAreaView>
      <SafeAreaView style={styles.containerNumber}>
        <View style={styles.viewNumber}>
          <Button title="1" type="number" onPress={() => handlePressNumberButton(1)} />
          <Button title='2' type="number" onPress={() => handlePressNumberButton(2)} />
          <Button title='3' type="number" onPress={() => handlePressNumberButton(3)} />
          <Button title='+' type="operator" onPress={() => pressOnOperator("+")} />
          <Button title='4' type="number" onPress={() => handlePressNumberButton(4)} />
          <Button title='5' type="number" onPress={() => handlePressNumberButton(5)} />
          <Button title='6' type="number" onPress={() => handlePressNumberButton(6)} />
          <Button title='-' type="operator" onPress={() => pressOnOperator("-")} />
          <Button title='7' type="number" onPress={() => handlePressNumberButton(7)} />
          <Button title='8' type="number" onPress={() => handlePressNumberButton(8)} />
          <Button title='9' type="number" onPress={() => handlePressNumberButton(9)} />
          <Button title='x' type="operator" onPress={() => pressOnOperator("*")} />
          <Button title='0' type="number" onPress={() => handlePressNumberButton(0)} />
          <Button title='/' type="operator" onPress={() => pressOnOperator("/")} />
          <Button title='=' type="operator" onPress={() => pressOnOperator("=")} />
          <Button title='<-' type="operator" onPress={removeLastNumber} /> 
        </View>

        <TouchableOpacity onPress={clearAllStates} style={{height: 50, width: '80%', alignItems: "center", justifyContent: "center", backgroundColor: "#ecf0f1", borderRadius: 16 }}>
           <Text style={{ fontSize: 20, fontWeight: "bold", color: "#c0392b"}}>Apagar tudo</Text>
        </TouchableOpacity> 
        
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    flex: 1,
    backgroundColor: colors.colorDisplay,
    width: '100%',
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  countText: {
    fontSize: 50,
    paddingRight: 10,
    color: "#2c3e50"
  },
  containerNumber: { 
    flex: 3, 
    backgroundColor: colors.colorKeyboard,
    width: '100%',
    alignItems: "center",

  },
  viewNumber: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: "center",

    paddingTop: 20,
    gap: 7,
  }
});

