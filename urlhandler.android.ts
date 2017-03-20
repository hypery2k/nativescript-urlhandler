
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';
declare var android: any;

let alreadyHandled: boolean = false;

application.android.on(application.AndroidApplication.activityResumedEvent, (args) => {
    if (!alreadyHandled) {
        try {
            if (new String(args.activity.getIntent().getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
                let data = args.activity.getIntent().getData();
                getCallback()(extractAppURL(data));
                alreadyHandled = true;
            }
        } catch (e) {
            console.error('Unknown error during getting App URL data', e);
        }
    }
});
