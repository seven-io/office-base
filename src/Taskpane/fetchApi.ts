import {LocalStore} from './LocalStore';
import {IOptions, Messagabled} from './Taskpane';

export type FetchApiOptions = Messagabled & {
    endpoint: 'sms' | 'balance'
    payload: { [k: string]: any }
    method?: 'post' | 'get'
}

const fallback = (o: { [k: string]: any }, k: string): string => o[k] || '';
const isEmpty = (o: { [k: string]: any }, k: string): boolean => 0 === fallback(o, k).length;

export function fetchApi({Messagable, endpoint, payload = {}, method = 'post'}: FetchApiOptions): Promise<any> {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => resolve(JSON.parse(xhr.responseText)));

        xhr.open(method, 'https://gateway.sms77.io/api/' + endpoint);

        if (isEmpty(payload, 'apiKey') && isEmpty(payload, 'p')) {
            const apiKey = fallback(LocalStore.get('options', {}) as IOptions, 'apiKey');

            if ('' === apiKey) {
                return Messagable.addError('Api Key is required!');
            }

            payload.p = apiKey;
        }

        const formData = new FormData();
        for (const key in payload) {
            formData.append(key, payload[key]);
        }
        xhr.send(formData);
    });
}