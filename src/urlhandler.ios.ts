import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

export class UrlHandlerAppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<any, any>) {
        if (launchOptions != null) {
            let urlOptions: string = launchOptions.valueForKey('UIApplicationLaunchOptionsURLKey');
            if (urlOptions) {
                let appURL = extractAppURL(urlOptions);
                if (appURL != null) {
                    getCallback()(appURL);
                }
            }
        }
        return true;
    }


    applicationOpenURLOptions(application: UIApplication, url: NSURL, options: any): boolean {
        let appURL = extractAppURL(url.absoluteString);
        if (appURL != null) {
            getCallback()(extractAppURL(appURL));
        }
        return true;
    }

}

application.ios.delegate = UrlHandlerAppDelegate;
