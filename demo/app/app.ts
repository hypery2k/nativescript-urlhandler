/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
import { Application } from '@nativescript/core';
import { AppURL, handleOpenURL } from 'nativescript-urlhandler';
import './app.scss';
import './bundle-config';


handleOpenURL((appURL: AppURL) => {
    console.log('handleOpenURL', appURL);
});

Application.run({ moduleName: 'main-page' });