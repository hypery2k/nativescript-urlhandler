import { AppURL, UrlHandlerCallback } from './urlhandler';
export declare function extractAppURL(urlParam: any): AppURL;
export declare function handleOpenURL(handler: UrlHandlerCallback): void;
export declare function getCallback(): UrlHandlerCallback;
