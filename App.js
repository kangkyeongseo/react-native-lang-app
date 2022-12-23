import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";

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
  const [up, setup] = useState(false);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  const toggleUp = () => setup((prev) => !prev);
  const moveUp = () => {
    Animated.timing(position.y, {
      toValue: up ? 300 : -300,
      useNativeDriver: false,
      duration: 2000,
    }).start(toggleUp);
  };
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });
  const bgColor = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255,99,71)", "rgb(71,166,255)"],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            transform: [{ translateY: position.y }, { rotateY: rotation }],
            backgroundColor: bgColor,
            borderRadius,
          }}
        />
      </Pressable>
    </Container>
  );
}
