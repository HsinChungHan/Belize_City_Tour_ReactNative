import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Dimensions, Text } from 'react-native';

import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Segment,
  Content,
  Title,
  StyleProvider
} from 'native-base';

import Information from '../components/detail/information/Information';
import Story from '../components/detail/story/Story';
const { width, height } = Dimensions.get('window');
import { Font } from 'expo';

import getTheme from '../../native-base-theme/components';
import detailSceneTheme from '../../native-base-theme/variables/detailSceneTheme';

export default class DetailScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSegment: 1,
      isFontLoaded: false
    };
    this.baseState = this.state;

    this.item = this.props.navigation.state.params;
    this.name = this.item.englishName;
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('../../assets/Fonts/Roboto.ttf'),
      Roboto_medium: require('../../assets/Fonts//Roboto_medium.ttf')
    });
    this.setState(prevState => ({
      isFontLoaded: true
    }));
  }

  backToMain = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <StyleProvider style={getTheme(detailSceneTheme)}>
        <Container>
          <StatusBar hidden />
          <Header hasSegment style={styles.headerView}>
            <Left>
              <Button transparent onPress={this.backToMain}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              {this.state.isFontLoaded ? (
                <Title style={styles.headerText}>{this.name}</Title>
              ) : (
                <Text style={styles.headerText}>{this.name}</Text>
              )}
            </Body>
          </Header>
          <Segment style={{ width: width }}>
            <Button
              first
              active={this.state.selectedSegment === 1}
              onPress={() => {
                this.setState({
                  selectedSegment: 1
                });
              }}
              style={styles.segmentButton}
            >
              {this.state.isFontLoaded ? (
                <Title style={styles.segmentText} textAlign="center">
                  Story
                </Title>
              ) : (
                <Text style={styles.segmentText} textAlign="center">
                  Story
                </Text>
              )}
            </Button>
            <Button
              last
              active={this.state.selectedSegment === 2}
              onPress={() => {
                this.setState({
                  selectedSegment: 2
                });
              }}
              style={styles.segmentButton}
            >
              {this.state.isFontLoaded ? (
                <Title style={styles.segmentText} textAlign="center">
                  Information
                </Title>
              ) : (
                <Text style={styles.segmentText} textAlign="center">
                  Information
                </Text>
              )}
            </Button>
          </Segment>
          <Content style={{ backgroundColor: 'rgb(254,242,219)' }}>
            {this.state.selectedSegment === 1 ? (
              <Story item={this.item} />
            ) : (
              <Information item={this.item} />
            )}
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  segmentButton: {
    paddingLeft: 0,
    paddingRight: 0
  },
  segmentText: {
    width: width / 2 - 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  headerView: {
    backgroundColor: 'rgba(19, 34, 38, 0.9)'
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22
  }
});
