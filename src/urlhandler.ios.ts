import { getCallback, extractAppURL } from './urlhandler.common';
import { getAppDelegate } from "./getappdelegate";
export { handleOpenURL } from './urlhandler.common';

export const appDelegate = getAppDelegate();

function enableMultipleOverridesFor(classRef, methodName, nextImplementation) {
    const currentImplementation = classRef.prototype[methodName];
    classRef.prototype[methodName] = function () {
        const result = currentImplementation && currentImplementation.apply(currentImplementation, Array.from(arguments));
        return nextImplementation.apply(nextImplementation, Array.from(arguments).concat([result]));
    };
}

enableMultipleOverridesFor(
    appDelegate,
    'applicationOpenURLOptions',
    function (
        application: UIApplication,
        url: NSURL,
        options: any
    ): boolean {
        const lastArgument = arguments[arguments.length - 1];
        const previousResult = lastArgument !== options ? lastArgument : undefined;

        if (!previousResult) {
            let appURL = extractAppURL(url.absoluteString);
            if (appURL != null) {
                setTimeout(() => getCallback()(appURL));
            }
            return true;
        }

        return previousResult;
    });

enableMultipleOverridesFor(
    appDelegate,
    'applicationContinueUserActivityRestorationHandler',
    function (
        application: UIApplication,
        userActivity: NSUserActivity
    ): boolean {
        if (userActivity.activityType === NSUserActivityTypeBrowsingWeb) {

            let appURL = extractAppURL(userActivity.webpageURL);

            if (appURL !== null) {
                setTimeout(() => getCallback()(appURL));
            }
        }

        return true;
    });
