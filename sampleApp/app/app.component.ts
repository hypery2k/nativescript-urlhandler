import { Component } from "@angular/core";
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    constructor() {
        handleOpenURL((appURL: AppURL) => {
            console.log(appURL);
        });
    }

}
