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
import { imagePath } from '../../model/project/projectData';
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
          <Text>Visit</Text>
        </TouchableOpacity>

        <View style={styles.informationView}>
          <View style={styles.title}>
            <Image
              source={require('../../../assets/MainPage/icon/place.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>{this.props.item.englishName}</Text>
          </View>
          <View style={styles.subTitleView}>
            <Image
              source={require('../../../assets/MainPage/icon/time.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>{this.props.item.openingTime}</Text>
          </View>
        </View>
        <View style={styles.swiper}>
          <Swiper>
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
    height: width,
    width: width - 40,
    backgroundColor: 'green',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
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
    paddingLeft: 10
  },
  swiper: {
    flex: 4,
    backgroundColor: 'green',
    marginTop: 10
  },
  slider: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9dd6eb'
  },
  img: {
    width: width - 20,
    height: 200
  },
  icon: {
    width: 25,
    height: 25
  }
});
