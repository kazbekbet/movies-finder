import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { textColorsConfig } from '../../theme/themeConfig';
import { RippleEffect } from '../Ripple/RippleEffect';
import { ApiConfig } from '../../api/config';
import { SimpleDialog } from '../Dialogs/SimpleDialog';
import { useActions } from '../../actionFactory/useActions';
import { MovieInfoActions } from '../../../modules/MovieInfo/actions/actions';
import { IMovieShortInfo } from '../../../modules/MoviesList/store/models';
import { FavoritesMoviesActions } from "../../../modules/FavoritesMovies/actions/FavoritesMoviesActions";

/**
 * Модель пропсов для компонента карточки фильма.
 *
 * @prop {string} title - Наименование фильма.
 * @prop {string} description - Краткое описание.
 * @prop {string} posterUrl - Постер.
 * */
interface IOwnProps {
    id: number;
    title: string;
    description: string;
    posterPath: string;
    onPress: () => void;
    voteAverage: number;
    releaseDate: string;
    shortMovieInfo: IMovieShortInfo;
}

/** Компонент карточки фильма в списке. */
export const MovieCard: React.FC<IOwnProps> = props => {
    const { title, description, posterPath, onPress, voteAverage, releaseDate, shortMovieInfo } = props;
    const [showDialog, setShowDialog] = useState(false);
    const actions = useActions(actions => actions.movieInfo) as MovieInfoActions;
    const favoritesActions = useActions(actions => actions.favoritesMovies) as FavoritesMoviesActions;

    const isShown = (title && description) || (posterPath && title);

    const setDescription = () => {
        if (description) {
            if (description.length <= 140) return description;
            return `${description.slice(0, 120)}...`;
        }
    };

    const setPoster = () => `${ApiConfig.POSTER_URL}${posterPath}`;
    const getVoteAverage = () => (voteAverage ? voteAverage : 'неизвестно');
    const getReleaseYear = () => (releaseDate && releaseDate.length > 4 ? releaseDate.slice(0, 4) : 'неизвестно');

    const closeDialog = () => setShowDialog(false);
    const openDialog = () => setShowDialog(true);

    const handleAddToFavorites = async () => {
        await actions.setMovieToLocalStorage(shortMovieInfo);
        await closeDialog();
        await ToastAndroid.show('Фильм успешно добавлен в избранные', ToastAndroid.SHORT);
        await favoritesActions.getFavoritesMovies();
    };

    return isShown ? (
        <>
            <Card style={styles.container} onPress={onPress}>
                <RippleEffect onPress={onPress} onLongPress={openDialog}>
                    <View>
                        {posterPath && <Card.Cover source={{ uri: setPoster() }} />}
                        <Card.Content style={styles.content}>
                            {title && <Title style={styles.textTitle}>{title}</Title>}
                            <View style={styles.properties}>
                                <Paragraph style={styles.textProperties}>Оценка: {getVoteAverage()} &ndash; </Paragraph>
                                <Paragraph style={styles.textProperties}>Год: {getReleaseYear()}</Paragraph>
                            </View>
                            <Paragraph style={styles.textDescription}>{setDescription()}</Paragraph>
                        </Card.Content>
                    </View>
                </RippleEffect>
            </Card>
            <SimpleDialog
                isVisible={showDialog}
                title={'Добавить в избранное'}
                description={'Вы уверены, что желаете добавить фильм в избранное?'}
                onConfirm={handleAddToFavorites}
                confirmText={'Подтвердить'}
                onDismiss={closeDialog}
                cancelText={'Отмена'}
            />
        </>
    ) : (
        <></>
    );
};

const { HEADLINE, DESCRIPTION, PROPERTIES } = textColorsConfig.READ_CONTENT;

const styles = StyleSheet.create({
    container: {
        elevation: 1,
        marginHorizontal: 16,
        marginVertical: 8,
    },
    content: {
        marginVertical: 12,
    },
    properties: {
        flexDirection: 'row',
    },
    textTitle: {
        color: HEADLINE,
    },
    textDescription: {
        color: DESCRIPTION,
    },
    textProperties: {
        color: PROPERTIES,
    },
});
