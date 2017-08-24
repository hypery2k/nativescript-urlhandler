export { handleOpenURL } from './urlhandler.common';
export declare class UrlHandlerAppDelegate extends UIResponder implements UIApplicationDelegate {
    static ObjCProtocols: {
        prototype: UIApplicationDelegate;
    }[];
    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<any, any>): boolean;
    applicationOpenURLOptions(application: UIApplication, url: NSURL, options: any): boolean;
}
