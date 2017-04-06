/// <reference path='node_modules/tns-platform-declarations/android/android.d.ts' />
import * as application from 'application';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

let lastReceivedData = null;

export function handleIntent(intent: any) {
    let data = intent.getData();
    if (lastReceivedData === null || data.toString() !== lastReceivedData.toString()) {
        try {
            if (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
                try {
                    setTimeout(() => {
                        getCallback()(extractAppURL(data));
                    });
                } catch (ignored) {
                    application.android.on(application.AndroidApplication.activityResultEvent, (eventData) => {
                        setTimeout(() => {
                            getCallback()(extractAppURL(data));
                        });
                    });
                }
            }
        } catch (e) {
            console.error('Unknown error during getting App URL data', e);
        }
    }
}
application.android.on(application.AndroidApplication.activityCreatedEvent, (args) => {
    let intent: android.content.Intent = args.activity.getIntent();
    try {
        if (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_MAIN).valueOf()
            || new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
            handleIntent(intent);
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }

});
application.android.on(application.AndroidApplication.activityResumedEvent, (args) => {
    let intent: android.content.Intent = args.activity.getIntent();
    try {
        if (new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_MAIN).valueOf()
            || new String(intent.getAction()).valueOf() === new String(android.content.Intent.ACTION_VIEW).valueOf()) {
            handleIntent(intent);
            lastReceivedData = intent.getData();
        }
    } catch (e) {
        console.error('Unknown error during getting App URL data', e);
    }
});
