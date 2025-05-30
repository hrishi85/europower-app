import BackgroundWrapper from '@/components/BackgroundWrapper';
import { logout } from '@/store/features/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';


export default function MainLayout() {
	const dispatch = useDispatch();

    const { authToken } = useAppSelector((state) => state.auth);
    const router = useRouter();
	const [showUserMenu, setShowUserMenu] = useState(false);

	const { user } = useAppSelector((state:any) => state.auth);

    useEffect(() => {
        if (!authToken) {
            router.replace('/'); // redirect to login
        }
    }, [authToken]);

	const handleLogout = () => {
        dispatch(logout());
    };


    return (
		<SafeAreaView style={{ flex: 1, padding: 16 }}>
			<BackgroundWrapper>
				<View style={{ flex: 1 }}>
					<View style={{ width: "50%", height: 80, display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 6, justifyContent: "center", paddingHorizontal: 16, position: "relative" }}>
						<View style={{ width: 100, height: 50, position: "absolute", left: 0, top: 80, zIndex: 10, backgroundColor: "white", borderRadius: 8, boxShadow: "0 4px 4px rgba(0,0,0,.15)", display: showUserMenu ? "flex" : "none", padding: 8 }}>	
							<TouchableOpacity onPress={handleLogout} style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
								<Text style={{ fontSize: 14 }}>Logout</Text>
							</TouchableOpacity>
						</View>
						<TouchableOpacity onPress={() => { setShowUserMenu(!showUserMenu); }} style={{ width: 60, height: 60, backgroundColor: "#25a6df", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
							<Image source={require("@/assets/images/icns/user-white.png")} style={{ width: 40, height: 40 }} />
						</TouchableOpacity>
						<View>
							<Text style={{ fontWeight: "bold", color: "#6d6e71", fontSize: 14 }}>{user?.firstName}</Text>
							<Text style={{ color: "#6d6e71", fontSize: 12 }}>{user?.desgName ? user?.desgName : "Designation"}</Text>
						</View>
					</View>
					<Slot />
				</View>
			</BackgroundWrapper>
        </SafeAreaView>
	);
}
	