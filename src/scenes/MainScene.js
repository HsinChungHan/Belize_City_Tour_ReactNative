import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

import InformationView from '../components/main/InformationView';
import items from '../model/main/AllPlaces';

const { width, height } = Dimensions.get('window');
const informationViewHeight = (width * 4) / 5;
const visitBtnHeight = (informationViewHeight - 40) / 9;
const tabBarHeight = 49;
const ivCloseY = height - tabBarHeight - visitBtnHeight;

const ivOpenY = height - informationViewHeight - tabBarHeight;
// const ivOpenY = 10;

export default class MainScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      currentItem: items[1],
      informationViewIsOpened: false,
      rotateYValue: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
      ]
    };
    this.baseState = this.state;

    //LocationIcon rotateY
    this.rotateAnimated = Animated.timing(this.state.rotateYValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.in
    });

    //Man icon animation
    this.menIconLoaction = {
      x: width - 10 - 65,
      y: 10
    };

    this.manIconMoveAnimation = new Animated.ValueXY({
      x: this.menIconLoaction.x,
      y: this.menIconLoaction.y
    });

    //InformationView animation
    this.informationViewLoaction = {
      x: 0,
      y: ivCloseY
    };

    this.informationViewMoveAnimation = new Animated.ValueXY({
      x: 0,
      y: this.informationViewLoaction.y
    });
  }

  _startRotatedAnimated = index => {
    Animated.timing(this.state.rotateYValue[index], {
      toValue: 1,
      duration: 1000,
      easing: Easing.in
    }).start(finished => {
      this.state.rotateYValue[index].setValue(0);
    });
  };

  _moveManIcon = () => {
    Animated.spring(this.manIconMoveAnimation, {
      toValue: {
        x: this.menIconLoaction.x,
        y: this.menIconLoaction.y
      }
    }).start();
  };

  goToDetail = () => {
    this.props.navigation.navigate('Detail');
  };

  pressLocationIcon = (item, index) => {
    this.setState(prevState => ({
      currentItem: item
    }));

    this._startRotatedAnimated(index);
    //ManIconAnimation
    Animated.timing(this.manIconMoveAnimation, {
      toValue: {
        x: item.iconLocationX + 30,
        y: item.iconLocationY + 30
      },
      duration: 600,
      easing: Easing.in
    }).start(
      //InforamtionViewAnimation
      this.openInformationView
    );
  };

  _renderPlaceIcon = () => {
    let icons = [];
    // let rotateYValue = new Animated.Value(0);

    items.map((item, index) => {
      const rotateY = this.state.rotateYValue[index].interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
      });
      icons.push(
        <TouchableOpacity
          key={index}
          onPress={event => {
            this.pressLocationIcon(item, index);
          }}
          style={{
            width: 65,
            height: 65,
            position: 'absolute',
            top: item.iconLocationY,
            left: item.iconLocationX
          }}
        >
          <Animated.Image
            source={item.iconImgPath}
            style={{
              width: 65,
              height: 65,
              transform: [{ rotateY: rotateY }]
            }}
          />
        </TouchableOpacity>
      );
    });
    return icons;
  };

  openInformationView = () => {
    Animated.timing(this.informationViewMoveAnimation, {
      toValue: {
        x: 0,
        y: ivOpenY
      },
      duration: 600,
      easing: Easing.in
    }).start(() => {
      this.setState(prevState => ({
        informationViewIsOpened: true
      }));
      this.refs.InformationView.setState({
        isOpened: this.state.informationViewIsOpened
      });
    });
  };

  handleInformationView = () => {
    let offsetY = ivOpenY;
    let isOpened = true;
    if (this.state.informationViewIsOpened === true) {
      offsetY = ivCloseY;
      isOpened = false;
    }
    Animated.timing(this.informationViewMoveAnimation, {
      toValue: {
        x: 0,
        y: offsetY
      },
      duration: 600,
      easing: Easing.in
    }).start(() => {
      this.setState(prevState => ({
        informationViewIsOpened: isOpened
      }));
      this.refs.InformationView.setState({
        isOpened: this.state.informationViewIsOpened
      });
    });
  };

  render() {
    // console.log(this.refs.InformationView);
    return (
      <TouchableWithoutFeedback
        onPress={this.handleInformationView}
        style={{ width: '100%', height: '100%' }}
      >
        <ImageBackground
          source={require('../../assets/MainPage/map.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <StatusBar hidden />

          {this._renderPlaceIcon()}
          <Animated.Image
            source={require('../../assets/MainPage/men.png')}
            style={[
              {
                width: 40,
                height: 40,
                top: this.menIconLoaction.y,
                left: this.menIconLoaction.x,
                position: 'absolute'
              },
              this.manIconMoveAnimation.getLayout()
            ]}
            resizeMode="contain"
          />

          <Animated.View
            style={[
              styles.informationView,
              this.informationViewMoveAnimation.getLayout()
            ]}
          >
            <InformationView
              ref="InformationView"
              navigation={this.props.navigation}
              item={this.state.currentItem}
              style={styles.informationView}
              parentView={this}
              informationViewIsOpened={this.state.informationViewIsOpened}
            />
          </Animated.View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  informationView: {
    position: 'absolute',
    top: ivCloseY,
    // top: height - 20,
    left: 0,
    width: width,
    height: informationViewHeight,
    alignItems: 'center'
  }
});
