import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RNCamera } from 'react-native-camera';
import PreviewScreen from './PreviewScreen';
import GalleryScreen from './GalleryScreen';

const Stack = createStackNavigator();

function App() {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);

  const handleCapture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setCapturedImages((prevImages) => [...prevImages, data.uri]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {!cameraVisible ? (
                <Button title="Open Camera" onPress={() => setCameraVisible(true)} />
              ) : (
                <RNCamera
                  style={{ flex: 1, width: '100%' }}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.off}
                >
                  {({ camera }) => (
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                      <Button title="Capture" onPress={() => handleCapture(camera)} />
                      <Button
                        title="Go to Gallery"
                        onPress={() => setCameraVisible(false)}
                      />
                    </View>
                  )}
                </RNCamera>
              )}
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="PreviewScreen">
          {() => (
            <PreviewScreen capturedImages={capturedImages} />
          )}
        </Stack.Screen>
        <Stack.Screen name="GalleryScreen">
          {() => (
            <GalleryScreen capturedImages={capturedImages} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
