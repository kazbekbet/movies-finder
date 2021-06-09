import React, { useEffect, useState } from 'react';
import { Subheading, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { ForEveningUtils } from '../../utils/ForEveningUtils';

/** Модель компонента. */
interface IOwnProps {
    value: string;
    setValue: (value: string) => void;
    setError: (state: boolean) => void;
    utils: ForEveningUtils;
}

/** Компонент ввода данных года. */
export const ForEveningYearInput: React.FC<IOwnProps> = ({ value, setValue, setError, utils }) => {
    const [hasError, setHasError] = useState<boolean>(false);
    const { min, max } = utils.getYearRange();

    useEffect(() => {
        checkForErrors();
    }, [value]);

    useEffect(() => {
        setError(hasError);
    }, [hasError]);

    function checkForErrors() {
        if (value.length > 0) {
            const year = parseInt(value);
            if (year) {
                const isError = year > max || year < min;

                setHasError(isError);
                return isError;
            }
            setHasError(true);
            return true;
        }
        setHasError(false);
        return false;
    }

    return (
        <View style={styles.container}>
            <Subheading>Введите желаемый год</Subheading>
            <TextInput
                error={hasError}
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
