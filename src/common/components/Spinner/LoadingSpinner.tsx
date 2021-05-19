import React from 'react';
import { Spinner } from './Spinner';
import { PromiseStatuses } from '../../enums/asyncActionStatuses';
import { isPending } from '../../statusCheckers/asyncStatusCheckers';

/** Модель свойств компонента. */
interface IOwnProps {
    status: PromiseStatuses;
}

/** Компонент спиннера загрузки данных. */
export const LoadingSpinner: React.FC<IOwnProps> = ({ status }) => {
    return isPending(status) ? <Spinner setDefaultPaddingTop /> : <></>;
};
