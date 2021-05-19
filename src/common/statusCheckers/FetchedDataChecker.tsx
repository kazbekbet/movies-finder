import React from 'react';

/** Модель свойств компонента. */
interface IOwnProps {
    show: boolean;
    children: React.ReactNode;
}

/** Компонент отображения данных в случае их успешной загрузки. */
export const FetchedDataChecker: React.FC<IOwnProps> = ({ show, children }) => {
    return <>{show && children}</>;
};
