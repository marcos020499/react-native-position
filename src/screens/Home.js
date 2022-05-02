import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Container from "../components/Container";
import { withNavigation } from "@react-navigation/compat";
import ModalContent from "../components/ModalSelection";

function Home({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState("");
  //const [data, setData] = useState('');
  const [errors, setErrors] = useState("");

  return (
    <Container>
      <Text style={styles.title}>Hey, Dev👋</Text>
      <Text style={styles.description}>Keep up the good work</Text>
      <Text style={styles.question}>¿Quién es el famoso?</Text>
      <TouchableOpacity
        style={styles.containerSelect}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://res.cloudinary.com/marcos020499/image/upload/v1650999816/Captura_de_Pantalla_2022-04-26_a_la_s__13.59.47-removebg-preview_tyegcl.png",
          }}
        />
        <Text style={styles.textPhoto}>Presiona para elegir una foto</Text>
      </TouchableOpacity>
      <ModalContent
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
    </Container>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  description: {
    fontSize: 20,
    fontWeight: "700",
    color: "gray",
  },
  image: {
    width: 66,
    height: 58,
  },
  question: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: "700",
  },
  textPhoto: {
    textAlign: "center",
    color: "royalblue",
    fontWeight: "700",
  },
  textSelection: {
    color: "gray",
    fontSize: 16,
    fontWeight: "700",
  },
  containerSelect: {
    borderWidth: 2.2,
    borderStyle: "dashed",
    borderColor: "royalblue",
    padding: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 30,
  },
});
export default withNavigation(Home);
