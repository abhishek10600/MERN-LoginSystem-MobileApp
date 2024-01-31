import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View, Animated, Dimensions } from 'react-native';
import FormHeader from './src/components/FormHeader';
import FormSelectorButton from './src/components/FormSelectorButton';
import LoginForm from './src/components/LoginForm';
import SignupForm from './src/components/SignupForm';
import { useRef } from 'react';

const screenWidth = Dimensions.get("window").width

export default function App() {

  const animation = useRef(new Animated.Value(0)).current;

  const scrollView = useRef();

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, screenWidth],
    outputRange: ["#1b1b33", "rgba(27,27,51,0.5)"]
  })

  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, screenWidth],
    outputRange: ["rgba(27,27,51,0.5)", "#1b1b33"]
  })

  return (
    <View style={{
      flex: 1,
      paddingTop: 90
    }}>
      <View style={{ height: 90 }}>
        <FormHeader
          title={"Task-O-fy"}
          subHeading={"Your Task Manager"}
        />
      </View>
      <View style={
        {
          flexDirection: "row",
          paddingHorizontal: 20
        }}>
        <FormSelectorButton
          onPressProp={() => scrollView.current.scrollTo({ x: 0 })}
          title={"Login"}
          borderStyle={styles.borderLeft}
          backgroundColor={loginColorInterpolate} />
        <FormSelectorButton
          onPressProp={() => scrollView.current.scrollTo({ x: screenWidth })}
          title={"Signup"}
          borderStyle={styles.borderRight}
          backgroundColor={signupColorInterpolate} />
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: animation } } }], { useNativeDriver: false })}>
        <LoginForm />
        <SignupForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  borderRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
});
