export enum SortTypes {
    POPULARITY = 'popularity.desc',
    REVENUE = 'revenue.desc',
    VOTE_COUNT = 'vote_count.desc',
    VOTE_AVERAGE = 'vote_average.desc',
    RELEASE_DATE = 'primary_release_date.desc'
}

export const SortTypesLocalization = {
    [SortTypes.POPULARITY]: 'По популярности',
    [SortTypes.REVENUE]: 'По кассовым сборам',
    [SortTypes.VOTE_COUNT]: 'По количеству оценок',
    [SortTypes.VOTE_AVERAGE]: 'По средней оценке',
    [SortTypes.RELEASE_DATE]: 'По дате релиза'
};
