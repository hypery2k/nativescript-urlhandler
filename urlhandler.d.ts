export interface UrlHandlerCallback { (data: any): void; }
export interface AppURL {
    path: String;
    params: Map<String, String>;
}
export function handleOpenURL(handler: UrlHandlerCallback): void;
