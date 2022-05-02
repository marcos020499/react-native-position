import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import RNRestart from "react-native-restart";
import { withNavigation } from "@react-navigation/compat";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import DataMovies from "../components/DataMovies";
import { useSelector } from "react-redux";
import { getDataAsync } from "../redux";
import { useDispatch } from "react-redux";
function Details({ route, navigation }) {
  const { data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id, image } = route.params;

  useEffect(() => {
    dispatch(getDataAsync(id));
  }, [dispatch]);
  const actor = {
    name: data[0]?.name,
    gender: data[0]?.gender,
    popularity: data[0]?.popularity,
  };
  return (
    <View styles={{ backgroundColor: "white" }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View>
          <ImageBackground
            style={styles.imageBackground}
            source={{
              uri: image,
            }}
          />
          <TouchableOpacity
            style={styles.iconReturn}
            onPress={() => {
              navigation.navigate("Home"), RNRestart.Restart();
            }}
          >
            <Image
              style={styles.imageReturn}
              source={{
                uri: "https://res.cloudinary.com/marcos020499/image/upload/v1651187126/544-5440422_back-arrow-icon-transparent-png-clipart-free-download-removebg-preview_znsg41.png",
              }}
            />
          </TouchableOpacity>
          <View style={styles.actorInfo}>
            <View>
              <Text style={styles.name}>{id}</Text>
              <View style={styles.viewGender}>
                <Text style={styles.gender}>
                  {actor.gender == 2 ? "hombre" : "mujer"}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.popularity}>Popularidad</Text>
              <View style={styles.popularityContainer}>
                <Text style={styles.popularityAverage}>{actor.popularity}</Text>
                <Icon name="star" color="gold" style={styles.startInfo}></Icon>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.titlePage}>Películas</Text>
        <DataMovies id={id} data={data} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  iconReturn: {
    left: 35,
    fontSize: 30,
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    top: -425,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 30,
  },
  imageReturn: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: "100%",
    height: 460,
    margin: 0,
    padding: 0,
  },
  actorInfo: {
    display: "flex",
    flexDirection: "row",
    width: "93%",
    marginLeft: 10,
    marginTop: -145,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  name: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
  },
  viewGender: {
    backgroundColor: "gold",
    borderRadius: 20,
    maxWidth: 80,
  },
  gender: {
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    fontWeight: "700",
  },
  popularityContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 40,
  },
  popularity: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
  popularityAverage: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  titlePage: {
    fontSize: 30,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 35,
  },
  startInfo: {
    marginTop: 3,
  },
});
export default withNavigation(Details);
