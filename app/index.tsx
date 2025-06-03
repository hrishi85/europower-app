import BackgroundWrapper from '@/components/BackgroundWrapper';
import { loginUser } from '@/store/features/auth/authThunks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import * as Yup from 'yup';

export default function LoginScreen() {
    const dispatch = useAppDispatch();
	const router = useRouter();
    const { loading, error } = useAppSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const passwordInputRef = useRef<TextInput>(null);

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required').min(5, 'Min 5 characters').max(20, 'Max 20 characters'),
        password: Yup.string().min(5, 'Min 5 characters').max(20, "Max 20 characters").required('Password is required'),
    });

    const handleSubmit = (values: { userName: string; password: string }) => {
        dispatch(loginUser(values));
    };

    const { authToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (authToken) {
            router.replace('/home'); // or your protected route
        }
    }, [authToken]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<BackgroundWrapper>
				<View style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
					<View style={{flex: 2, width: "100%", justifyContent: "flex-end", alignItems: "center", paddingBottom: 20 }}>
						<Image source={require("@/assets/images/europower-logo.png")} style={{ width: 140, height: "90%" }} resizeMode="contain" />
					</View>
					<View style={{ flex: 2, width: "100%", height: 256, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
						<View style={{ width: "100%", backgroundColor: "#293d80", paddingHorizontal: 20, paddingVertical: 20, borderRadius: 30, position: "relative" }}>
							<Formik initialValues={{ userName: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
								{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
									<>
										{error && <Text style={styles.error}>{error}</Text>}
										<TextInput style={styles.input} placeholder="Username" autoCapitalize="none" returnKeyType="next" onChangeText={handleChange('userName')} onBlur={handleBlur('userName')} value={values.userName} onSubmitEditing={() => passwordInputRef.current?.focus()} />
										{touched.userName && errors.userName && (
											<Text style={styles.error}>{errors.userName}</Text>
										)}

										<View style={styles.passwordContainer}>
											<TextInput ref={passwordInputRef} style={styles.input} placeholder="Password" secureTextEntry={!showPassword} onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} returnKeyType="done" />
											<TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} style={styles.togglePassword} >
												<Text style={styles.togglePasswordText}>
													{
														showPassword ? 
														<Image source={ require("@/assets/images/icns/eye-opened.png") } style={{ width: 22, height: 14, transform: "translate(0, -5px)" }} />
														:
														<Image source={ require("@/assets/images/icns/eye-closed.png") } style={{ width: 22, height: 22 }} />
													}
												</Text>
											</TouchableOpacity>
										</View>
										{touched.password && errors.password && (
											<Text style={styles.error}>{errors.password}</Text>
										)}

										<TouchableOpacity onPress={() => handleSubmit()} disabled={loading} style={[styles.button, loading && styles.buttonDisabled]}>
											<Text style={styles.buttonText}>
												{loading ? 'Logging in...' : 'Login'}
											</Text>
										</TouchableOpacity>
										<Link href="/forgot-password" style={{ marginTop: 15, color: '#c1e0f6', paddingLeft: 25 }}>
											Forgot Password?
										</Link>
										<Text style={{ color: '#c1e0f6', paddingLeft: 25, marginTop: 15, fontSize: 12 }}>
											By creating an account you agree to Europpower's Terms of Services and Privacy Policy
										</Text>
									</>
								)}
							</Formik>
						</View>
					</View>
					<View style={{ flex: 3, width: "100%", justifyContent: "flex-end", alignItems: "center", position: "relative"}}>
						<Image source={require("@/assets/images/login/illustration.png")} style={{ width: "auto", height: "100%", aspectRatio: 1, position: "absolute", bottom: 0, left: "50%", transform: "translate(-50%, 0)" }} resizeMode="contain" />
					</View>
				</View>
			</BackgroundWrapper>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: "#fff",
		height: 40,
		borderRadius: 25,
		paddingHorizontal: 20,
		marginBottom: 20,
    },
    error: {
        color: 'white',
        marginBottom: 8,
        fontSize: 13,
    },
    passwordContainer: {
        position: 'relative',
    },
    togglePassword: {
        position: 'absolute',
        right: 0,
        bottom: 30,
        paddingHorizontal: 10,
    },
    togglePasswordText: {
        color: '#007AFF',
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#fbce3c',
		height: 40,
        borderRadius: 20,
		paddingHorizontal: 20,
        // alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        fontSize: 16,
        // fontWeight: '600',
		lineHeight: 40,
    },
});
