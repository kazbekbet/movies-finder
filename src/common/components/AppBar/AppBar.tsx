import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform, StyleSheet } from 'react-native';

interface IOwnProps {
    title: string;
    subtitle: string;
}

export const AppBar: React.FC<IOwnProps> = ({ title, subtitle }) => {
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
    return (
        <Appbar.Header style={styles.container}>
            <Appbar.Content title={title} subtitle={subtitle} />
            <Appbar.Action icon='magnify' onPress={() => {}} />
            <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 4,
    },
});
