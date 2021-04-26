import React from 'react';
import { SimpleMenu } from '../../../../common/components/Menu/SimpleMenu';
import { Menu } from 'react-native-paper';
import { SortTypes, SortTypesLocalization } from '../../../../common/enums/sortTypes';

export const MovieListAppBarActions: React.FC = () => {
  return (
      <SimpleMenu>
        <Menu.Item title={SortTypesLocalization[SortTypes.POPULARITY]}/>
        <Menu.Item title={SortTypesLocalization[SortTypes.REVENUE]}/>
        <Menu.Item title={SortTypesLocalization[SortTypes.VOTE_COUNT]}/>
      </SimpleMenu>
  );
};
