import {Card, Text} from '@ui-kitten/components';
import React from 'react';

const TodoItem = ({name}: {name: string}) => {
    return (
        <Card>
            <Text>{name}</Text>
        </Card>
    );
};

export default TodoItem;
