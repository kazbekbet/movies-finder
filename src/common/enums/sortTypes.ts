export enum SortTypes {
    POPULARITY = 'popularity.desc',
    REVENUE = 'revenue.desc',
    VOTE_COUNT = 'vote_count.desc',
}

export const SortTypesLocalization = {
    [SortTypes.POPULARITY]: 'По популярности',
    [SortTypes.REVENUE]: 'По выручке',
    [SortTypes.VOTE_COUNT]: 'По оценкам',
};
