import {Icon} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './style';

type ClickIconPropsType = {name: string; onPress: Function};

const ClickIcon = ({name, onPress}: ClickIconPropsType) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Icon style={styles.icon} name={name} />
        </TouchableOpacity>
    );
};

export default ClickIcon;
