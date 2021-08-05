import {Button} from '@ui-kitten/components';
import React from 'react';
import styles from './style';
import {View} from 'react-native';

type SingOutPropsType = {onSend: Function};

const SingOut = ({onSend}: SingOutPropsType) => {
    return (
        <View style={styles.content}>
            <Button style={styles.button} onPress={() => onSend()}>
                Выйти
            </Button>
        </View>
    );
};

export default SingOut;
