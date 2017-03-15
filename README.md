# NativeScript URL Handler Plugin

[![Greenkeeper badge](https://badges.greenkeeper.io/hypery2k/nativescript-urlhandler.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/hypery2k/nativescript-urlhandler.svg?branch=master)](https://travis-ci.org/hypery2k/nativescript-urlhandler)
[![npm version](https://badge.fury.io/js/nativescript-urlhandler.svg)](http://badge.fury.io/js/nativescript-urlhandler)

[![NPM](https://nodei.co/npm/nativescript-urlhandler.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-urlhandler/)

> Feel free to **donate**
> 
> <a href='http://www.pledgie.com/campaigns/33053'><img alt='Click here to lend your support and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/33053.png?skin_name=chrome' border='0' /></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AGPGLZYNV6Y5S">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D).
> 
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

# Usage

Just add App links to your app, see iOS and Android instructions below, and register a handler for the URL data:
```
import { Component } from "@angular/core";
import { handleOpenURL, AppURL } from 'nativescript-urlhandler';

@Component({
  selector: "gr-main",
  template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor() {
      handleOpenURL((appURL: AppURL) => {
        console.log('Got the following appURL', appURL);
      });
    }
}

```



## Installation

```
$ tns plugin add nativescript-urlhandler
```

Or if you want to use the development version (nightly build), which maybe not stable!:

```
$ tns plugin add nativescript-urlhandler@next
```


### Android


```
<intent-filter>
  <action android:name="android.intent.action.VIEW" /> 
  <category android:name="android.intent.category.DEFAULT" /> 
  <category android:name="android.intent.category.BROWSABLE" /> 
  <data android:scheme="myapp" /> 
</intent-filter>
```

For example:

```
<activity android:name="com.MyCompany.MyApp.MainActivity" android:label="@string/app_name">
  <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
  <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" /> 
      <data android:scheme="myapp" android:host="__PACKAGE__" />
  </intent-filter>
</activity>

```

### iOS

```
<key>CFBundleURLTypes</key>
    <array>
        <dict>
            <key>CFBundleURLName</key>
            <string>com.yourcompany.myapp</string>
        </dict>
        <dict>
            <key>CFBundleURLSchemes</key>
            <array>
                <string>myapp</string>
            </array>
        </dict>
    </array>
```
