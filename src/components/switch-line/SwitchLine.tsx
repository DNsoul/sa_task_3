import React, {useState} from 'react';

const SwitchLine = ({
    FrontElem,
    BackElem,
}: {
    FrontElem: React.FC<{setInState: any}>;
    BackElem: React.FC<{setInState: any}>;
}) => {
    const [inState, setInState] = useState(true);

    return inState ? (
        <FrontElem setInState={setInState} />
    ) : (
        <BackElem setInState={setInState} />
    );
};

export default SwitchLine;
