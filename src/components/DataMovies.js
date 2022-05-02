import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { withNavigation } from "@react-navigation/compat";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { normalizrMovies } from "../helpers/helperArray";
function Details({ data }) {
  const movies = normalizrMovies(data);
  return (
    <>
      {React.Children.toArray(
        movies.map((movie) => (
          <View style={styles.containerMovie}>
            <View style={styles.description}>
              <Text style={styles.title} numberOfLines={1}>
                {movie.original_title}
              </Text>
              <Text style={styles.overview} numberOfLines={5}>
                {movie.overview}
              </Text>
            </View>
            <View style={styles.imageMovie}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.startContainer}>
                <Text style={styles.startText}>{movie.vote_average}</Text>
                <Icon name="star" color="gold" style={styles.start}></Icon>
              </View>
            </View>
          </View>
        ))
      )}
    </>
  );
}
const styles = StyleSheet.create({
  containerMovie: {
    backgroundColor: "ghostwhite",
    borderRadius: 15,
    margin: 10,
    display: "flex",
    flexDirection: "row",
  },
  description: {
    width: "71%",
  },
  title: {
    fontSize: 25,
    padding: 10,
    fontWeight: "700",
  },
  overview: {
    fontSize: 15,
    lineHeight: 20,
    paddingLeft: 10,
    fontWeight: "700",
  },
  poster: {
    width: 75,
    height: 130,
    borderRadius: 15,
  },
  imageMovie: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  startContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingTop: 15,
    top: -7,
  },
  startText: {
    fontSize: 16,
    fontWeight: "700",
  },
  start: {
    fontSize: 15,
    paddingBottom: 2,
  },
});
export default withNavigation(Details);
