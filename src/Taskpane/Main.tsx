import React, {useState} from 'react';
import {MessageBarType} from 'office-ui-fabric-react';

import Header from './components/Header';
import Send from './components/Send';
import Welcome from './components/Welcome';
import {LocalStore} from './LocalStore';
import Messages from './components/Messages';
import ApiKey from './components/ApiKey';
import {IMessagable} from './Taskpane';

const title = 'seven Add-in';

const toString = (s: any) => 'string' === typeof s ? s : JSON.stringify(s);
const toStringArray = (msgs: string[], msg: string) => [...msgs, toString(msg)];

export default function Main() {
    const [needsInit, setNeedsInit] = useState(0 === LocalStore.get('options', {apiKey: ''}).apiKey.length); //0 === LocalStore.store.length
    const [messages, setMessages] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    const messagable: IMessagable = {
        addError: e => setErrors(toStringArray(errors, e)),
        addMessage: m => setMessages(toStringArray(messages, m)),
    };

    return <>
        <Header logo='assets/logo-light-128x128.png' title={title} message='seven'
                style={{marginBottom: '32px'}}/>

        <Messages entries={messages} setState={setMessages}/>

        <Messages entries={errors} messageBarType={MessageBarType.error} setState={setErrors}/>

        {
            needsInit ? <Welcome/> : null
        }
        {
            LocalStore.get('options', {apiKey: ''}).apiKey.length ? <Send Messagable={messagable}/> : null
        }

        <ApiKey Messagable={messagable} onInit={setNeedsInit}/>
    </>
}
