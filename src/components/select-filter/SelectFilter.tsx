import React from 'react';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import ListTodo from '../../stores/ListTodoStore';

function SelectFilter() {
    const {setFilter} = ListTodo;

    const titles = ['Неисполненые', 'Исполненые', 'Все'];

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    return (
        <Select
            selectedIndex={selectedIndex}
            onSelect={index => {
                setSelectedIndex(index);
                setFilter(Number(index));
            }}
            value={titles[selectedIndex.row]}>
            <SelectItem title="Неисполненые" />
            <SelectItem title="Исполненые" />
            <SelectItem title="Все" />
        </Select>
    );
}

export default SelectFilter;
