import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const MovieInfoAppBarHeader: React.FC = () => {
    return <Text style={styles.header}>Название фильма</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
});
