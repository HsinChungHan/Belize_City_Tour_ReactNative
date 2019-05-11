import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import { Container, Content } from 'native-base';
import ProjectCell from '../components/icdf/projectCell';

import items from '../model/icdf/icdfData.js';

const { width, height } = Dimensions.get('window');

export default class ProjectScene extends Component {
  render() {
    console.log(width);
    return (
      <Container style={styles.container}>
        <StatusBar hidden />
        <View style={styles.logo}>
          <Image
            source={require('../../assets/ICDFPage/icdf_long_logo.png')}
            style={{ width: width - 20, height: 100 }}
            resizeMode="contain"
          />
        </View>

        <Content>
          <View>
            <Text style={styles.text}>{items[0].paragraph}</Text>
          </View>
          <View>
            <ProjectCell items={items[1]} heigth={width - 60} />
          </View>
          <View>
            <ProjectCell items={items[2]} heigth={width - 60} />
          </View>
          <View>
            <ProjectCell items={items[3]} heigth={width - 60} />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  logo: {
    height: 140,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(249, 76, 76, 0.3)'
  },
  text: {
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 40,
    marginTop: 20,
    marginBottom: 20
  }
});
