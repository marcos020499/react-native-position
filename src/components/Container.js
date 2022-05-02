import React from 'react';
import {StyleSheet, View} from 'react-native';

const Container = ({children}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 15,
      paddingTop: 60
    },
  });
  return <View style={styles.container}>{children}</View>;
};
export default Container;