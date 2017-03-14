/// <reference path='node_modules/tns-platform-declarations/ios/ios.d.ts' />

import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

export class UrlHandlerAppDelegate extends UIResponder implements UIApplicationDelegate {

    public static ObjCProtocols = [UIApplicationDelegate];

    applicationOpenURLSourceApplicationAnnotation(application: UIApplication, url: NSURL, sourceApplication: string, annotation: any): boolean {
        getCallback()(extractAppURL(url.absoluteString));
        return true;
    }

}

application.ios.delegate = UrlHandlerAppDelegate;
