import { AppURL, UrlHandlerCallback } from './urlhandler';
var URL_HANDLER_CB: UrlHandlerCallback;

export function extractAppURL(url: String): AppURL {
    let params = new Map<String, String>(),
        path = url.substring(url.indexOf('//') + 2, url.indexOf('?')),
        parameters = url.substring(url.indexOf('?') + 1).split('&');
    // create JSON object
    for (let i = 0, len = parameters.length; i < len; i++) {
        let paramData = params[i].split('=');
        params.set(paramData[0], paramData[1] ? paramData[1] : null);
    }
    return {
        params: params,
        path: path
    };
}

export function handleOpenURL(handler: UrlHandlerCallback): void {
    URL_HANDLER_CB = handler;
}

export function getCallback(): UrlHandlerCallback {
    return URL_HANDLER_CB;
}
