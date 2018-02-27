import { getCallback, extractAppURL } from './urlhandler.common';
import { getAppDelegate } from "./getappdelegate";
export { handleOpenURL } from './urlhandler.common';

const appDelegate = getAppDelegate();

function enableMultipleOverridesFor(classRef, methodName) {
    let method = classRef.prototype[methodName] || (() => {});
    classRef.prototype[methodName] = undefined;

    Object.defineProperty(classRef.prototype, methodName, {
        get: function () {
            return method;
        },
        set: function (nextImplementation) {
            const currentImplementation = method;

            method = function () {
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
            getCallback()(extractAppURL(appURL));
        }
        return true;
    }

    return previousResult;
};
