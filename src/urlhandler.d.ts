export interface UrlHandlerCallback { (data: any): void; }
export interface AppURL extends Object {
    path: string;
    params: Map<string, string>;
}
export function handleOpenURL(handler: UrlHandlerCallback): void;
