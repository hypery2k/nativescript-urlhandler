# nativescript-urlhandler
NativeScript URL Handler Plugin


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

iOS
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
