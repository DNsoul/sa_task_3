import {Button, Icon} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import styles from './style';

type SwitchLineFrontPropsType = {
    text: string;
    setInState: Function;
};

const SwitchLineFront = ({text, setInState}: SwitchLineFrontPropsType) => {
    return (
        <View style={styles.content}>
            <Button
                style={styles.buttonLine}
                appearance="ghost"
                onPress={() => setInState(false)}
                accessoryLeft={() => (
                    <Icon
                        style={styles.icon}
                        fill="#3366FF"
                        name="plus-outline"
                    />
                )}>
                {text}
            </Button>
        </View>
    );
};

export default SwitchLineFront;
