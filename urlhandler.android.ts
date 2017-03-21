
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';
declare var android: any;

let lastReceivedData = null;

application.android.on(application.AndroidApplication.activityResumedEvent, (args) => {
    let data = args.activity.getIntent().getData();
    if (data !== lastReceivedData) {
        try {
            if (new String(args.activity.getIntent().getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
                getCallback()(extractAppURL(data));
                lastReceivedData = data;
            }
        } catch (e) {
            console.error('Unknown error during getting App URL data', e);
        }
    }
});
