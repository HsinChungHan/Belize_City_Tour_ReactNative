import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Content } from 'native-base';
import { Logos } from '../../model/project/projectData';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 3
  },
  textContent: {
    backgroundColor: 'gray',
    margin: 10,
    borderRadius: 20
  },
  text: {
    padding: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 35,
    marginTop: 10,
    marginBottom: 10
  },
  titleColor: {
    color: 'white'
  },
  footer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.item = this.props.item;
    this.title = this.item.title;
    this.paragraph = this.item.paragraph;
    this.imagePath = this.item.imagePath;
  }

  render() {
    console.log(this.imagePath);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={this.imagePath}
          style={{ width: '100%', height: '100%' }}
        >
          <View style={styles.title}>
            <Text style={[styles.text, styles.titleColor]} numberOfLines={2}>
              {this.title}
            </Text>
          </View>
          <View style={styles.content}>
            <Content style={styles.textContent}>
              <Text style={styles.text}>{this.paragraph}</Text>
            </Content>
          </View>
          <View style={styles.footer}>{Logos}</View>
        </ImageBackground>
      </View>
    );
  }
}
