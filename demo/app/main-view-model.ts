import { Observable } from 'data/observable';
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    private _appURL: string;

    constructor() {
        super();

        // Initialize default values.
        this._counter = 42;
        this.updateMessage();
        handleOpenURL((appURL: AppURL) => {
            this._appURL = appURL.toString();
        });
    }

    get appURL(): string {
        return this._appURL;
    }
    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value);
        }
    }

    public onTap() {
        this._counter--;
        this.updateMessage();
    }

    private updateMessage() {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        } else {
            this.message = `${this._counter} taps left`;
        }
    }
}
