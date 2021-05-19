export const getMovieReleaseYear = (releaseDate: string) => {
    if (releaseDate.length > 4) {
        return releaseDate.slice(0, 4);
    }
    return 'неизвестно';
};

export const getMovieStatusLocalization = (status: string) => {
    switch (status) {
        case 'Rumored':
            return 'Слухи';
        case 'Planned':
            return 'Запланировано';
        case 'In Production':
            return 'В производстве';
        case 'Post Production':
            return 'Постобработка';
        case 'Released':
            return 'Выпущено';
        case 'Canceled':
            return 'Отменено';
        default:
            return 'неизвестно';
    }
};
