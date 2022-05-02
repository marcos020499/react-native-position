import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import RNRestart from "react-native-restart";

import useFetchPhotoName from "../hooks/useFetchPhotoName";
import useCamera from "../hooks/useCamera";

export default ModalSelection = ({
  isModalVisible,
  setModalVisible,
  navigation,
}) => {
  const { error, fetcher } = useFetchPhotoName();
  const { openGallery, takePicture } = useCamera();
  const [data, setData] = React.useState(null);
  const [status, setStatus] = React.useState("search");
  const [image, setImage] = React.useState(null);

  const labelTitle = {
    search: "Buscando...",
    error: "Hubo un error",
    notfound: "¿Es un famoso?",
    success: "Listo",
  }[status];

  const logicFetch = (formData) => {
    setStatus("search");

    fetcher(formData).then((data) => {
      if (data === null) {
        setStatus("error");
        return;
      }

      if (data?.error) {
        setStatus("notfound");
        return;
      }

      setStatus("success");
      setData(data);
    });
  };

  const doPic = async (info) => {
    if (!info) return;
    setImage(info.uri);
    console.log(info);
    await logicFetch(info.formData);
  };

  const handlePressTakePicture = async () => {
    const info = await takePicture();
    await doPic(info);
  };

  const handlePressGallery = async () => {
    const info = await openGallery();
    await doPic(info);
  };

  const onSubmit = () => {
    if (status !== "success") return;

    navigation.navigate("Details", {
      id: data.actorName,
      image: image,
    });
    setModalVisible(false);
  };

  return (
    <>
      {image ? (
        <View style={styles.container}>
          <Modal
            backdropOpacity={0.3}
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.contentView}
          >
            <View style={styles.content}>
              <View style={styles.containerSelect}>
                <Text style={styles.textState}>{labelTitle}</Text>
                <Image style={styles.image} source={{ uri: image }} />
                <MeButton customMessage={data?.actorName} onPress={onSubmit} status={status} />
              </View>
              {status == "notfound" || status == "error" ? (
                <TouchableOpacity
                  style={styles.closedButton}
                  onPress={() => {
                    RNRestart.Restart();
                  }}
                >
                  <Text style={styles.textData}>Cerrar</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </Modal>
        </View>
      ) : (
        <View style={styles.container}>
          <Modal
            backdropOpacity={0.3}
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.contentView}
          >
            <View style={styles.content}>
              <Text style={styles.contentTitle}> Selecciona una foto</Text>
              <View style={styles.containerSeelect}>
                <View style={styles.viewSelect}>
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/marcos020499/image/upload/v1651463725/Copia_de_Captura_de_Pantalla_2022-05-01_a_la_s__22.52.26-removebg-preview_xuvlmg.png",
                    }}
                    style={styles.icon}
                  />
                  <TouchableOpacity onPress={handlePressGallery}>
                    <Text style={styles.textButton}>Galería de fotos</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.viewSelect}>
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/marcos020499/image/upload/v1651463724/Captura_de_Pantalla_2022-05-01_a_la_s__22.52.26-removebg-preview_bixaoz.png",
                    }}
                    style={styles.icon}
                  />
                  <TouchableOpacity onPress={handlePressTakePicture}>
                    <Text style={styles.textButton}>Cámara</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

function MeButton({ onPress, status, customMessage }) {
  // search | error | notfound | success

  const stylesButton = {
    search: styles.buttonSearch,
    error: styles.buttonError,
    notfound: styles.buttonNotFound,
    success: styles.buttonSuccess,
  }[status];

  const stylesText = {
    search: styles.textData,
    error: styles.textData,
    notfound: styles.textDataBlack,
    success: styles.textData,
  }[status];

  const message = {
    error: "Error de red o de servidor",
    search: "Buscando...",
    notfound: "No se encontro",
    success: customMessage,
  }[status];

  return (
    <TouchableOpacity onPress={onPress} style={stylesButton}>
      <Text style={stylesText}>{message}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 37,
    borderTopLeftRadius: 37,
  },
  contentTitle: {
    fontSize: 18,
    color: "gray",
    paddingTop: 25,
    marginBottom: 12,
    fontWeight: "700",
  },
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  Button: {
    backgroundColor: "black",
    color: "black",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  containerSeelect: {
    right: "30%",
    paddingBottom: 15,
  },
  viewSelect: {
    display: "flex",
    flexDirection: "row",
    padding: 18,
    alignItems: "center",
  },
  textButton: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  //modal state
  image: {
    alignSelf: "center",
    height: 200,
    width: 170,
    borderRadius: 30,
    marginBottom: 15,
  },
  textState: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800",
    paddingTop: 20,
    paddingBottom: 20,
    color: "gray",
  },

  buttonSuccess: {
    backgroundColor: "limegreen",
    opacity: 0.9,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonError: {
    backgroundColor: "red",
    opacity: 0.9,
    color: "red",
    borderRadius: 15,
    padding: 10,
  },
  buttonSearch: {
    backgroundColor: "mediumblue",
    opacity: 0.9,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonNotFound: {
    backgroundColor: "gold",
    opacity: 0.9,
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  textData: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
  },
  textDataBlack: {
    color: "black",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
  },
  closedButton: {
    backgroundColor: "mediumblue",
    borderRadius: 12,
    padding: 18,
    marginBottom: 10,
    marginTop: 20,
    width: 270,
  },
});
