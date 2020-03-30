import {hot} from 'react-hot-loader/root';
import React from 'react';
import {AppContainer} from 'react-hot-loader';

import './taskpane.css';
import Progress from './components/Progress';
import Main from './Main';

export type IMessagable = {
    addError(e: any): void;

    addMessage(m: any): void;
}

export type Messagabled = {
    Messagable: IMessagable
}

export type IOptions = {
    apiKey: string,
};

export interface TaskpaneProps {
    isOfficeInitialized: boolean;
}

function Taskpane({isOfficeInitialized}: TaskpaneProps) {
    return <React.StrictMode>
        <AppContainer>
            {isOfficeInitialized ? <Main/> : <Progress/>}
        </AppContainer>
    </React.StrictMode>;
}

export default hot(Taskpane);