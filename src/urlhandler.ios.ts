import { getCallback, extractAppURL } from './urlhandler.common';
import { getAppDelegate } from "./getappdelegate";
export { handleOpenURL } from './urlhandler.common';

export const appDelegate = getAppDelegate();

function enableMultipleOverridesFor(classRef, methodName) {
    const prefix = '_';

    Object.defineProperty(classRef.prototype, prefix + methodName, {
        value: classRef.prototype[methodName] || (() => {}),
        writable: true
    });

    Object.defineProperty(classRef.prototype, methodName, {
        get: function () {
            return classRef.prototype[prefix + methodName];
        },
        set: function (nextImplementation) {
            const currentImplementation = classRef.prototype[prefix + methodName];

            classRef.prototype[prefix + methodName] = function () {
                const result = currentImplementation(...Array.from(arguments));
                return nextImplementation(...Array.from(arguments), result);
            };
        }
    });
}

enableMultipleOverridesFor(appDelegate, 'applicationDidFinishLaunchingWithOptions');
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

enableMultipleOverridesFor(appDelegate, 'applicationOpenURLOptions');
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
            getCallback()(appURL);
        }
        return true;
    }

    return previousResult;
};

enableMultipleOverridesFor(appDelegate, 'continueUserActivity');
appDelegate.prototype.continueUserActivity = function (
    application: UIApplication,
    userActivity: NSUserActivity
): boolean {
    if  (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {

        let appURL = extractAppURL(userActivity.webpageURL);

        if (appURL !== null) {
            getCallback()(appURL);
        }
    }

    return true;
};

