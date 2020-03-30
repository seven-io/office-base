import {LocalStore} from './LocalStore';
import {IMessagable} from './Taskpane';
import {fetchApi} from './fetchApi';

export default async function getBalance(Messagable: IMessagable, apiKey?: string) {
    try {
        const payload = apiKey ? {p: apiKey} : {};

        const balance = Number.parseFloat(await fetchApi({Messagable, endpoint: 'balance', payload})).toLocaleString();

        Messagable.addMessage(`Your current balance: ${balance}`);

        LocalStore.set('balance', balance);

        return balance;
    } catch (e) {
        Messagable.addError(e);

        throw e;
    }
};