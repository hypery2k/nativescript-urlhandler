import mockery from "mockery";
mockery.enable();
mockery.warnOnUnregistered(false);
mockery.registerMock("application", {
  android:{
    on:function (){
      
    }
  },
  AndroidApplication:{
    activityResumedEvent:{}
  }
});
mockery.registerMock("platform", {});
mockery.registerMock("utils/utils", {});
