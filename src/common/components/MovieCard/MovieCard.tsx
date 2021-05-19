import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Card, Chip, Paragraph, Title } from 'react-native-paper';
import { textColorsConfig } from '../../theme/themeConfig';
import { RippleEffect } from '../Ripple/RippleEffect';
import { ApiConfig } from '../../api/config';
import { SimpleDialog } from '../Dialogs/SimpleDialog';
import { useActions } from '../../actionFactory/useActions';
import { MovieInfoActions } from '../../../modules/MovieInfo/actions/actions';
import { IMovieShortInfo } from '../../../modules/MoviesList/store/models';
import { FavoritesMoviesActions } from '../../../modules/FavoritesMovies/actions/FavoritesMoviesActions';
import { useAppSelector } from '../../../store/hooks';
import { PromiseStatuses } from '../../enums/asyncActionStatuses';
import { getMovieReleaseYear } from '../../utils/commonUtils';

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
    const { id, title, description, posterPath, onPress, voteAverage, releaseDate, shortMovieInfo } = props;
    const { status, movies } = useAppSelector(state => state.favoritesMovies);

    /** Локальный стор. */
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showRemoveDialog, setShowRemoveDialog] = useState(false);
    const [isFavourite, setFavourite] = useState(false);

    /** Экшены. */
    const actions = useActions(actions => actions.movieInfo) as MovieInfoActions;
    const favoritesActions = useActions(actions => actions.favoritesMovies) as FavoritesMoviesActions;

    /** Эффект при маунте компонента. */
    useEffect(() => {
        if (checkMovieIsFavourite()) {
            setFavourite(true);
        } else setFavourite(false);
    }, [movies]);

    /** Проверка наличия фильма в списке избранных. */
    function checkMovieIsFavourite() {
        if (status === PromiseStatuses.FULFILLED && movies) {
            return Boolean(movies.find(favourite => favourite.id === id));
        }
    }

    /** Проверка и установка описания. */
    function setDescription() {
        if (description) {
            if (description.length <= 140) return description;
            return `${description.slice(0, 120)}...`;
        }
        return 'Без описания';
    }

    async function handleAddToFavorites() {
        await closeDialog();
        await actions.setMovieToLocalStorage(shortMovieInfo);
        await ToastAndroid.show('Фильм успешно добавлен в избранные', ToastAndroid.SHORT);
        await favoritesActions.getFavoritesMovies();
    }

    async function handleRemoveFromFavourites() {
        await closeDialog();
        await actions.removeMovieFromLocalStorageById(id);
        await ToastAndroid.show('Фильм успешно удален из избранного', ToastAndroid.SHORT);
        await favoritesActions.getFavoritesMovies();
    }

    function openDialog() {
        if (!isFavourite) {
            setShowAddDialog(true);
        } else setShowRemoveDialog(true);
    }

    function closeDialog() {
        if (!isFavourite) {
            setShowAddDialog(false);
        } else setShowRemoveDialog(false);
    }

    const isShown = (title && description) || (posterPath && title);

    const setPoster = () => `${ApiConfig.POSTER_URL}${posterPath}`;
    const getVoteAverage = () => (voteAverage ? voteAverage : 'неизвестно');

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
                                <Paragraph style={styles.textProperties}>
                                    Год: {getMovieReleaseYear(releaseDate)}
                                </Paragraph>
                            </View>
                            <Paragraph style={styles.textDescription}>{setDescription()}</Paragraph>
                            {isFavourite && (
                                <View style={styles.favouriteChip}>
                                    <Chip icon={'heart'}>В избранном</Chip>
                                </View>
                            )}
                        </Card.Content>
                    </View>
                </RippleEffect>
            </Card>
            <SimpleDialog
                isVisible={showAddDialog}
                title={'Добавить в избранное'}
                description={'Вы уверены, что желаете добавить фильм в избранное?'}
                onConfirm={handleAddToFavorites}
                confirmText={'Подтвердить'}
                onDismiss={closeDialog}
                cancelText={'Отмена'}
            />
            <SimpleDialog
                isVisible={showRemoveDialog}
                title={'Удалить из избранного'}
                description={'Вы уверены, что желаете удалить фильм из избранного?'}
                onConfirm={handleRemoveFromFavourites}
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
    favouriteChip: {
        flexDirection: 'row',
        marginTop: 8,
    },
});
