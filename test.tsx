import React from 'react';
import { ImageBackground, View } from 'react-native';

export default function HomeScreen() {
	return (
		<ImageBackground
			source={require('../assets/images/launch-screen-bg-2.png')}
			resizeMode="cover"
			style={{ flex: 1 }} // ✅ Required for full screen
		>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				
			</View>
		</ImageBackground>
	);
}
