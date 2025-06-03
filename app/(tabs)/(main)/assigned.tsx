import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function Assigned() {
	const [loading, setLoading] = useState(true);
	const [dashboardData, setDashboardData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const [assignedCalls, setAssignedCalls] = useState([]);

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const mockData = [
					{
						callId: "PIN23982025",
						cName: "Saurabh Raut",
						complain: "BATTERY WEAK-BUY BACK SCHEME",
						callType: "Service",
						callLoginDate: "2025-05-22T00:00:00",
						status: "Assigned",
						engAssigned: "Priyanka Kamble",
						callAssignTo: 70,
						callClosedDate: "0001-01-01T00:00:00",
						closeEngName: null,
						contactPerson: "",
						location: "Dahisar (W)"
					},
					{
						callId: "PIN24642025",
						cName: "test cust",
						complain: "BATTERY WEAK-BUY BACK SCHEME",
						callType: "Service",
						callLoginDate: "2025-05-27T00:00:00",
						status: "Assigned",
						engAssigned: "Priyanka Kamble",
						callAssignTo: 70,
						callClosedDate: "0001-01-01T00:00:00",
						closeEngName: null,
						contactPerson: "",
						location: "Aaktan"
					},
					{
						callId: "PIN24652025",
						cName: "test C",
						complain: "MSEB PROBLEM",
						callType: "Service",
						callLoginDate: "2025-05-27T00:00:00",
						status: "Assigned",
						engAssigned: "Priyanka Kamble",
						callAssignTo: 70,
						callClosedDate: "0001-01-01T00:00:00",
						closeEngName: null,
						contactPerson: "",
						location: "VASAI (W)"
					}
				];

				if (isMounted) {
					setDashboardData(mockData);
				}
			} catch (err: any) {
				if (isMounted) {
					setError('Failed to load dashboard data');
					console.error(err.message);
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
			setAssignedCalls(assigned);
		}
	}, [dashboardData]);

	if (loading) return <ActivityIndicator />;
	if (error) return <Text>{error}</Text>;

	return (
		<View style={{ flex: 1 }}>
			<View style={{ height: 80, marginTop: 20, display: "flex", flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16 }}>
				<View style={{ flex: 1, height: 40, backgroundColor: "#d1d3d4", borderRadius: 20 }}></View>
				{/* <View style={{ flex: 1, height: 40, backgroundColor: "#b4272b", borderRadius: 20 }}></View> */}
			</View>

			{/* FlatList inserted below UI */}
			<FlatList
				data={assignedCalls}
				keyExtractor={(call:any) => call.callId}
				contentContainerStyle={{ padding: 16 }}
				renderItem={({ item, index }) => {
					let itemNo = index + 1;
					return (
						<View style={{ marginBottom: 16, padding: 16, backgroundColor: "#dbecfa", borderRadius: 10, position: "relative" }}>
							<View style={{ position: "absolute", left: 20, top: -12, backgroundColor: "#af2829", width: 24, height: 24, borderRadius: 12 }}>
								<Text style={{ color: "#fff", textAlign: "center", lineHeight: 24 }}>{itemNo}</Text>
							</View>
							<View style={{ width: "100%", backgroundColor: "#b8d3ef", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5, marginBottom: 8 }}>
								<Text style={{ fontWeight: "bold" }}>Customer Name</Text>
								<Text style={{ fontWeight: "bold", color: "#263d75" }}>{item.cName}</Text>
							</View>
							<View style={{ width: "100%", backgroundColor: "#b8d3ef", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5, marginBottom: 8 }}>
								<Text style={{ fontWeight: "bold" }}>Customer Contact</Text>
								<Text style={{ fontWeight: "bold", color: "#263d75" }}>{item.cContact ? item.cContact : "-"}</Text>
							</View>
							<View style={{ width: "100%", backgroundColor: "#b8d3ef", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5, marginBottom: 8 }}>
								<Text style={{ fontWeight: "bold" }}>Customer Location</Text>
								<Text style={{ fontWeight: "bold", color: "#263d75" }}>{item.location && item.location}</Text>
							</View>
							<View style={{ width: "100%", backgroundColor: "#fff", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5, marginBottom: 8 }}>
								<Text style={{ fontWeight: "bold" }}>Complaint Details</Text>
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
}
