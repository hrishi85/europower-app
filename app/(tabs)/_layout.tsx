import { Tabs, useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

function CustomTabs() {
	const router = useRouter();
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#25a6df', paddingVertical: 20 }}>
			<TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', gap: 4 }} onPress={() => router.push('/home')}>
				<Image source={require("@/assets/images/icns/home-white.png")} style={{ width: 26, height: 24 }} />
				<Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Home</Text>
			</TouchableOpacity>
			<TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', gap: 4 }}>
				<Image source={require("@/assets/images/icns/bookings-white.png")} style={{ width: 28.5, height: 24 }} />
				<Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Bookings</Text>
			</TouchableOpacity>
			<TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', gap: 4 }}>
				<Image source={require("@/assets/images/icns/reviews-white.png")} style={{ width: 26.4, height: 24 }} />
				<Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Reviews</Text>
			</TouchableOpacity>
			<TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', gap: 4 }}>
				<Image source={require("@/assets/images/icns/profile-white.png")} style={{ width: 24, height: 24 }} />
				<Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>Profile</Text>
			</TouchableOpacity>
		</View>
	);
}




export default function TabLayout() {
	return (
		<>
			<Tabs screenOptions={{ headerShown: false }} tabBar={() => <CustomTabs />} />
		</>
	);
}