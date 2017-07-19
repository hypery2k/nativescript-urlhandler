import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

export class UrlHandlerAppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<any, any>) {
        let urlOptions: string = launchOptions.valueForKey('UIApplicationLaunchOptionsURLKey');
        if (urlOptions) {
            getCallback()(extractAppURL(urlOptions));
        }
        return true;
    }


    applicationOpenURLOptions(application: UIApplication, url: NSURL, options: any): boolean {
        getCallback()(extractAppURL(url.absoluteString));
        return true;
    }

}

application.ios.delegate = UrlHandlerAppDelegate;
