/// <reference path='node_modules/tns-platform-declarations/android/android.d.ts' />
import * as application from 'application';
import { setActivityCallbacks, AndroidActivityCallbacks } from 'ui/frame';
import { getCallback, extractAppURL } from './urlhandler.common';
export { handleOpenURL } from './urlhandler.common';

let lastReceivedData = null;

export function handleIntent(intent: any) {
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

@JavaProxy('com.tns.NativeScriptActivity')
export class Activity extends android.app.Activity {
    private _callbacks: AndroidActivityCallbacks;

    protected onCreate(savedInstanceState: android.os.Bundle): void {
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }
        // initialize the modules with the custom application object
        application.android.init(this);
        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);
    }
    protected onNewIntent(intent: android.content.Intent): void {
        super.onNewIntent(intent);
        if (intent.getDataString) {
            handleIntent(intent);
        }
    }
}
