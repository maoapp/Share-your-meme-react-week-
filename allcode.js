import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Expo, { Constants } from 'expo';

let { width } = Dimensions.get('window');
let size = width;

const memeTemplateImageUris = [
  'https://i.imgflip.com/2/1bij.jpg',
  'https://i.imgflip.com/2/1bgw.jpg',
  'https://i.imgflip.com/2/4t0m5.jpg',
  'https://i.imgflip.com/1og7s3.jpg',
  'https://i.imgur.com/QT8j0d8.png',
];

export default class App extends Component {
  state = {
    imgUri: memeTemplateImageUris[
      Math.floor(Math.random() * memeTemplateImageUris.length)
    ],
    topText: 'aa',
    bottomText: '',
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ topText: text })}
          value={this.state.topText}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={text => this.setState({ bottomText: text })}
          value={this.state.bottomText}
        />

        <View
          ref={ref => {
            this._memeView = ref;
          }}>
          <Image
            source={{ uri: this.state.imgUri }}
            style={{ height: size, width: size }}
          />
          <Text style={[styles.memeText, { top: 5 }]}>
            {this.state.topText}
          </Text>
          <Text style={[styles.memeText, { bottom: 5 }]}>
            {this.state.bottomText}
          </Text>
        </View>

        <Button title="Take a Photo" onPress={this._takePhotoAsync} />
        <Button title="Choose a Photo" onPress={this._choosePhotoAsync} />
        <View style={{ flexDirection: 'row' }}>
          {memeTemplateImageUris.map((imgUri) => {
            let uri = imgUri;
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ imgUri: uri });
                }}>
                <Image source={{ uri: imgUri }} style={styles.templateImage} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Button title="Share Meme" onPress={this._shareAsync} />
      </ScrollView>
    );
  }

  _saveAsync = async () => {
    let imgUri = await Expo.takeSnapshotAsync(this._memeView);
    console.log('imgUri=', imgUri);
    let currentList = this.state.storedMemeImages;
    console.log('currentList=', currentList);
    let newList = [].concat(this.state.storedMemeImages);
    newList.push(imgUri);
    console.log('newList=', newList);
    this.setState({ storedMemeImages: newList });
  };

  _shareAsync = async () => {
    let imgUri = await Expo.takeSnapshotAsync(this._memeView);
    console.log('imgUri=', imgUri);
    let cloudUri = await uploadImageAsync(imgUri);
    await Share.share({ url: cloudUri });
  };

  _takePhotoAsync = async () => {
    let image = await Expo.ImagePicker.launchCameraAsync();
    if (!image.cancelled) {
      this.setState({ imgUri: image.uri });
    }
  };

  _choosePhotoAsync = async () => {
    let image = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!image.cancelled) {
      this.setState({ imgUri: image.uri });
    }
  };
}

async function uploadImageAsync(uri) {
  const formData = new FormData();
  formData.append('upload', {
    uri: uri,
    name: 'upload.png',
    type: 'image/png',
  });

  const res = await fetch('http://uploads.im/api', {
    method: 'POST',
    body: formData,
  });
  console.log('result');
  let url = JSON.parse(res._bodyText).data.img_url;
  console.log(url);

  return url;
}

const styles = StyleSheet.create({
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
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    width: width,
  },
  templateImage: {
    height: 60,
    width: 60,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
