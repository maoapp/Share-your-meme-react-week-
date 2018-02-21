import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ImageList = props => {
  return (
    <View style={styles.imagesListContainer}>
      <Text style={styles.imagesListTitle}>Most Famous Memes</Text>
      <ScrollView horizontal>   
        {props.memes.map(image => (
          <TouchableOpacity onPress={() => props.onPress(image.url)}>
            <View>
              <Image style={styles.imageList} source={{ uri: image.url }} />

            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageList: {
    width: 60,
    height: 60,
  },
  imagesListContainer: {
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
    justyfyContent: 'center',
    alignItems: 'center',
  },
  imagesListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageList;
