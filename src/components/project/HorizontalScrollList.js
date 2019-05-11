import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';
import ListItem from './ListItem';
import { Items } from '../../model/project/projectData';

const { width, height } = Dimensions.get('window');
export default class HorizontalScrollList extends Component {
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
        <ScrollView horizontal={true} pagingEnabled={true}>
          <ListItem item={Items.first} />
          <ListItem item={Items.second} />
          <ListItem item={Items.third} />
          <ListItem item={Items.forth} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
