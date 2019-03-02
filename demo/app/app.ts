/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

import './app.scss';
import './bundle-config';
import * as app from 'application';

handleOpenURL((appURL: AppURL) => {
    console.log('handleOpenURL', appURL);
});

app.start({ moduleName: 'main-page' });