import {SmsJsonResponse, SmsMessage, SmsParams} from '@seven.io/api';

import {fetchApi} from './fetchApi';
import {LocalStore} from './LocalStore';
import {IMessagable} from './Taskpane';

export default async function postSms(params: SmsParams, Messagable: IMessagable, setDisabled: (d: boolean) => void) {
    setDisabled(true);

    try {
        const res = await fetchApi({Messagable, endpoint: 'sms', payload: {...params, json: 1}}) as SmsJsonResponse;
        const {balance, messages, sms_type, success, total_price} = res;
        LocalStore.append('sent', res);

        if ('100' === success) {
            const msg = `${messages.length} ${sms_type} SMS sent valued at ${total_price} €. Balance: ${balance}`;
            Messagable.addMessage(msg);

            messages.forEach(prettyResponse(Messagable));
        } else {
            Messagable.addError(`An error occured while sending SMS: ${JSON.stringify(res)}`);
        }

        return res;
    } catch (e) {
        Messagable.addError(e);

        throw e;
    } finally {
        setDisabled(false);
    }
};

function prettyResponse(Messagable: IMessagable) {
    return ({
                messages = [], id, price, success, parts, recipient, sender, text, encoding
            }: SmsMessage,) => {
        let line = '';

        if (success) {
            line += `#${id} ${parts}x valued at`;
            line += ` ${price} sent to ${recipient} from ${sender}: ${text}`;
            Messagable.addMessage(line);
        } else {
            line += `#${id} failed sending to ${recipient}`;
            line += ` from ${sender} with encoding ${sender}: ${encoding}`;
            Messagable.addError(line);
        }

        messages.forEach((msg: string) => line += ` / ${msg}`);
    };
}
