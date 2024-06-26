import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import WordSlide from "../components/WordSlide";

const settingsOptions = [
  { id: "1", title: "Account", icon: "person", screen: "Account" },
  {
    id: "2",
    title: "Terms and Conditions",
    icon: "alert",
    screen: "TermsAndConditions",
  },
  {
    id: "3",
    title: "Privacy Policy",
    icon: "lock-closed",
    screen: "Privacy Policy",
  },
  { id: "4", title: "About Athenaeum", icon: "information", screen: "About" },
  { id: "5", title: "Logout", icon: "log-out" },
];

export default function Settings() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      activeOpacity={0.8}
      onPress={() => navigation.navigate(item.screen)}
    >
      <Ionicons name={item.icon} size={24} color="maroon" />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/img/logo-white-ai-brushed.png")}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Settings</Text>
        </View>
      </View>
      <View style={styles.wordSlideContainer}>
        <LottieView
          style={styles.animation}
          source={require("../assets/animations/faculty.json")}
          autoPlay={true}
          loop={true}
        />
        <View style={styles.wordSlide}>
          <WordSlide />
        </View>
      </View>
      <FlatList
        style={styles.listContainer}
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.settingsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    height: hp(18),
    width: wp(100),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#780000",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: wp(50),
    height: hp(10),
    marginTop: hp(3),
  },
  sectionContainer: {
    width: wp(50),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2),
  },
  sectionText: {
    fontFamily: "CreteRound-Regular",
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  settingsList: {
    marginTop: hp(2),
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: hp(3),
    width: wp(80),
    backgroundColor: "#f5deb3",
    borderColor: "#8b4513",
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#8b4513",
    fontFamily: "CreteRound-Regular",
  },
  listContainer: {
    marginLeft: wp(9),
  },
  animation: {
    top: hp(3.5),
    left: wp(65),
    marginTop: hp(1),
    height: hp(20),
    width: wp(30),
  },
  wordSlideContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  wordSlide: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: wp(10),
    height: hp(20),
    width: wp(50),
    flexWrap: "wrap",
  },
});
