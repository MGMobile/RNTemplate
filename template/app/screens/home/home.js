import React from 'react';
import {View, Text} from 'react-native';

const Home = ({navigation, route}) => {
  return (
    <View
      flex={1}
      backgroundColor="#F4EDE2"
      alignItems="center"
      justifyContent="center">
      <Text style={{fontWeight: "700"}}>Hello, created by Taj the DEV.</Text>
      <Text style={{fontWeight: "200", fontSize: 10}}>Pour ma stagiaire Céline</Text>
    </View>
  );
};

export default Home;
