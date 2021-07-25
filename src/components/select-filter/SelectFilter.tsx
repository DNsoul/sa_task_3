import React from 'react';
import {Select, SelectItem} from '@ui-kitten/components';
import ListTodo from '../../stores/ListTodoStore';
import {observer} from 'mobx-react';

const SelectFilter = observer(() => {
    const {setFilter, getType} = ListTodo;

    const titles = ['Неисполненые', 'Исполненые', 'Все'];

    return (
        <Select
            selectedIndex={getType}
            onSelect={index => {
                setFilter(index);
            }}
            value={titles[getType.row]}>
            <SelectItem title="Неисполненые" />
            <SelectItem title="Исполненые" />
            <SelectItem title="Все" />
        </Select>
    );
});

export default SelectFilter;
