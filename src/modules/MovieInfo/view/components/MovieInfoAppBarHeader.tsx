import React from 'react';
import { AppBarHeader } from '../../../../common/components/AppBar/AppBarHeader';

interface IOwnProps {
    title: string;
}

export const MovieInfoAppBarHeader: React.FC<IOwnProps> = ({ title }) => {
    const getTitle = () => {
        if (!title) return 'Без названия';
        return title;
    };

    return <AppBarHeader title={getTitle()} />;
};
