import { getCallback, extractAppURL } from './urlhandler.common';
import { getAppDelegate } from "./getappdelegate";
export { handleOpenURL } from './urlhandler.common';

const appDelegate = getAppDelegate();

(function () {
    let applicationDidFinishLaunchingWithOptions = appDelegate.prototype.applicationDidFinishLaunchingWithOptions
        || ((application: UIApplication, launchOptions: NSDictionary<any, any>): boolean => true);

    appDelegate.prototype.applicationDidFinishLaunchingWithOptions = undefined;

    Object.defineProperty(appDelegate.prototype, 'applicationDidFinishLaunchingWithOptions', {
        get: () => {
            return applicationDidFinishLaunchingWithOptions;
        },
        set: (nextImplementation) => {
            const currentImplementation = applicationDidFinishLaunchingWithOptions;

            applicationDidFinishLaunchingWithOptions = (
                application: UIApplication,
                launchOptions: NSDictionary<any, any>
            ): boolean => {
                const result = currentImplementation(application, launchOptions);
                return nextImplementation(application, launchOptions, result);
            };
        }
    });

    appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (
        application: UIApplication,
        launchOptions: NSDictionary<any, any>
    ): boolean {
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
    };
})();

(function () {
    let applicationOpenURLOptions = appDelegate.prototype.applicationOpenURLOptions
        || ((application: UIApplication, url: NSURL, options: any): boolean => false);

    appDelegate.prototype.applicationOpenURLOptions = undefined;

    Object.defineProperty(appDelegate.prototype, 'applicationOpenURLOptions', {
        get: function () {
            return applicationOpenURLOptions;
        },
        set: function (nextImplementation) {
            const currentImplementation = applicationOpenURLOptions;

            applicationOpenURLOptions = (application: UIApplication, url: NSURL, options: any): boolean => {
                const result = currentImplementation(application, url, options);
                return nextImplementation(application, url, options, result);
            }
        }
    });

    appDelegate.prototype.applicationOpenURLOptions = function (
        application: UIApplication,
        url: NSURL,
        options: any
    ): boolean {
        const lastArgument = arguments[arguments.length - 1];
        const previousResult = lastArgument !== options ? lastArgument : undefined;

        if (!previousResult) {
            let appURL = extractAppURL(url.absoluteString);
            if (appURL != null) {
                getCallback()(extractAppURL(appURL));
            }
            return true;
        }

        return previousResult;
    };
})();
