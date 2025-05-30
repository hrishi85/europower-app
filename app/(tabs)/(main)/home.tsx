import api from '@/services/api'; // ensure this is correctly pointing to your Axios instance
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
	const router = useRouter();
	const { user } = useAppSelector((state:any) => state.auth);
	
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
	const [assignedCalls, setAssignedCalls] = useState([]);
	const [attendedCalls, setAttendedCalls] = useState([]);
	const [completedCalls, setCompletedCalls] = useState([]);

    useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await api.get('/Dashboard/GetDashBoardCallList', {
					params: {
						UserId: user?.user_ID || 70, // ensure user_ID is available
						Role: user?.role || 'Service Engineer', // ensure role is available
						Status: "Assigned"
					}
				});

				if (isMounted) {
					const data = response.data?.data || response.data; // handle both nested or direct formats
					setDashboardData(data);
				}
			} catch (err: any) {
				if (isMounted) {
					setError('Failed to load dashboard data');
					console.error('Dashboard API error:', err.message || err);
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		if (dashboardData) {
			const assigned = dashboardData.filter((call: any) => call.status === "Assigned");
			const attended = dashboardData.filter((call: any) => call.status === "Attended");
			const completed = dashboardData.filter((call: any) => call.status === "Completed");
			console.log(attended);
			setAssignedCalls(assigned);
			setAttendedCalls(attended);
			setCompletedCalls(completed);
		}
	}, [dashboardData]);

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>{error}</Text>;

    return (
		<View style={{ flex: 1 }}>
			<View style={{ height: 80, marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", paddingHorizontal: 16 }}>
				<View style={{ width: "100%", height: 40, backgroundColor: "#b4272b", borderRadius: 20 }}></View>
			</View>
			<View style={{ width: "100%", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "space-around", }} >

				<TouchableOpacity onPress={() => { router.push("/assigned") }} style={{ flex: 1, backgroundColor: "#b4daf0", alignItems: "center", justifyContent: "center", padding: 12, gap: 8, position: "relative", paddingBottom: 24, }} >
					<View style={{ width: 70, height: 70, backgroundColor: "white", borderRadius: 35, alignItems: "center", justifyContent: "center", }} >
						<Image source={require("@/assets/images/icns/assigned.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
					</View>
					<Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center", color: "#6d6e71", }} >
						{"Assigned\nCalls"}
					</Text>
					<View style={{ position: "absolute", left: "50%", bottom: -16, width: 32, height: 32, backgroundColor: "#b4272b", borderRadius: 8, }}>
						<Text style={{ color: "white", fontSize: 12, fontWeight: "bold", textAlign: "center", lineHeight: 32 }}>
							{
								assignedCalls && assignedCalls.length
							}
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { router.push("/attended") }} style={{ flex: 1, backgroundColor: "#b4daf0", alignItems: "center", justifyContent: "center", padding: 12, gap: 8, position: "relative", paddingBottom: 24, }} >
					<View style={{ width: 70, height: 70, backgroundColor: "white", borderRadius: 35, alignItems: "center", justifyContent: "center", }} >
						<Image source={require("@/assets/images/icns/attended.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
					</View>
					<Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center", color: "#6d6e71", }} >
						{"Attended\nCalls"}
					</Text>
					<View style={{ position: "absolute", left: "50%", bottom: -16, width: 32, height: 32, backgroundColor: "#b4272b", borderRadius: 8, }}>
						<Text style={{ color: "white", fontSize: 12, fontWeight: "bold", textAlign: "center", lineHeight: 32 }}>
							{
								attendedCalls && attendedCalls.length
							}
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => { router.push("/completed") }} style={{ flex: 1, backgroundColor: "#b4daf0", alignItems: "center", justifyContent: "center", padding: 12, gap: 8, position: "relative", paddingBottom: 24, }} >
					<View style={{ width: 70, height: 70, backgroundColor: "white", borderRadius: 35, alignItems: "center", justifyContent: "center", }} >
						<Image source={require("@/assets/images/icns/completed.png")} style={{ width: 40, height: 40 }} resizeMode="contain" />
					</View>
					<Text style={{ fontSize: 14, fontWeight: "bold", textAlign: "center", color: "#6d6e71", }} >
						{"Completed\nCalls"}
					</Text>
					<View style={{ position: "absolute", left: "50%", bottom: -16, width: 32, height: 32, backgroundColor: "#b4272b", borderRadius: 8, }}>
						<Text style={{ color: "white", fontSize: 12, fontWeight: "bold", textAlign: "center", lineHeight: 32 }}>
							{
								completedCalls && completedCalls.length
							}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
				<Image source={require("@/assets/images/home/character.png")} style={{ width: "90%", height: "90%" }} resizeMode="contain" />
			</View>
		</View>
    );
}
