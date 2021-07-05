import React from 'react';
import { IMovieShortInfo } from '../../../modules/MoviesList/store/models';
import { Card, Chip, Paragraph, Title } from 'react-native-paper';
import { RippleEffect } from '../Ripple/RippleEffect';
import { StyleSheet, View } from 'react-native';
import { ApiConfig } from '../../api/config';

/**
 * Модель компонента.
 * */
interface IOwnProps {
    data: IMovieShortInfo;
    onPress: () => void;
}

/** Компонент карточки похожего фильма. */
export const SimilarMovieCard: React.FC<IOwnProps> = ({ data, onPress }) => {
    const { backdrop_path, title } = data;

    /** Постер фильма. */
    const moviePoster = `${ApiConfig.POSTER_URL}${backdrop_path}`;

    return (
        <Card style={styles.container} onPress={onPress}>
            <RippleEffect onPress={onPress}>
                <View>
                    {backdrop_path && <Card.Cover style={styles.poster} source={{ uri: moviePoster }} />}
                    <Paragraph style={styles.title}>{title}</Paragraph>
                </View>
            </RippleEffect>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        width: 240,
        marginRight: 8,
    },
    title: {
        position: 'absolute',
        display: 'flex',
        height: '100%',
        alignItems: 'flex-end',
        color: 'white',
        padding: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    poster: {
        maxHeight: 120,
    },
});
