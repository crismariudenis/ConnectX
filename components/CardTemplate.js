import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import TypeIcon from '../pages/Profile/CodeInput/TypeIcon';
import { COLORS } from '../assets/styles';
const Card = ({name,type,message,picture ,imageUri}) => {
    return (
      <View style={[styles.cardContainer, {}]}>
        <Image style={styles.image} source={imageUri} />
        <View style={styles.infoContainer}>
          <Image
            style={[
              styles.profile,
              {
                borderColor:
                  type == "fetcher" ? COLORS.FETCH_GREEN : COLORS.CATCH_ORANGE,
              },
            ]}
            source={picture}
          />
          <View>
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "red",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
                //width:100,
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      type == "fetcher"
                        ? COLORS.FETCH_GREEN
                        : COLORS.CATCH_ORANGE,
                    fontSize: 20,
                  },
                ]}
              >
                {name}
              </Text>
              <TypeIcon type={type} />
            </View>

            <Text
              style={[
                styles.text,
                {
                  color:
                    type == "fetcher"
                      ? COLORS.FETCH_GREEN
                      : COLORS.CATCH_ORANGE,
                  ///310-imagewidth
                  width: 310 - 73,
                },
              ]}
            >
              {message}
            </Text>
          </View>
        </View>
      </View>
    );
}

export default Card

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
