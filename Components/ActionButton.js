import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2

const ActionButton = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.actionTakePhoto}>
        <Ionicons style={{ marginRight: 5 }} name={props.icon} size={30} />
        <Text style={styles.actionText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionTakePhoto: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 5,
    width: 150,
    marginTop: 10,
  },
  actionText: {
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default ActionButton;
