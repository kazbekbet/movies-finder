import React from 'react';
import { IMovieInfoResult } from '../../store/models';
import { StyleSheet, View } from 'react-native';
import { Paragraph, Subheading } from 'react-native-paper';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import { textColorsConfig } from '../../../../common/theme/themeConfig';
import { useAppSelector } from '../../../../store/hooks';

interface IOwnProps {
    movie: IMovieInfoResult;
}

/** Компонент подробной информации о фильме. */
export const MovieInfoTable: React.FC<IOwnProps> = ({ movie }) => {
    const { currencyResult } = useAppSelector(state => state.common);
    const { getMovieInfoTableConfig } = new MovieInfoUtils();
    const tableInfo = getMovieInfoTableConfig(movie, currencyResult);

    return (
        <View style={styles.container}>
            <Subheading>Подробная информация</Subheading>
            {tableInfo.map(item => (
                <View key={item.label} style={styles.row}>
                    <View style={styles.element}>
                        <Paragraph style={styles.textLabel}>{item.label}</Paragraph>
                    </View>
                    <View>
                        <Paragraph>{item.value}</Paragraph>
                    </View>
                </View>
            ))}
        </View>
    );
};

const { PROPERTIES } = textColorsConfig.READ_CONTENT;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    element: {
        width: '40%',
    },
    textLabel: {
        color: PROPERTIES,
    },
});
