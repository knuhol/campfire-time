import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import React, { useEffect, useState } from 'react';
import {
  getCurrentPositionAsync,
  type LocationObject,
  requestForegroundPermissionsAsync,
} from 'expo-location';

void MapboxGL.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN ?? '');

export default function App(): JSX.Element {
  const [location, setLocation] = useState<null | LocationObject>(null);

  useEffect(() => {
    void (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map} logoEnabled={false}>
        <MapboxGL.UserLocation showsUserHeadingIndicator />
        <MapboxGL.Camera
          zoomLevel={16}
          centerCoordinate={
            location !== null ? [location.coords.longitude, location.coords.latitude] : undefined
          }
        />
      </MapboxGL.MapView>
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
