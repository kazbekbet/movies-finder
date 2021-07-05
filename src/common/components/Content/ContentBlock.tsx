import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';

interface IOwnProps {
    title: string;
    children?: JSX.Element;
    condition?: boolean;
}

export const ContentBlock: React.FC<IOwnProps> = ({ title, children, condition }) => {
    const showContent = (() => {
        if (condition === undefined) return true;
        return condition;
    })();

    return (
        <>
            {showContent && (
                <View style={styles.container}>
                    <Paragraph style={styles.subHeading}>{title}</Paragraph>
                    <View style={styles.content}>{children}</View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    content: {
        paddingVertical: 8,
    },
    subHeading: {
        fontSize: 16,
        fontWeight: '500',
    },
});
