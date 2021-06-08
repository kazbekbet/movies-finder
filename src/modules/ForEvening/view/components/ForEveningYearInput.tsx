import React from 'react';
import { Subheading, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface IOwnProps {
    value: string;
    setValue: (value: string) => void;
}

export const ForEveningYearInput: React.FC<IOwnProps> = ({ value, setValue }) => {
    function checkForErrors() {
        if (value.length > 0) {
            const year = parseInt(value);
            if (year) {
                const currentYear = new Date().getFullYear();
                return year > currentYear || year < 1930;
            }
            return true;
        }
        return false;
    }

    return (
        <View style={styles.container}>
            <Subheading>Введите желаемый год</Subheading>
            <TextInput
                error={checkForErrors()}
                style={styles.input}
                label='Год выпуска'
                value={value}
                textContentType={'oneTimeCode'}
                onChangeText={setValue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    input: {
        marginTop: 8,
    },
});
