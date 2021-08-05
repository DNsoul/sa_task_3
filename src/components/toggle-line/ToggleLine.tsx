import {Button, Icon, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './style';

type ToggleLinePropsType = {
    onPress: Function;
    onAccept: Function;
    text: string;
    children: JSX.Element;
};

const ToggleLine = ({
    onPress,
    onAccept,
    text,
    children,
}: ToggleLinePropsType) => {
    const [toggle, setToggle] = useState(true);

    return toggle ? (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={() => setToggle(false)}
            onPress={() => onPress()}>
            {children}
        </TouchableOpacity>
    ) : (
        <View style={styles.content}>
            <Text>{text}</Text>
            <View style={styles.buttons}>
                <Button
                    size="small"
                    appearance="ghost"
                    onPress={() => {
                        onAccept();
                        setToggle(true);
                    }}
                    accessoryLeft={(props: any) => (
                        <Icon {...props} name="checkmark-outline" />
                    )}
                />
                <Button
                    size="small"
                    appearance="ghost"
                    onPress={() => setToggle(true)}
                    accessoryLeft={(props: any) => (
                        <Icon {...props} name="close-outline" />
                    )}
                />
            </View>
        </View>
    );
};

export default ToggleLine;
