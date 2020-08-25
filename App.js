import React, { Component, useState, useEffect } from "react";
import {
  StatusBar,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

function Shape(props) {
  const windowWidth = Dimensions.get("window").width / 2;
  const Center = windowWidth / 2;
  const Radius = Center - 20;

  const numSides = props.sides;
  const [polygonPoints, setPolygonPoints] = useState();

  useEffect(() => {
    let newPolyPoints = "";
    const angle = (2 * Math.PI) / numSides;
    for (let side = 0; side < numSides; side++) {
      const x = Math.cos(angle * side) * Radius + Center;
      const y = Math.sin(angle * side) * Radius + Center;
      newPolyPoints = `${newPolyPoints} ${x},${y}`;
    }
    setPolygonPoints(newPolyPoints);
  }, [numSides]);

  return (
    <Svg style={styles.svg} width={windowWidth} height={windowWidth}>
      <Polygon
        points={polygonPoints}
        fill="#00C2B8"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, n: 0 };
  }

  checkUserInput = () => {
    let x = parseInt(this.state.x);
    let y = parseInt(this.state.y);

    this.setState((prevState) => {
      prevState.n = x + y;

      if (0 < x && y < 10 && prevState.n !== 2) {
        return prevState.n;
      } else if (prevState.n == 2) {
        alert("Cannot create a shape using " + prevState.n + " side(s).");
      } else {
        alert(
          "First Number should be greater than 0 and the Secound Number should be less than 10."
        );
      }
    });

    this.firstNum.clear();
    this.secoundNum.clear();
    Keyboard.dismiss();
  };

  clearShape = () => {
    this.setState((prevState) => {
      return (prevState.n = 0);
    });

    this.firstNum.clear();
    this.secoundNum.clear();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.formContent}>
          <StatusBar style="auto" />
          <Text>Hello Serendip!</Text>
          <TextInput
            style={styles.TextInput}
            onChangeText={(x) => this.setState({ x })}
            placeholder="First Number (X)"
            keyboardType="numeric"
            ref={(input) => {
              this.firstNum = input;
            }}
          ></TextInput>
          <TextInput
            style={styles.TextInput}
            onChangeText={(y) => this.setState({ y })}
            placeholder="Secound Number (Y)"
            keyboardType="numeric"
            ref={(input) => {
              this.secoundNum = input;
            }}
          ></TextInput>
          <View style={styles.button}>
            <Button
              color="#00C2B8"
              title="Shape Me"
              onPress={() => {
                this.checkUserInput();
              }}
            ></Button>
          </View>
          <View style={styles.button}>
            <Button
              color="#00C2B8"
              title="Clear Shape"
              onPress={() => {
                this.clearShape();
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.shapesBox}>
          <Text
            style={[
              this.state.n == 0 ? styles.resultTexthide : styles.resultTextShow,
            ]}
          >
            There're {this.state.n} Sides
          </Text>
          <Shape sides={this.state.n}></Shape>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  formContent: {
    flexDirection: "column",
    margin: 5,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    width: 150,
    borderWidth: 1,
    borderColor: "#00C2B8",
    margin: 10,
    padding: 10,
  },
  button: {
    margin: 5,
  },
  shapesBox: {
    margin: 20,
    width: 275,
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#00C2B8",
    alignItems: "center",
    justifyContent: "center",
  },
  resultTextShow: {
    fontWeight: "bold",
    color: "white",
  },
  resultTexthide: {
    display: "none",
  },
  svg: {
    aspectRatio: 1,
    backgroundColor: "#00C2B8",
  },
});
