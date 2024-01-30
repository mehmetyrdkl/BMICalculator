import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  StatusBar,
} from "react-native";

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("");

  const weightInputRef = useRef(null);

  const handleTapOutside = () => {
    Keyboard.dismiss();
  };

  //handling the focus to the second input
  const handleHeightChange = (input) => {
    setHeight(input);
    if (input.length === 3) {
      weightInputRef.current.focus();
    }
  };

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
    setResult(bmi.toFixed(2));
    Keyboard.dismiss();
    // resetting the form after we get the result
    setHeight("");
    setWeight("");
  };

  const disableButton = () => {
    return height === "" || weight === "";
  };

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <View style={styles.appWrapper}>
        <StatusBar
          backgroundColor="#f2efe5"
          barStyle="dark-content"
          translucent
        />
        <Text style={styles.title}>BMI Calculator</Text>
        <View style={styles.formWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Your height in cm..."
            onChangeText={handleHeightChange}
            value={height}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            ref={weightInputRef}
            placeholder="Your weight in kgs..."
            onChangeText={(weight) => setWeight(weight)}
            value={weight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Calculate BMI"
            onPress={calculateBMI}
            disabled={disableButton()}
          />
        </View>
        {result !== "" && (
          <View style={styles.resultWrapper}>
            <Text style={styles.result}>Your BMI is: </Text>
            <Text
              style={[
                styles.result,
                {
                  color:
                    result < 18.5
                      ? "#FFA500"
                      : result >= 18.5 && result < 24.9
                      ? "#008000"
                      : result >= 25 && result < 29.9
                      ? "#FFA500"
                      : "#FF0000",
                },
              ]}
            >
              {result}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    backgroundColor: "#f2efe5",
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 80,
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
  formWrapper: {
    paddingTop: 20,
    gap: 10,
  },
  input: {
    height: 40,
    gap: 20,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  buttonWrapper: {
    paddingTop: 20,
  },
  button: {
    marginTop: 60,
  },
  resultWrapper: {
    flexDirection: "row",
  },
  result: {
    paddingTop: 20,
  },
});
