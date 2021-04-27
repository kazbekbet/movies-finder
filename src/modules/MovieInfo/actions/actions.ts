import { AppDispatch } from '../../../store/rootReducer';
import { MovieInfoServices } from '../services/services';
import { CommonActions } from '../../../common/store/actions';
import { clearMovieInfoData, getMovieInfoFulfilled, getMovieInfoPending, getMovieInfoRejected } from '../store/reducer';

export class MovieInfoActions {
    constructor(private readonly services: MovieInfoServices, private readonly dispatch: AppDispatch) {}

    private commonActions = new CommonActions(this.dispatch);

    /** Получение информации о фильме. */
    public getMovieInfo = async (id: number) => {
        try {
            this.dispatch(getMovieInfoPending());
            const response = await this.services.getMovieInfo(id);
            this.dispatch(getMovieInfoFulfilled(response.data));
        } catch (e) {
            this.commonActions.setError('Произошла ошибка загрузки данных. Попробуйте зайти позже.');
            this.dispatch(getMovieInfoRejected());
        }
    };

    public clearMovieInfoData = () => {
        this.dispatch(clearMovieInfoData());
    };
}
