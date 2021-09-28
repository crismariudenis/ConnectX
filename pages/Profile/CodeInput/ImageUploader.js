import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Image, Button, Alert } from "react-native";
import { COLORS } from "../../../assets/styles";
import TypeIcon from "./TypeIcon";
import Card from "../../../components/CardTemplate";
const ImageUploader = ({
  imageUri,
  message,
  type,
  picture,
  name,
  email,
  resetValue,
}) => {
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [response, setResponse] = React.useState("Your was declined");
  const [showImage, setShowImage] = useState(false);
  const [url, setUrl] = useState("https://i.imgur.com/TnQwHaZ.png");///----->Default Route
  useEffect(() => {
    if (imageUri.uri) setShowImage(true);
    else setShowImage(false);
  }, [imageUri]);
  const handleProgress = (event) => {
    setUploadProgress(Math.round((event.loaded * 100) / event.total));
  };
  const submitData = () => {
    fetch("http://192.168.1.241:3000/send-data", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        picture,
        imageUri:url,
        message,
        type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Alert.alert(`${data.name} is saved successfuly`);
      })
      .catch(err => {
      Alert.alert(`Something went wrong ${err}`)
    })
    
    
    resetValue();
  };
  const onClickUpload = () => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("image", {
      uri: imageUri.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });
    xhr.upload.addEventListener("progress", handleProgress);
    xhr.addEventListener("load", () => {
      setUploadProgress(100);
      setResponse(xhr.response);
      setUrl(JSON.parse(xhr.response).data.link);
    // console.log(JSON.parse(response).data.link);
      console.log(response);
      setShowImage(false);
    });

    xhr.open("POST", "https://api.imgur.com/3/image/");
    ///-------------------------------------------------------->REMOVE CLIENT ID
    xhr.setRequestHeader("Authorization", "Client-ID ed933d74113ba19");
    xhr.send(formData);
    submitData();
  };
  return (
    <View style={styles.container}>
      {showImage && (
        <View style={[styles.cardContainer, {}]}>
          <Card
            name={name}
            imageUri={imageUri}
            type={type}
            message={message}
            picture={picture}
          />
        </View>
      )}
      <Button
        onPress={() => {
          onClickUpload();
          //onClickUpload()-> submitData()->resetValue()
        }}
        title="Send Data"
        color={COLORS.PURPLE}
      />
      {/* <Button
        // onPress={() => this.handlePress()}
        onPress={() => resetValue()}
        title="Press"
        color={COLORS.PURPLE}
      /> */}
      {/* <Text style={{ color: COLORS.PURPLE }}>Uploaded {uploadProgress}%</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: 420,
    width: 310,
    position: "relative",
  },
  profile: {
    borderRadius: 100,
    width: 70,
    height: 70,
  },
  cardContainer: {
    alignContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    width: 240,
    bottom: 85,
    left: 3,
  },
  text: {
    alignContent: "center",
    alignItems: "center",
    left: 3,
    fontSize: 10,
  },
});

export default ImageUploader;
