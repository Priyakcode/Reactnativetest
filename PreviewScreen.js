import React, { useState } from 'react';
import { View, Button, Image, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PreviewScreen = ({ navigation }) => {
  const [capturedImages, setCapturedImages] = useState([]);

  const takePicture = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setCapturedImages((prevImages) => [...prevImages, data.uri]);
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      >
        {({ camera }) => (
          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Button title="Capture" onPress={() => takePicture(camera)} />
            <ScrollView horizontal>
              {capturedImages.map((uri, index) => (
                <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
              ))}
            </ScrollView>
            <Button 
              title="View All Images"
              onPress={() => navigation.navigate('GalleryScreen', { capturedImages })}
            />
          </View>
        )}
      </RNCamera>
    </View>
  );
};

export default PreviewScreen;
