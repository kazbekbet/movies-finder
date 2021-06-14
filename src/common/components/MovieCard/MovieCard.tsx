import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Card, Chip, Paragraph, Title } from 'react-native-paper';
import { textColorsConfig } from '../../theme/themeConfig';
import { RippleEffect } from '../Ripple/RippleEffect';
import { ApiConfig } from '../../api/config';
import { SimpleDialog } from '../Dialogs/SimpleDialog';
import { IMovieShortInfo } from '../../../modules/MoviesList/store/models';
import { useAppSelector } from '../../../store/hooks';
import { PromiseStatuses } from '../../enums/asyncActionStatuses';
import { getMovieReleaseYear } from '../../utils/commonUtils';
import { ActionsContext } from '../CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../actionFactory/actionFactory';

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
    const { movieInfoActions, favoritesMoviesActions } = useContext(ActionsContext) as ActionsFactory;

    /** Эффект при маунте компонента. */
    useEffect(() => {
        if (checkMovieIsFavourite()) {
            setFavourite(true);
        } else {
            setFavourite(false);
        }
    }, [movies]);

    /** Проверка наличия фильма в списке избранных. */
    function checkMovieIsFavourite() {
        if (status === PromiseStatuses.FULFILLED && movies) {
            return Boolean(movies.find(favourite => favourite.id === id));
        }
    }

    /** Обработчик добавления фильма в избранное. */
    async function handleAddToFavorites() {
        await closeDialog();
        await movieInfoActions.setMovieToLocalStorage(shortMovieInfo);
        await ToastAndroid.show('Фильм успешно добавлен в избранные', ToastAndroid.SHORT);
        await favoritesMoviesActions.getFavoritesMovies();
    }

    /** Обработчик удаления фильма из избранного. */
    async function handleRemoveFromFavourites() {
        await closeDialog();
        await movieInfoActions.removeMovieFromLocalStorageById(id);
        await ToastAndroid.show('Фильм успешно удален из избранного', ToastAndroid.SHORT);
        await favoritesMoviesActions.getFavoritesMovies();
    }

    /** Обработчик открытия диалога. */
    function openDialog() {
        if (!isFavourite) {
            setShowAddDialog(true);
        } else {
            setShowRemoveDialog(true);
        }
    }

    /** Обработчик закрытия диалога. */
    function closeDialog() {
        if (!isFavourite) {
            setShowAddDialog(false);
        } else {
            setShowRemoveDialog(false);
        }
    }

    /** Переменные для отображения карточки. */
    const isMovieShown = (title && description) || (posterPath && title);
    const moviePoster = `${ApiConfig.POSTER_URL}${posterPath}`;
    const movieVoteAverage = voteAverage ? voteAverage : 'неизвестно';
    const movieDescription = description ? description : 'Без описания';

    return isMovieShown ? (
        <>
            <Card style={styles.container} onPress={onPress}>
                <RippleEffect onPress={onPress} onLongPress={openDialog}>
                    <View>
                        {posterPath && <Card.Cover source={{ uri: moviePoster }} />}
                        <Card.Content style={styles.content}>
                            {title && <Title style={styles.textTitle}>{title}</Title>}
                            <View style={styles.properties}>
                                <Paragraph style={styles.textProperties}>Оценка: {movieVoteAverage} &ndash; </Paragraph>
                                <Paragraph style={styles.textProperties}>
                                    Год: {getMovieReleaseYear(releaseDate)}
                                </Paragraph>
                            </View>
                            <Paragraph numberOfLines={4} style={styles.textDescription}>
                                {movieDescription}
                            </Paragraph>
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
