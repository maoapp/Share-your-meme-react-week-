import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios'; // 0.18.0
import Expo, { Constants } from 'expo';
import TextMemeInput from './Components/TextMemeInput';
import Meme from './Components/Meme';
import ImageList from './Components/ImageList';
import ActionButton from './Components/ActionButton';

const images = [
        {url: 'https://i.imgflip.com/2/1bij.jpg'},
        {url: 'https://i.imgflip.com/2/1bgw.jpg'},
        {url: 'https://i.imgflip.com/2/4t0m5.jpg'},
        {url: 'https://i.imgflip.com/1og7s3.jpg'},
        {url: 'https://i.imgur.com/QT8j0d8.png'},
        {url: 'https://i.imgflip.com/2/1bgw.jpg'},
      ];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topText: '',
      bottomText: '',
      memeImage: 'http://ronntorossian.com/wp-content/uploads/2014/02/power-of-the-meme-ronn-torossian.jpg',
      memes: [],
    };

    this.onChangeTextTop = this.onChangeTextTop.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  
  
  componentDidMount(){
    axios.get('https://api.imgflip.com/get_memes')
    .then(response => {
      if(response.status){
        const { memes } = response.status === 200 ? response.data.data : images;
        this.setState({ memes });
      }
    });
  }

  onChangeTextTop(value) {
    this.setState({
      topText: value,
    });
  }

  onPress(image) {
    this.setState({
      memeImage: image,
    });
  }

  onPressTakePhoto = async () => {
    let image = await Expo.ImagePicker.launchCameraAsync();
    if (!image.cancelled) {
      this.setState({ memeImage: image.uri });
    }
  };

  onPressChoosePhoto = async () => {
    let image = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!image.cancelled) {
      this.setState({ memeImage: image.uri });
    }
  };

  onChangeTextBottom = value => this.setState({ bottomText: value });

  render() {
    const { memeImage, topText, bottomText, images, memes } = this.state;
    if(!memes.length){
      <ActivityIndicator size="large" color="#0000ff" />
    }
    return (
      <ScrollView
        style={styles.container}>
        <View style={styles.containerInputs}>
          <Text style={styles.appTitle}>Share Your Meme</Text>
          <TextMemeInput
            onChange={this.onChangeTextTop}
            placeholder="Top text"
          />
          <TextMemeInput
            onChange={this.onChangeTextBottom}
            placeholder="Bottom text"
          />
        </View>
        <Meme
          imgUri={memeImage}
          topText={topText}
          bottomText={bottomText}
        />
        <ImageList images={images} memes={memes} onPress={this.onPress} />
        <View style={styles.actionsButton}>
          <ActionButton
            text="Take a Photo"
            icon="md-camera"
            onPress={this.onPressTakePhoto}
          />
          <ActionButton
            text="choose Photo"
            icon="md-folder"
            onPress={this.onPressChoosePhoto}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E0E0E0',
  },
  appTitle: {
    fontSize: 25,
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  containerInputs: {
    flex: 1,
    marginTop: 10,
    alignSelf: 'center',
  },
  actionsButton: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
});
