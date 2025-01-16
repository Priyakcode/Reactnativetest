import React from 'react';
import { View, Image, ScrollView } from 'react-native';

const GalleryScreen = ({ route }) => {
  const { capturedImages } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {capturedImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={{ width: '100%', height: 200, marginVertical: 10 }} />
        ))}
      </ScrollView>
    </View>
  );
};

export default GalleryScreen;
