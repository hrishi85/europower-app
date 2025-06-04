import CustomSplash from '@/components/CustomSplash';
import { persistor, store } from '@/store/store';
import { OpenSans_400Regular, OpenSans_700Bold, useFonts } from '@expo-google-fonts/open-sans';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [appReady, setAppReady] = useState(false);

	const [fontsLoaded] = useFonts({
		OpenSans_400Regular,
		OpenSans_700Bold,
	});

	useEffect(() => {
		const prepareApp = async () => {
			// Simulate loading or any async setup here
			await new Promise(resolve => setTimeout(resolve, 2000));

			// Wait until fonts are loaded
			if (fontsLoaded) {
				setAppReady(true);
				await SplashScreen.hideAsync(); // hide native splash
			}
		};

		prepareApp();
	}, [fontsLoaded]);

	if (!appReady) {
		return <CustomSplash />;
	}

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<SafeAreaView style={styles.container}>
					<Stack screenOptions={{ headerShown: false }} />
					<StatusBar style="auto" />
				</SafeAreaView>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
