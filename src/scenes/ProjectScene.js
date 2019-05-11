import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import HorizontalScrollList from '../components/project/HorizontalScrollList';
import ListItem from '../components/project/ListItem';
export default class ICDFScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.baseState = this.state;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <HorizontalScrollList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
