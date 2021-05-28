import React, { useEffect } from 'react';
import { useActions } from '../../actionFactory/useActions';

/** Свойства компонента. */
interface IOwnProps {
    children: React.ReactNode;
}

/** Враппер общих экшенов. */
export const CommonEffectWrapper: React.FC<IOwnProps> = ({ children }) => {
    const actions = useActions(actions => actions.common);

    useEffect(() => {
        actions.getUSDCurrencyRate();
    }, []);

    return <>{children}</>;
};
