import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class TextMemeInput extends Component {
  constructor() {
    super();
    
    this.state = {
      value: ''
    }
    
    this.onChange = this.onChange.bind(this);
  }
  
  onChange(value) {
    this.setState({
      value
    })
    this.props.onChange(value);
  }
  
    render() {
    return (
      <View>
        <TextInput
          placeholder={this.props.placeholder}
          onChangeText={this.onChange}
          style={styles.input}
          value={this.state.value}
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 6,
    height: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'tomato',
    marginTop:10,
    width: 200,
    fontSize: 12,
    textAlign: 'center'
  },
});
