import {useKeyboard} from '@react-native-community/hooks';
import React, {useState} from 'react';
import {useEffect} from 'react';
import SwitchLineFront from '../switch-line-front';

type SwitchLinePropsType = {
    text: string;
    action: Function;
    BackElem: React.FC<{setInState: any; action: Function}>;
};

const SwitchLine = ({text, action, BackElem}: SwitchLinePropsType) => {
    const [inState, setInState] = useState(true);

    const keyboard = useKeyboard();

    useEffect(() => {
        setInState(!keyboard.keyboardShown);
    }, [keyboard.keyboardShown]);

    return inState ? (
        <SwitchLineFront text={text} setInState={setInState} />
    ) : (
        <BackElem action={action} setInState={setInState} />
    );
};

export default SwitchLine;
