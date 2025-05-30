import BackgroundWrapper from '@/components/BackgroundWrapper';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import * as Yup from 'yup';

export default function ForgotPasswordScreen() {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const handleSubmit = (values: { email: string }) => {
        console.log('Submit email for password reset:', values.email);
        // Call API here
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <BackgroundWrapper>
                <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <View style={{ flex: 2, width: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                        <Image source={require("@/assets/images/europower-logo.png")} style={{ width: 256, height: "90%" }} resizeMode="contain" />
                    </View>
                    <View style={{ flex: 2, width: "100%", height: 256, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
                        <View style={{ width: "100%", backgroundColor: "#293d80", paddingHorizontal: 40, paddingVertical: 50, borderRadius: 10, position: "relative" }}>
                            <Image source={require("@/assets/images/login/yellow-gear-small.png")} style={{ width: 48, height: "90%", position: "absolute", right: 20, bottom: -110 }} resizeMode="contain" />
                            <Image source={require("@/assets/images/login/yellow-gear-big.png")} style={{ width: 72, height: "90%", position: "absolute", left: -20, bottom: -160 }} resizeMode="contain" />

                            <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Enter your email"
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                        />
                                        {touched.email && errors.email && (
                                            <Text style={styles.error}>{errors.email}</Text>
                                        )}

                                        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
                                            <Text style={styles.buttonText}>Send Reset Link</Text>
                                        </TouchableOpacity>
										<Link href="/" style={{ marginTop: 30, color: '#fbce3c', textAlign: 'center' }}>
											Back to Login
										</Link>
                                    </>
                                )}
                            </Formik>
                        </View>
                    </View>
                    <View style={{ flex: 3, width: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                        <Image source={require("@/assets/images/login/illustration.png")} style={{ width: "90%", height: "90%" }} resizeMode="contain" />
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
    button: {
        backgroundColor: '#fbce3c',
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 40,
    },
});
