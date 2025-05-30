// components/BackgroundWrapper.tsx
import { usePathname } from 'expo-router';
import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const homeBg = require('@/assets/images/home-bg.png');
const defaultBg = require('@/assets/images/default-bg.png');

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/home';

    return (
        <ImageBackground source={isHome ? homeBg : defaultBg} style={styles.background} resizeMode="cover">
            {children}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
