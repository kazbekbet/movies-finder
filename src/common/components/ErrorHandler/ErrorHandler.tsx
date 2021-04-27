import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { SimpleDialog } from '../Dialogs/SimpleDialog';

/** Свойства компонента. */
interface IOwnProps {
    children: React.ReactNode;
}

/** Компонент обработки ошибок. */
export const ErrorHandler: React.FC<IOwnProps> = ({ children }) => {
    const { isError, errorText } = useAppSelector(state => state.common);

    return (
        <>
            {isError && (
                <SimpleDialog title={'Ошибка'} description={errorText} onConfirm={() => {}} onDismiss={() => {}} />
            )}
            {children}
        </>
    );
};
