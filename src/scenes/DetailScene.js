import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';

import {
  Root,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Title,
  Text,
  StyleProvider
} from 'native-base';

import Information from '../components/detail/information/Information';
import Story from '../components/detail/story/Story';
const { width, height } = Dimensions.get('window');
import { Font, AppLoading } from 'expo';

import DetailTheme from './Theme/DetailTheme';

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
    this.time = this.item.openingTime;
    this.type = this.item.type;
    this.location = this.item.address;
    this.phone = this.item.phone;
    this.storys = this.item.englishStorys;
    this.imgsPath = this.item.imgsPath;
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
      // <StyleProvider style={DetailTheme}>
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
            ) : null}
          </Body>
        </Header>
        <Segment style={this.segmentView}>
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
            {this.state.isFontLoaded ? <Text>Story</Text> : null}
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
            {this.state.isFontLoaded ? <Text>INformation</Text> : null}
          </Button>
        </Segment>
        <Content>
          {this.state.selectedSegment === 1 ? (
            <Story item={this.item} />
          ) : (
            <Information item={this.item} />
          )}
        </Content>
      </Container>
      // </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  segmentView: {
    backgroundColor: 'green'
  },
  segmentButton: {
    paddingLeft: 0,
    paddingRight: 0
  },
  headerView: {
    backgroundColor: 'yellow'
  },
  headerText: {
    color: 'white'
  }
});
