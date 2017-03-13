
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';

declare var android: any;

application.android.on(application.AndroidApplication.activityResumedEvent, (args) => {
    try {
        console.log('Event: ' + args.eventName + ', Activity: ' + args.activity);
        console.log(new String(args.activity.getIntent().getAction()).valueOf(), new String(android.content.Intent.ACTION_VIEW).valueOf());
        if (new String(args.activity.getIntent().getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
            let data = args.activity.getIntent().getData();
            getCallback()(extractAppURL(data));
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
});
