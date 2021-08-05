import React, {useState} from 'react';
import SwitchLineFront from '../switch-line-front';

type SwitchLinePropsType = {
    text: string;
    action: Function;
    BackElem: React.FC<{setInState: any; action: Function}>;
};

const SwitchLine = ({text, action, BackElem}: SwitchLinePropsType) => {
    const [inState, setInState] = useState(true);

    return inState ? (
        <SwitchLineFront text={text} setInState={setInState} />
    ) : (
        <BackElem action={action} setInState={setInState} />
    );
};

export default SwitchLine;
