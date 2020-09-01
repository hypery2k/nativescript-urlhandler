
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

export function handleIntent(intent: any) {
    let data = intent.getData();
    try {
        let appURL = extractAppURL(data);
        if (appURL != null &&
            (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_MAIN).valueOf()
                || new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf())) {
            try {
                setTimeout(() => {
                  let result = getCallback()(appURL);
                  // clear intent so that url will not be re-handled upon subsequent ActivityStarted event
                  intent.setAction('');
                  intent.setData(null);
                  return result;
                });
            } catch (ignored) {
                application.android.on(application.AndroidApplication.activityResultEvent, () => {
                    setTimeout(() => getCallback()(appURL));
                });
            }
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

}
application.android.on(application.AndroidApplication.activityNewIntentEvent, (args) => {
    setTimeout(() => {
        let intent: android.content.Intent = args.activity.getIntent();
        try {
            handleIntent(intent);
        } catch (e) {
            console.error('Unknown error during getting App URL data', e);
        }

    });
});
