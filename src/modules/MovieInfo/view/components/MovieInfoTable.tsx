import React from 'react';
import { IMovieInfoResult } from '../../store/models';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { MovieInfoUtils } from '../../utils/MovieInfoUtils';
import { textColorsConfig } from '../../../../common/theme/themeConfig';
import { useAppSelector } from '../../../../store/hooks';
import { ContentBlock } from '../../../../common/components/Content/ContentBlock';

interface IOwnProps {
    movie: IMovieInfoResult;
}

/** Компонент подробной информации о фильме. */
export const MovieInfoTable: React.FC<IOwnProps> = ({ movie }) => {
    const { currencyResult } = useAppSelector(state => state.common);
    const { getMovieInfoTableConfig } = new MovieInfoUtils();
    const tableInfo = getMovieInfoTableConfig(movie, currencyResult);

    return (
        <ContentBlock title={'Подробная информация'}>
            <>
                {tableInfo.map(item => (
                    <View key={item.label} style={styles.row}>
                        <View style={styles.element}>
                            <Paragraph style={styles.textLabel}>{item.label}</Paragraph>
                        </View>
                        <View style={styles.value}>
                            <Paragraph>{item.value}</Paragraph>
                        </View>
                    </View>
                ))}
            </>
        </ContentBlock>
    );
};

const { PROPERTIES } = textColorsConfig.READ_CONTENT;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    element: {
        width: '40%',
    },
    value: {
        width: '60%',
    },
    textLabel: {
        color: PROPERTIES,
    },
});
