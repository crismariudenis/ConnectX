import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { COLORS } from "../../../assets/styles";
import Card from "../../../components/Card";

const CardFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    const renderItem = ({ name, picture, message, type }) => {

        return <Card name={name} picture/>
    };
  useEffect(() => {
    fetch("http://192.168.1.241:3000/")
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      });
  }, []);
  return (
    <View>
      <Text style={{ color: "red" }}>Card Fetcher</Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.PURPLE} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default CardFetcher;

const styles = StyleSheet.create({});
