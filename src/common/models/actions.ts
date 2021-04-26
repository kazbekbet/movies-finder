/**
 * Интерфейс объекта action.
 *
 * @prop {string} type - Тип экшена.
 * @prop {T} [payload] - Передаваемый payload объект.
 * */
export interface IActions<T> {
    type: string;
    payload?: T;
}
