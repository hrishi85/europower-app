// components/CustomSplash.tsx
import { Image, View } from 'react-native';

export default function CustomSplash() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', zIndex: 9999 }}>
			<Image source={require('@/assets/images/splash-screen.png')} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
		</View>
	);
}