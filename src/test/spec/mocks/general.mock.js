import mockery from "mockery";
mockery.enable();
mockery.warnOnUnregistered(false);
mockery.registerMock("application", {
    android: {
        on: function() {

        }
    },
    ios: {
        delegate: {
            prototype: {}
        }
    },
    AndroidApplication: {
        activityResumedEvent: {}
    }
});
mockery.registerMock("android", {});
mockery.registerMock("platform", {});
mockery.registerMock("utils/utils", {});
mockery.registerMock("ui/frame", {});

global.android = {
    app: {
        Activity: {}
    }
};
global.JavaProxy = () => {};
global.Activity = {};
global.UIResponder = {};
global.UIApplicationDelegate = {};
