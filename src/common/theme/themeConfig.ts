import { DefaultTheme } from 'react-native-paper';

export const themeConfig = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: '#1976d2',
        accent: '#f1c40f',
    },
};

export const textColorsConfig = {
    READ_CONTENT: {
        HEADLINE: '#000',
        DESCRIPTION: '#707070',
    },
};

export const effectsColorConfig = {
    RIPPLE: 'rgba(0, 0, 0, .16)',
};
