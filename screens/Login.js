import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
export default function Login() {
  const [isLoading, setisLoading] = useState(false);
  const [idNumber, setIdNumber] = useState(""); // Fixed here
  const [password, setPassword] = useState("");

  // Password Visibility Configurations
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };
  // ShareValues
  const loginTextY = useSharedValue(0);
  const logoY = useSharedValue(0);
  const inputY = useSharedValue(0);
  // Arrays
  const [randomQuotes, setRandomQuotes] = useState("");
  const loaderQuotes = [
    "Books are the mirrors of the soul. \n\n ― Virginia Woolf",
    "Books are a uniquely portable magic. \n\n ― Stephen King",
    "A book is a gift you can open again and again. \n\n ― Garrison Keillor",
    "Thank you ChatGPT! \n\n ― Mayor",
    "There is no friend as loyal as a book.\n\n ― Ernest Hemingway",
    "Kapag ang palay naging bigas, may bumayo.\n\n ― Ericzon",
    "Aldub pa din. \n\n ― Mayor",
    "I kept always two books in my pocket, one to read, one to write in. \n\n ― Robert Louis Stevenson",
  ];
  // Random Quotes for Loader
  const setRandomWelcomeMessage = () => {
    const randomIndex = Math.floor(Math.random() * loaderQuotes.length);
    setRandomQuotes(loaderQuotes[randomIndex]);
  };
  useEffect(() => {
    setRandomWelcomeMessage();
    const interval = setInterval(() => {
      setRandomWelcomeMessage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Navigation after Loader
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      setisLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // For visualization only. Remove the timeout on deployment.
      console.log(
        "Logging in with:",
        idNumber,
        "\nWith the password of: ",
        password
      );
      navigation.navigate("Card Catalog");
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  // Navigation to Register (Module)
  const handleRegister = () => {
    navigation.navigate("Module");
  };

  // Animated Styles
  const animatedLoginTextStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: loginTextY.value }],
    };
  });
  const animatedLogoStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: logoY.value }],
    };
  });
  const animatedInputStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: inputY.value }],
    };
  });

  /* Active Input Field Configurations */
  // For text.
  const onFocusInput = () => {
    loginTextY.value = withSpring(-50);
    logoY.value = withSpring(-25);
    inputY.value = withSpring(-50);
  };
  // For logo.
  const onBlurInput = () => {
    loginTextY.value = withSpring(0);
    logoY.value = withSpring(0);
    inputY.value = withSpring(0);
  };

  /* Loader Configs */
  if (isLoading) {
    return (
      <Modal
        style={styles.modalContainer}
        animationType="fade"
        transparent={true}
        visible={isLoading}
        /*  onRequestClose={() => {}} // This is required for Android */
      >
        <View style={styles.modalContainer}>
          <View style={styles.loaderContainer}>
            <LottieView
              style={styles.loaderStyle}
              source={require("../assets/animations/loader.json")}
              autoPlay
              loop
            />
            <Text
              style={{
                fontFamily: "CreteRound-Regular",
                fontSize: 30,
                color: "maroon",
                textAlign: "center",
              }}
            >
              {" "}
              {randomQuotes}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={{ flex: 1 }}>
        {/* Logo and Text */}
        <Animated.View style={[styles.logoTextContainer, animatedLogoStyles]}>
          <Image
            style={styles.logo}
            source={require("../assets/img/logo.png")}
          />
        </Animated.View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
        >
          {/* Login Form */}
          <View style={styles.loginForm}>
            <Animated.View
              style={[styles.animatedTextContainer, animatedLoginTextStyles]}
            >
              <Text
                style={{
                  fontFamily: "CreteRound-Regular",
                  fontSize: 30,
                  color: "#671111",
                }}
              >
                LOGIN
              </Text>
            </Animated.View>
            <Animated.View style={animatedInputStyles}>
              <TextInput
                style={styles.inputID}
                placeholder="ID Number"
                onChangeText={(text) => setIdNumber(text)}
                value={idNumber}
                onFocus={onFocusInput}
                onBlur={onBlurInput}
              />
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Password"
                  secureTextEntry={passwordVisibility}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  onFocus={onFocusInput}
                  onBlur={onBlurInput}
                />
                {/* Add the eye icon button */}
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  style={styles.eyeIcon}
                >
                  <FontAwesome5
                    name={passwordVisibility ? "eye-slash" : "eye"}
                    size={20}
                    color="#555"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
            <Text
              style={{
                fontFamily: "CreteRound-Regular",
                fontSize: 20,
                color: "#FFF",
              }}
            >
              LOGIN
            </Text>
          </TouchableOpacity>
          <View style={styles.question}>
            <Text style={styles.textQuestion}> Don't have an account?</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={handleRegister}
          >
            <Text
              style={{
                fontFamily: "CreteRound-Regular",
                fontSize: 20,
                color: "#FFF",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoTextContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: hp(1),
    marginBottom: hp(-1),
  },
  buttonsContainer: {
    marginTop: hp(-3),
  },
  animatedTextContainer: {
    position: "absolute",
    top: hp(0),
  },
  loginForm: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: wp(60),
    height: hp(30),
    resizeMode: "contain",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#FAB907",
  },
  inputID: {
    backgroundColor: "white",
    borderWidth: 2,
    width: wp(85),
    height: hp(9),
    borderRadius: 10,
    marginBottom: hp(3),
    paddingLeft: wp(5),
  },
  buttonLogin: {
    marginTop: hp(5),
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#671111",
    borderRadius: 10,
    height: hp(5),
  },
  buttonRegister: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#671111",
    borderRadius: 10,
    marginBottom: hp(2),
    height: hp(5),
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  question: {
    height: hp(5),
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textQuestion: {
    fontFamily: "CreteRound-Regular",
  },
  loaderText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FAB907",
    fontFamily: "CreteRound-Regular",
    bottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderStyle: {
    width: 200,
    height: 200,
    fontFamily: "CreteRound-Regular",
  },
  loaderContainer: {
    borderRadius: 20,
    padding: 20,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    width: wp(85),
    height: hp(9),
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: hp(5),
  },
  inputPassword: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: wp(5), // Make space for the eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: wp(5),
  },
  animation: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    zIndex: -1,
  },
});
