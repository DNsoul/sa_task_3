import React from 'react';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {observer} from 'mobx-react';

type SelectFilterPropsType = {
    filter: number;
    setFilter: Function;
}

const SelectFilter = ({filter, setFilter}: SelectFilterPropsType) => {
    const titles = ['Неисполненые', 'Исполненые', 'Все'];

    return (
        <Select
            selectedIndex={new IndexPath(filter)}
            onSelect={index => {
                setFilter(index.row);
            }}
            value={titles[filter]}>
            <SelectItem title="Неисполненые" />
            <SelectItem title="Исполненые" />
            <SelectItem title="Все" />
        </Select>
    );
};

export default observer(SelectFilter);
