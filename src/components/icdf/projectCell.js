import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import PictureCell from './pictureCell';
import { white } from 'ansi-colors';
const { width, height } = Dimensions.get('window');

export default class ProjectCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.items = this.props.items;
    this.colors = this.items.colors;
    this.upperColor = this.colors.upperColor;
    this.lowerColor = this.colors.lowerColor;
    this.imagePath = this.items.imagePath;
    this.paragraph = this.items.paragraph;
  }

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.lowerColor }]}>
        <PictureCell
          upperStyle={{ backgroundColor: this.upperColor }}
          lowerStyle={{ backgroundColor: this.lowerColor }}
          cellHeight={this.props.height}
          imagePath={this.imagePath}
        />
        <Text
          numberOfLines={0}
          style={[styles.text, { backgroundColor: this.lowerColor }]}
        >
          {this.paragraph}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  text: {
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 40,
    marginTop: 20,
    marginBottom: 20
  }
});
