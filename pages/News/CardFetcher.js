import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { COLORS } from "../../assets/styles";
import CardTemplate from "../../components/CardTemplate";

const CardFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch("http://192.168.1.241:3000/")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(`Something went wrong ${err}`);
      });
  };

  const renderItem = ({ item }) => {
    const { name, imageUri, type, message, picture } = item;
    return (
      <View>
        <CardTemplate
          name={name}
          imageUri={{ uri: imageUri }}
          type={type}
          message={message}
          picture={{
            uri: "https://i.pinimg.com/originals/e9/be/67/e9be67dd130aee203aaed715ddfcf75c.png",
            ///-------->add picture
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  // return (
  //   <View style={styles.container}>
  //     {loading ? (
  //       <ActivityIndicator size="large" color={COLORS.PURPLE} />
  //     ) : (
  //       <FlatList
  //         data={data}
  //         renderItem={renderItem}
  //         keyExtractor={(item) => item._id}
  //         onRefresh={() => fetchData()}
  //         refreshing={loading}
  //       />
  //     )}
  //   </View>
  // );
};

export default CardFetcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
});
