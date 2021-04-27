import React, { useEffect, useState } from 'react';
import { IconButton } from 'react-native-paper';
import { useAppSelector } from '../../../../store/hooks';
import { useActions } from '../../../../common/actionFactory/useActions';
import { MovieInfoActions } from '../../actions/actions';

export const MovieInfoAppBarActions: React.FC = () => {
    const { result } = useAppSelector(state => state.movieInfo);
    const actions = useActions(actions => actions.movieInfo) as MovieInfoActions;
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        getMoviesFromLocalStorage();
    }, [result]);

    const getMoviesFromLocalStorage = async () => {
        const movies = await actions.getMoviesFromLocalStorage();
        if (movies) {
            const movieIsSaved = movies.find(movie => movie.id === result?.id);
            if (movieIsSaved) setSelected(true);
        }
    };

    const handlePress = () => {
        setSelected(!selected);
        if (result) actions.setMovieToLocalStorage(result);
    };
    const getIcon = () => (selected ? 'heart' : 'heart-outline');

    return <IconButton icon={getIcon()} color={'#fff'} size={24} onPress={handlePress} />;
};
