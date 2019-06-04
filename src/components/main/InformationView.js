import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { Button } from 'native-base';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window');
const informationViewHeight = (width * 4) / 5;

const btnImgPath = {
  open: require('../../../assets/MainPage/icon/btn_extend.png'),
  close: require('../../../assets/MainPage/icon/btn_collapse.png')
};

export default class InformationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: this.props.parentView.informationViewIsOpened
    };
  }

  goToDetail = () => {
    this.props.navigation.navigate('Detail', this.props.item);
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.props.parentView.handleInformationView}
          style={styles.closeView}
        >
          <Image
            source={this.state.isOpened ? btnImgPath.close : btnImgPath.open}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={this.goToDetail} style={styles.visitView}>
          <Text style={styles.subTitleText}>Visit</Text>
        </TouchableOpacity>

        <View style={styles.informationView}>
          <View style={styles.title}>
            <Image
              source={require('../../../assets/MainPage/icon/place.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.titleText} numberOfLines={0}>
              {this.props.item.englishName}
            </Text>
          </View>
          <View style={styles.subTitleView}>
            <Image
              source={require('../../../assets/MainPage/icon/time.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.subTitleText}>
              {this.props.item.openingTime}
            </Text>
          </View>
        </View>
        <View style={styles.swiper}>
          <Swiper
            autoplay={true}
            activeDot={
              <View
                style={{
                  backgroundColor: 'white',
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3
                }}
              />
            }
          >
            {this.props.item.imgsPath.map((path, key) => {
              return (
                <View key={key} style={styles.slider}>
                  <Image source={path} style={styles.img} />
                </View>
              );
            })}
          </Swiper>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: informationViewHeight,
    width: width - 20,
    backgroundColor: 'rgba(255, 223, 196, 0.8)',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderRadius: 20
  },
  closeView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  visitView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20
  },
  informationView: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 20
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 30
    // marginLeft: 10,
    // marginRight: 10
  },
  subTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 30
    // marginLeft: 10,
    // marginRight: 10
  },
  titleText: {
    paddingLeft: 10,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(132, 94, 85, 1)'
  },
  subTitleText: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(157, 117, 107, 1)'
  },
  swiper: {
    flex: 5,
    backgroundColor: 'gray',
    marginTop: 10
  },
  slider: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  img: {
    width: width - 40,
    height: (width - 20) / 2
  },
  icon: {
    width: 25,
    height: 25
  }
});
