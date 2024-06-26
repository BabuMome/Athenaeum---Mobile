import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
// Components
import CardView from "../components/CardView";
import BookModal from "../components/BookModal";
// Sample Data
import { books } from "../data_samples/bookData";

export default function CardCatalog() {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulates refreshing, remove value on deployment
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
    }, 10000); // Simulates loading more data, remove value on deployment
  };

  const handleBookPress = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
  };

  const renderBook = ({ item }) => (
    <View>
      <CardView
        onPress={() => handleBookPress(item)}
        book_title={item.book_title}
        book_author={item.book_author}
      />
    </View>
  );

  const ListFooterComponent = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerContainer}>
        <LottieView
          style={styles.loaderStyle}
          source={require("../assets/animations/loader.json")}
          autoPlay
          loop
        />
      </View>
    );
  };

  const emptyList = (
    <View style={styles.emptyListContainer}>
      <Image
        style={styles.emptyListImage}
        source={require("../assets/img/empty-list.png")}
      />
      <Text style={styles.emptyListText}>Something went wrong.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/img/logo-white-ai-brushed.png")}
        />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionText}>Card Catalog</Text>
        </View>
      </View>

      <FlatList
        style={styles.flatlistContainer}
        data={books}
        renderItem={renderBook}
        keyExtractor={(item, id) => id.toString()}
        ListEmptyComponent={emptyList}
        ListFooterComponent={ListFooterComponent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        showsVerticalScrollIndicator={false}
      />

      <BookModal
        visible={modalVisible}
        book={selectedBook}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    marginTop: hp(0),
    marginLeft: wp(1),
    borderRadius: 35,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  headerContainer: {
    height: hp(18),
    width: wp(100),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#780000",
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
    alignContent: "center",
    textAlign: "center",
    marginBottom: hp(2),
  },
  sectionText: {
    fontFamily: "CreteRound-Regular",
    fontSize: 20,
    color: "white",
    marginTop: hp(1),
    marginBottom: hp(1),
    marginLeft: wp(0),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  emptyListText: {
    fontFamily: "CreteRound-Regular",
    fontSize: 20,
    color: "#848A86",
    marginTop: hp(-4),
    marginBottom: hp(1),
    marginLeft: wp(2),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  emptyListImage: {
    height: hp(30),
    width: wp(50),
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(5),
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginTop: hp(20),
    marginBottom: hp(20),
    marginLeft: wp(20),
    marginRight: wp(20),
    height: hp(20),
    width: wp(60),
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  footerContainer: {
    position: "relative",
    borderTopWidth: 0,
    borderColor: "#CED0CE",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp(20),
  },
  absoluteLoaderContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderStyle: {
    position: "absolute",
    width: wp(20),
    height: hp(24),
    bottom: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
});
