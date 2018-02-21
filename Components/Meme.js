import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const size = width;

const Meme = props => {
  return (
    <View style={styles.meme}>
      <Image
        source={{ uri: props.imgUri }}
        style={styles.memeImage}
      />
      <Text style={[styles.memeText, { top: 5 }]}>
        {props.topText}
      </Text>
      <Text style={[styles.memeText, { bottom: 5 }]}>
        {props.bottomText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  memeImage: {
    width: size,
    height: 250
  },
  memeText: {
    color: 'white',
    fontSize: 38,
    fontWeight: '900',
    textAlign: 'center',
    position: 'absolute',
    left: 5,
    right: 5,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowRadius: 5,
    textShadowOffset: { height: 2, width: 2 },
  },
  meme: {
    marginTop: 10,
    flex: 1,
  },
});

export default Meme;
