
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';
declare var android: any;

let lastReceivedData = null;

function handleIntent(intent: any) {
    let data = intent.getData();
    if (data !== lastReceivedData) {
        try {
            if (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
                application.android.on(application.AndroidApplication.activityResultEvent, (eventData) => {
                    getCallback()(extractAppURL(data));
                    lastReceivedData = data;
                });
            }
        } catch (e) {
            console.error('Unknown error during getting App URL data', e);
        }
    }
}

application.android.on(application.AndroidApplication.activityStartedEvent, (args) => {
    handleIntent(args.activity.getIntent());
});

application.android.on(application.AndroidApplication.activityResumedEvent, (args) => {
    handleIntent(args.activity.getIntent());
});
