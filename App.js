import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, TouchableOpacity } from "react-native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setup] = useState(true);
  const Y = useRef(new Animated.Value(0)).current;
  const toggleUp = () => setup((prev) => !prev);
  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start(toggleUp);
  };
  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
    </Container>
  );
}
