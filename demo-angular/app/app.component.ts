import { Component, OnInit } from "@angular/core";
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        handleOpenURL((appURL: AppURL) => {
            console.log('Got the following appURL', appURL);
        });
    }
}
