import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Animated, Easing, PanResponder, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import icons from "./icons";

const BLACK = "#1e272e";
const GRAY = "#485460";
const GREEN = "#2ecc71";
const RED = "#e74c3c";

const Container = styled.View`
  flex: 1;
  background-color: ${BLACK};
`;

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: ${GRAY};
  border-radius: 50px;
`;

const Word = styled.Text`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.color};
`;

const Center = styled.View`
  z-index: 10;
  flex: 3;
  justify-content: center;
  align-items: center;
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  position: absolute;
  background-color: white;
  padding: 30px 20px;
  border-radius: 10px;
`;

export default function App() {
  // Value
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scaleOne = position.y.interpolate({
    inputRange: [-300, -80],
    outputRange: [2, 1],
    extrapolate: "clamp",
  });
  const scaleTwo = position.y.interpolate({
    inputRange: [80, 300],
    outputRange: [1, 2],
    extrapolate: "clamp",
  });
  // Animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.95,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });
  const onDrop = Animated.timing(scale, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const fadeOut = Animated.timing(opacity, {
    toValue: 0,
    duration: 50,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const fadeIn = Animated.spring(opacity, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goBack = Animated.timing(position, {
    toValue: 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  });
  const onsize = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  // Pan Responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({
          x: dx,
          y: dy,
        });
      },
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < -250 || dy > 250) {
          Animated.sequence([
            Animated.parallel([fadeOut, onDrop]),
            goBack,
          ]).start(nextCard);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
    })
  ).current;
  const [index, setIndex] = useState(0);
  const nextCard = () => {
    Animated.parallel([onsize, fadeIn]).start();
    setIndex((prev) => prev + 1);
  };
  return (
    <Container>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleOne }] }}>
          <Word color={GREEN}>알아요</Word>
        </WordContainer>
      </Edge>
      <Center>
        <IconCard
          {...panResponder.panHandlers}
          style={{
            transform: [...position.getTranslateTransform(), { scale }],
            opacity,
          }}
        >
          <Ionicons name={icons[index]} color={GRAY} size={82} />
        </IconCard>
      </Center>
      <Edge>
        <WordContainer style={{ transform: [{ scale: scaleTwo }] }}>
          <Word color={RED}>몰라요</Word>
        </WordContainer>
      </Edge>
    </Container>
  );
}
