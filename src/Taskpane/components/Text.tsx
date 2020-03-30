import React, {useEffect} from 'react';
import {ITextFieldProps, TextField} from 'office-ui-fabric-react';

import {Messagabled} from '../Taskpane';

export type TextProps = Messagabled & ITextFieldProps & {
    setDisabled: (disabled: boolean) => void
    setText: (text: string) => void
}

export default function Text({Messagable, setText, setDisabled, value, ...props}: TextProps) {
    useEffect(() => {
        const onSuccess = (t: string) => setText(t);

        const onError = (err: any) => {
            Messagable.addError(err);

            setDisabled(true);
        };

        if (Office.HostType.PowerPoint === Office.context.host) {
            Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, data =>
                Office.AsyncResultStatus.Failed == data.status && 1001 != data.error.code
                    ? onError(data) : onSuccess(data.value as string || ''));
        } else if (Office.HostType.Outlook === Office.context.host) {
            Office.context.mailbox.item.body.getAsync(Office.CoercionType.Text,
                ({value, error, status}: Office.AsyncResult<string>) =>
                    'succeeded' == status as unknown as string ? onSuccess(value) : onError({value, error, status}));
        } else if (Office.HostType.Word == Office.context.host) {
            Word.run(ctx => {
                const body = ctx.document.body;
                ctx.load(body, 'text'); // Queue a command to load the text in document body.
                // Synchronize document state by executing queued commands - return promise to indicate task completion
                return ctx.sync().then(() => onSuccess(body.text));
            })
                .catch(e => onError(e));
        }
    }, []);

    return <TextField
        description='This defines the actual SMS content.'
        label='Message Content'
        multiline
        onChange={(e, newValue) => setText(newValue ? newValue.trim() : '')}
        required
        rows={6}
        value={value}
        {...props}
    />;
}