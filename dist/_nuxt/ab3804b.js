(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{267:function(e,t,r){"use strict";e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},268:function(e,t,r){e.exports=r.p+"img/mail.324d583.png"},269:function(e,t,r){e.exports=r.p+"img/lock.81d41d7.png"},274:function(e,t,r){var content=r(289);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(65).default)("e3891800",content,!0,{sourceMap:!1})},288:function(e,t,r){"use strict";r(274)},289:function(e,t,r){var o=r(64),n=r(267),d=r(290),l=r(268),c=r(269),f=o(!1),v=n(d),m=n(l),x=n(c);f.push([e.i,".registration-window[data-v-055f340b]{background:#fff;width:350px;margin:120px auto;border:none;border-radius:5px;box-shadow:2px 2px 2px #ababab;position:relative}.register-ttl[data-v-055f340b]{height:50px;background-color:#305dff;border-radius:5px 5px 0 0}.register-ttl p[data-v-055f340b]{color:#fff;padding:17px;font-size:14px}.register[data-v-055f340b]{margin:18px 30px 0 50px}.register01[data-v-055f340b]:before{background:url("+v+') no-repeat;background-size:cover;top:75px}.register01[data-v-055f340b]:before,.register02[data-v-055f340b]:before{content:"";width:22px;height:22px;position:absolute;left:20px}.register02[data-v-055f340b]:before{background:url('+m+') no-repeat;background-size:cover;top:47%}.register03[data-v-055f340b]:before{content:"";background:url('+x+") no-repeat;background-size:cover;width:22px;height:22px;position:absolute;top:67%;left:20px}.register input[data-v-055f340b]{width:100%;height:30px;font-size:15px;border:none;border-bottom:1px solid #000}.register-button[data-v-055f340b]:hover{opacity:.7;transition:.3s}.button[data-v-055f340b]{text-align:right}.register-button[data-v-055f340b]{background:#305dff;color:#fff;border:none;border-radius:5px;padding:5px 15px;cursor:pointer;margin:15px 25px 15px 0}.error[data-v-055f340b]{color:red;padding-top:5px;margin-left:50px;width:290px}",""]),e.exports=f},290:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAqdJREFUWEftlz9oFEEUh3/vEjzhtFArbYwIFio2CramucC8rRRBTAgKIhaKYCxEBCP4pzFnISJoYSCGgIeCx745Lo02FgEbgwoKaqzEJhbRIhDvyegGLpvbm7mYw8aBZbh7733vu53dnT1C4GDmZw2pmwBsAbAGwCsAYyJyLxC1JI1Ci5j5NoDTWfmq+g7AU1WtVKvVF6HcYIEoiu6q6qkQsKoOWmvHQnKDBPr6+jZ3d3d/BLA2BApgtqurq7dSqUz78oMEmPkIgAkfrDGuquestbd8NUECxpgLRHTDB0vFJ0TkqK8mVGCYiC77YKm4FRH21XRMgIjG4jge/GcCAEZE5PyqCDDzawC7fLBU/I2I7PbVBC0BM6sP1CwuIl6+N8GBmfkxgINtSjwRkUO+miCBKIr6VfWhD9YYJ6KBOI7HfTVBAsmT8DqAYz5gEh9dWFi4WKvVvvjygwQcxBizg4heAljvgc6p6j5r7XtfcxcPFkiuBbclH/CAn4tIb0jztgWMMd4noqpesdYOd0QgWYpMiXabt30G/gskF6J7HvRnrPG4iAyErn/bS2CM2U9EFsDGjCazqmqstVOhEkG3ITPvBXAyObxsIrqjqiURca9xLUdLAWZ2u9mZ0MapTl9VdaRQKJTK5fLPLItMAWa+BuAsgILvV3jiU+5sWGsfNctrKsDMNwEM/WXjJeVENBTHcSnNXCZgjDlBRPdXs/kiq9n/hWUCzPwJQE8nBADMiMi2RvYSgSiKjKpKh5r/xhIRx3HsbuU/nxubMfODNvb8lXqOisjxLIHDqnqJiPaslN6qTlWnieiqiJSbCix+WSwWC/l8fme9Xt+uqj25XG6rmwFsALAueSlxszvc+J4cc8n8jYhm6vX6ZzfncrkP8/PzbycnJ3+kBX8Bd9r/ITWa278AAAAASUVORK5CYII="},306:function(e,t,r){"use strict";r.r(t);var o=r(11),n=(r(66),r(30),r(78),r(44),r(108)),d={auth:!1,data:function(){return{name:null,email:null,password:null}},methods:{logout:function(){n.a.auth().signOut()},register:function(){var e=this;n.a.auth().createUserWithEmailAndPassword(this.email,this.password).then((function(data){data.user.sendEmailVerification().then((function(){e.logout(),e.$router.replace("/thanks")}))}))},insertUser:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={name:e.name,email:e.email,password:e.password},t.next=3,e.$axios.post("https://afternoon-beyond-97179.herokuapp.com/api/user",r);case 3:case"end":return t.stop()}}),t)})))()}}},l=(r(288),r(36)),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("validation-observer",{ref:"obs",scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"registration-window"},[r("div",{staticClass:"register-ttl"},[r("p",[e._v("Registration")])]),e._v(" "),r("validation-provider",{attrs:{rules:"required|max:20"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"register register01"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{id:"name",type:"text",name:"ユーザーネーム",placeholder:"Username"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),r("div",{staticClass:"error"},[e._v(e._s(t.errors[0]))])]}}],null,!0)}),e._v(" "),r("validation-provider",{attrs:{rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"register register02"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{id:"email",type:"email",name:"メールアドレス",placeholder:"Email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}})]),e._v(" "),r("div",{staticClass:"error"},[e._v(e._s(t.errors[0]))])]}}],null,!0)}),e._v(" "),r("validation-provider",{attrs:{rules:"required|min:6"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"register register03"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{id:"password",type:"password",name:"パスワード",placeholder:"Password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),e._v(" "),r("span",{staticClass:"field-icon"},[r("i",{staticClass:"mdi mdi-eye toggle-password",attrs:{toggle:"password-field"}})])]),e._v(" "),r("div",{staticClass:"error"},[e._v(e._s(t.errors[0]))])]}}],null,!0)}),e._v(" "),r("div",{staticClass:"button"},[r("button",{staticClass:"register-button",attrs:{disabled:t.invalid||!t.validated},on:{click:function(t){e.register(),e.insertUser()}}},[e._v("登録")])])],1)]}}])})}),[],!1,null,"055f340b",null);t.default=component.exports}}]);