import {Icon} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const ClickIcon = ({name, onPress}: {name: string; onPress: Function}) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Icon style={{height: 30, width: 30, margin: 10}} name={name} />
        </TouchableOpacity>
    );
};

export default ClickIcon;
