import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';

const LocationScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation
  } = useContext(LocationContext);
  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    // [recording]
  );
  const [err] = useLocation(isFocused ||  callback);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text style={{ fontSize: 40 }}>Location</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <View style={styles.container}>
      <Text style={styles.textHeading}>{text}</Text>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,        
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    marginTop: 200,
    fontSize:18
  }
});


LocationScreen.navigationOptions = {
  title: 'Loation',
  tabBarIcon: <FontAwesome name="map-marker" size={20} />
};


export default withNavigationFocus(LocationScreen);
