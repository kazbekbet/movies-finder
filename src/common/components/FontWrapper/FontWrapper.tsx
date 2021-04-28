import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { FontDisplay } from 'expo-font';

interface IOwnProps {
    children: React.ReactNode;
}

export const FontWrapper: React.FC<IOwnProps> = ({ children }) => {
    const [fontIsLoaded, setFontIsLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
    });

    const loadFonts = async () => {
        await Font.loadAsync({
            MontserratBold: {
                uri: require('assets/fonts/Montserrat/Montserrat-Bold.ttf'),
                display: FontDisplay.FALLBACK,
            },
        });
        await setFontIsLoaded(true)
    };

    return <>{fontIsLoaded && children}</>;
};
