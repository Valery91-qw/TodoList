(this.webpackJsonptodolist_present=this.webpackJsonptodolist_present||[]).push([[0],{115:function(t,e,a){},116:function(t,e,a){},150:function(t,e,a){"use strict";a.r(e);var n,r,s=a(0),c=a.n(s),i=a(9),o=a.n(i),d=(a(115),a(116),a(197)),u=a(198),l=a(152),p=a(192),b=a(189),j=a(97),f=a.n(j),h=a(196),O=a(199),m=a(200),x=a(16),g=a(22),v=a(11),k=a.n(v),y=a(21),I=a(90),C=a.n(I).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"fc503820-69cf-441a-add2-ccdccedc3a76"}}),T=function(t,e){return C.put("todo-lists/".concat(t),{title:e})},w=function(){return C.get("todo-lists")},S=function(t){return C.post("todo-lists",{title:t})},L=function(t){return C.delete("todo-lists/".concat(t))},F=function(t,e,a){return C.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},E=function(t){return C.get("todo-lists/".concat(t,"/tasks"))},A=function(t,e){return C.post("todo-lists/".concat(t,"/tasks"),{title:e})},P=function(t,e){return C.delete("todo-lists/".concat(t,"/tasks/").concat(e))},V=function(t){return C.post("auth/login",t)},W=function(){return C.get("auth/me")},M=function(){return C.delete("auth/login")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(n||(n={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={}));var N=function(t,e){t.messages.length?e(Y({error:t.messages[0]})):e(Y({error:"Some error occurred"})),e(G({status:"failed"}))},D=function(t,e){e(Y({error:t.message})),e(G({status:"failed"}))},z=a(17),R=Object(z.b)("auth/login",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,V(e);case 3:if(n=t.sent,t.prev=4,0!==n.data.resultCode){t.next=10;break}return a.dispatch(G({status:"succeeded"})),t.abrupt("return");case 10:return N(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue({error:n.data.messages[0]}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(4),D(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({error:t.t0.message}));case 18:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e,a){return t.apply(this,arguments)}}()),U=Object(z.b)("auth/logout",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,M();case 3:if(n=t.sent,t.prev=4,0!==n.data.resultCode){t.next=10;break}return a.dispatch(G({status:"succeeded"})),t.abrupt("return");case 10:return N(n.data,a.dispatch),t.abrupt("return",a.rejectWithValue({error:n.data.messages[0]}));case 12:t.next=18;break;case 14:return t.prev=14,t.t0=t.catch(4),D(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({error:t.t0.message}));case 18:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e,a){return t.apply(this,arguments)}}()),_=Object(z.c)({name:"auth",initialState:{isLoggedIn:!1},reducers:{setIsLoggedIn:function(t,e){t.isLoggedIn=e.payload.value}},extraReducers:function(t){t.addCase(R.fulfilled,(function(t,e){t.isLoggedIn=!0})),t.addCase(U.fulfilled,(function(t,e){t.isLoggedIn=!1}))}}),q=_.reducer,B=_.actions.setIsLoggedIn,H=Object(z.b)("app/initialize",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,W();case 3:return n=t.sent,t.prev=4,0===n.data.resultCode&&(a.dispatch(G({status:"succeeded"})),a.dispatch(B({value:!0}))),a.dispatch(G({status:"succeeded"})),t.abrupt("return",{value:!0});case 10:t.prev=10,t.t0=t.catch(4),D(t.t0,a.dispatch);case 13:case"end":return t.stop()}}),t,null,[[4,10]])})));return function(e,a){return t.apply(this,arguments)}}()),Z=Object(z.c)({name:"app",initialState:{status:"idle",error:null,isInitialized:!1},reducers:{setAppStatus:function(t,e){t.status=e.payload.status},setAppError:function(t,e){t.error=e.payload.error}},extraReducers:function(t){t.addCase(H.fulfilled,(function(t,e){e.payload&&(t.isInitialized=e.payload.value)}))}}),J=Z.reducer,K=Z.actions,G=K.setAppStatus,Y=K.setAppError,$=Object(z.b)("todolists/fetchTodolists",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,w();case 3:n=t.sent;try{a.dispatch(G({status:"succeeded"})),a.dispatch(rt({todolists:n.data}))}catch(e){D(e,a.dispatch)}case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),Q=Object(z.b)("todolists/deleteTodolist",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),a.dispatch(st({id:e.todolistId,entityStatus:"loading"})),t.next=4,L(e.todolistId);case 4:n=t.sent;try{0===n.data.resultCode?(a.dispatch(dt({id:e.todolistId})),a.dispatch(G({status:"succeeded"}))):N(n.data,a.dispatch)}catch(r){D(r,a.dispatch)}case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),X=Object(z.b)("todolists/createTodolist",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,S(e.title);case 3:n=t.sent;try{0===n.data.resultCode?(a.dispatch(ct({todolist:n.data.data.item})),a.dispatch(G({status:"succeeded"}))):N(n.data,a.dispatch)}catch(r){D(r,a.dispatch)}case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),tt=Object(z.b)("todolists/updateTodolist",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,T(e.id,e.title);case 3:n=t.sent;try{0===n.data.resultCode?(a.dispatch(it({id:e.id,title:e.title})),a.dispatch(G({status:"succeeded"}))):N(n.data,a.dispatch)}catch(r){D(r,a.dispatch)}case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),et=Object(z.c)({name:"todolists",initialState:[],reducers:{setTodolists:function(t,e){return e.payload.todolists.map((function(t){return Object(g.a)(Object(g.a)({},t),{},{filter:"all",entityStatus:"idle"})}))},changeTodolistEntityStatus:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].entityStatus=e.payload.entityStatus},removeTodoList:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));a>-1&&t.splice(a,1)},addTodolist:function(t,e){t.unshift(Object(g.a)(Object(g.a)({},e.payload.todolist),{},{filter:"all",entityStatus:"idle"}))},changeTodolistTitle:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].title=e.payload.title},changeTodolistFilter:function(t,e){var a=t.findIndex((function(t){return t.id===e.payload.id}));t[a].filter=e.payload.filter}}}),at=et.reducer,nt=et.actions,rt=nt.setTodolists,st=nt.changeTodolistEntityStatus,ct=nt.addTodolist,it=nt.changeTodolistTitle,ot=nt.changeTodolistFilter,dt=nt.removeTodoList,ut=Object(z.b)("tasks/fetchTasks",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),t.next=3,E(e);case 3:return n=t.sent,a.dispatch(G({status:"succeeded"})),t.abrupt("return",{tasks:n.data.items,todoId:e});case 6:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),lt=Object(z.b)("tasks/deleteTask",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),a.dispatch(st({id:e.todoId,entityStatus:"loading"})),t.next=4,P(e.todoId,e.taskId);case 4:if(n=t.sent,t.prev=5,0!==n.data.resultCode){t.next=12;break}return a.dispatch(G({status:"succeeded"})),a.dispatch(st({id:e.todoId,entityStatus:"succeeded"})),t.abrupt("return",{todoId:e.todoId,taskId:e.taskId});case 12:return N(n.data,a.dispatch),a.dispatch(st({id:e.todoId,entityStatus:"succeeded"})),t.abrupt("return",a.rejectWithValue({error:n.data.messages[0]}));case 15:t.next=21;break;case 17:return t.prev=17,t.t0=t.catch(5),D(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({error:t.t0.message}));case 21:case"end":return t.stop()}}),t,null,[[5,17]])})));return function(e,a){return t.apply(this,arguments)}}()),pt=Object(z.b)("tasks/createTask",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.dispatch(G({status:"loading"})),a.dispatch(st({id:e.todoId,entityStatus:"loading"})),t.next=4,A(e.todoId,e.title);case 4:if(n=t.sent,t.prev=5,0!==n.data.resultCode){t.next=12;break}return a.dispatch(G({status:"succeeded"})),a.dispatch(st({id:e.todoId,entityStatus:"succeeded"})),t.abrupt("return",{task:n.data.data.item});case 12:return N(n.data,a.dispatch),a.dispatch(st({id:e.todoId,entityStatus:"succeeded"})),t.abrupt("return",a.rejectWithValue({error:n.data.messages[0]}));case 15:t.next=21;break;case 17:return t.prev=17,t.t0=t.catch(5),D(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({error:t.t0.message}));case 21:case"end":return t.stop()}}),t,null,[[5,17]])})));return function(e,a){return t.apply(this,arguments)}}()),bt=Object(z.b)("tasks/updateTask",function(){var t=Object(y.a)(k.a.mark((function t(e,a){var n,r,s,c;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.dispatch(G({status:"loading"})),a.dispatch(st({id:e.todoId,entityStatus:"loading"})),n=a.getState(),r=n.tasks[e.todoId].find((function(t){return t.id===e.taskId}))){t.next=6;break}return t.abrupt("return",a.rejectWithValue("task not found in the state"));case 6:return s=Object(g.a)({deadline:r.deadline,description:r.description,priority:r.priority,startDate:r.startDate,title:r.title,status:r.status},e.domainModel),t.next=9,F(e.todoId,e.taskId,s);case 9:if(c=t.sent,t.prev=10,0!==c.data.resultCode){t.next=17;break}return a.dispatch(G({status:"succeeded"})),a.dispatch(st({id:e.todoId,entityStatus:"succeeded"})),t.abrupt("return",e);case 17:return N(c.data,a.dispatch),t.abrupt("return",a.rejectWithValue({error:c.data.messages[0]}));case 19:t.next=25;break;case 21:return t.prev=21,t.t0=t.catch(10),D(t.t0,a.dispatch),t.abrupt("return",a.rejectWithValue({error:t.t0.message}));case 25:case"end":return t.stop()}}),t,null,[[10,21]])})));return function(e,a){return t.apply(this,arguments)}}()),jt=Object(z.c)({name:"tasks",initialState:{},reducers:{},extraReducers:function(t){t.addCase(ct,(function(t,e){t[e.payload.todolist.id]=[]})),t.addCase(dt,(function(t,e){delete t[e.payload.id]})),t.addCase(rt,(function(t,e){e.payload.todolists.forEach((function(e){t[e.id]=[]}))})),t.addCase(ut.fulfilled,(function(t,e){t[e.payload.todoId]=e.payload.tasks})),t.addCase(lt.fulfilled,(function(t,e){var a=t[e.payload.todoId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&a.splice(n,1)})),t.addCase(pt.fulfilled,(function(t,e){t[e.payload.task.todoListId].unshift(e.payload.task)})),t.addCase(bt.fulfilled,(function(t,e){var a=t[e.payload.todoId],n=a.findIndex((function(t){return t.id===e.payload.taskId}));n>-1&&(a[n]=Object(g.a)(Object(g.a)({},a[n]),e.payload.domainModel))}))}}).reducer,ft=a(193),ht=a(151),Ot=a(48),mt=a(201),xt=a(190),gt=a(3),vt=c.a.memo((function(t){var e=Object(s.useState)(""),a=Object(Ot.a)(e,2),n=a[0],r=a[1],c=Object(s.useState)(null),i=Object(Ot.a)(c,2),o=i[0],d=i[1],u=function(){""!==n.trim()?(t.addItem(n),r("")):d("Title is required")};return Object(gt.jsxs)("div",{children:[Object(gt.jsx)(mt.a,{size:"small",disabled:t.disabled,value:n,onKeyPress:function(t){null!==o&&d(null),"Enter"===t.code&&u()},onChange:function(t){r(t.currentTarget.value)},error:!!o,label:"Title",helperText:o}),Object(gt.jsx)(b.a,{color:"primary",onClick:u,disabled:t.disabled,children:Object(gt.jsx)(xt.a,{})})]})})),kt=a(99),yt=c.a.memo((function(t){var e=Object(s.useState)(!1),a=Object(Ot.a)(e,2),n=a[0],r=a[1],c=Object(s.useState)(t.value),i=Object(Ot.a)(c,2),o=i[0],d=i[1],u=Object(s.useCallback)((function(t){d(t.currentTarget.value)}),[]),l=Object(s.useCallback)((function(){r(!n),t.onChange(o)}),[n,t,o]);return n?Object(gt.jsx)(mt.a,{size:"small",onChange:u,value:o,autoFocus:!0,onBlur:l}):Object(gt.jsx)("span",{onDoubleClick:l,children:o})})),It=a(191),Ct=a(203),Tt=c.a.memo((function(t){var e=Object(s.useCallback)((function(){t.removeTask(t.id,t.todoId)}),[t]),a=Object(s.useCallback)((function(e){t.changeTaskStatus(t.id,e.currentTarget.checked?n.Completed:n.New,t.todoId)}),[t]),r=Object(s.useCallback)((function(e){t.changeTaskTitle(t.todoId,t.id,e)}),[t]);return Object(gt.jsxs)("div",{className:t.status===n.Completed?"is-done":"",children:[Object(gt.jsx)(Ct.a,{color:"primary",checked:t.status===n.Completed,onChange:a}),Object(gt.jsx)(yt,{value:t.title,onChange:r}),Object(gt.jsx)(b.a,{color:"primary",size:"small",onClick:e,disabled:"loading"===t.entityStatus,children:Object(gt.jsx)(It.a,{})})]},t.id)})),wt=c.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,r=Object(kt.a)(t,["demo"]),c=Object(x.b)();Object(s.useEffect)((function(){a||c(ut(r.todolist.id))}),[a,c,r.todolist.id]);var i=Object(s.useCallback)((function(t){r.addTask(t,r.todolist.id)}),[r]),o=Object(s.useCallback)((function(t){r.changeTodolistTitle(t,r.todolist.id)}),[r]),d=Object(s.useCallback)((function(){r.removeTodolist(r.todolist.id)}),[r]),u=Object(s.useCallback)((function(){return r.changeTodolistFilter("all",r.todolist.id)}),[r]),l=Object(s.useCallback)((function(){return r.changeTodolistFilter("active",r.todolist.id)}),[r]),j=Object(s.useCallback)((function(){return r.changeTodolistFilter("completed",r.todolist.id)}),[r]),f=r.tasks;return"active"===r.todolist.filter&&(f=r.tasks.filter((function(t){return t.status===n.New}))),"completed"===r.todolist.filter&&(f=r.tasks.filter((function(t){return t.status===n.Completed}))),Object(gt.jsxs)("div",{children:[Object(gt.jsxs)("h3",{children:[Object(gt.jsx)(yt,{value:r.todolist.title,onChange:o}),Object(gt.jsx)(b.a,{onClick:d,disabled:"loading"===r.todolist.entityStatus,children:Object(gt.jsx)(It.a,{})})]}),Object(gt.jsx)(vt,{addItem:i,disabled:"loading"===r.todolist.entityStatus}),Object(gt.jsx)("div",{children:f.map((function(t){return Object(gt.jsx)(Tt,{entityStatus:r.todolist.entityStatus,id:t.id,status:t.status,title:t.title,todoId:r.todolist.id,changeTaskStatus:r.changeTaskStatus,removeTask:r.removeTask,changeTaskTitle:r.changeTaskTitle},t.id)}))}),Object(gt.jsxs)("div",{children:[Object(gt.jsx)(p.a,{variant:"all"===r.todolist.filter?"contained":"text",color:"primary",onClick:u,children:"All"}),Object(gt.jsx)(p.a,{variant:"active"===r.todolist.filter?"contained":"text",color:"primary",onClick:l,children:"Active"}),Object(gt.jsx)(p.a,{variant:"completed"===r.todolist.filter?"contained":"text",color:"primary",onClick:j,children:"Completed"})]})]})})),St=a(15),Lt=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(x.c)((function(t){return t.todolists})),r=Object(x.c)((function(t){return t.tasks})),c=Object(x.c)((function(t){return t.app.status})),i=Object(x.c)((function(t){return t.auth.isLoggedIn})),o=Object(x.b)();Object(s.useEffect)((function(){!a&&i&&o($())}),[a,o,i]);var d=Object(s.useCallback)((function(t,e){o(pt({todoId:e,title:t}))}),[o]),u=Object(s.useCallback)((function(t,e,a){o(bt({todoId:a,taskId:t,domainModel:{status:e}}))}),[o]),l=Object(s.useCallback)((function(t,e,a){o(bt({todoId:t,taskId:e,domainModel:{title:a}}))}),[o]),p=Object(s.useCallback)((function(t,e){o(lt({taskId:t,todoId:e}))}),[o]),b=Object(s.useCallback)((function(t){o(Q({todolistId:t}))}),[o]),j=Object(s.useCallback)((function(t,e){o(ot({filter:t,id:e}))}),[o]),f=Object(s.useCallback)((function(t,e){o(tt({id:e,title:t}))}),[o]),h=Object(s.useCallback)((function(t){o(X({title:t}))}),[o]);return i?Object(gt.jsxs)(gt.Fragment,{children:[Object(gt.jsx)(ft.a,{container:!0,style:{padding:"20px"},children:Object(gt.jsx)(vt,{addItem:h,disabled:"loading"===c})}),Object(gt.jsx)(ft.a,{container:!0,spacing:3,children:n.map((function(t){var e=r[t.id];return Object(gt.jsx)(ft.a,{item:!0,children:Object(gt.jsx)(ht.a,{style:{padding:"10px"},children:Object(gt.jsx)(wt,{todolist:t,removeTask:p,tasks:e,changeTodolistFilter:j,addTask:d,changeTodolistTitle:f,removeTodolist:b,changeTaskTitle:l,changeTaskStatus:u,demo:a},t.id)})},t.id)}))})]}):Object(gt.jsx)(St.a,{to:"/login"})},Ft=a(205),Et=a(202);function At(t){return Object(gt.jsx)(Et.a,Object(g.a)({elevation:6,variant:"filled"},t))}function Pt(){var t=Object(x.c)((function(t){return t.app.error})),e=Object(x.b)(),a=function(t,a){"clickaway"!==a&&e(Y({error:null}))};return Object(gt.jsx)(Ft.a,{open:null!==t,autoHideDuration:6e3,onClose:a,children:Object(gt.jsx)(At,{onClose:a,severity:"error",children:t})})}var Vt=a(56),Wt=a(187),Mt=a(188),Nt=a(194),Dt=a(195),zt=a(98),Rt=function(){var t=Object(x.b)(),e=Object(x.c)((function(t){return t.auth.isLoggedIn})),a=Object(zt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Invalid password length"):e.password="Required",e},onSubmit:function(e){t(R(e)),a.resetForm()}});return e?Object(gt.jsx)(St.a,{to:"/"}):Object(gt.jsx)(ft.a,{container:!0,justify:"center",children:Object(gt.jsx)(ft.a,{item:!0,xs:4,children:Object(gt.jsx)("form",{onSubmit:a.handleSubmit,children:Object(gt.jsxs)(Wt.a,{children:[Object(gt.jsxs)(Mt.a,{children:[Object(gt.jsxs)("p",{children:["To log in get registered",Object(gt.jsx)("a",{href:"https://social-network.samuraijs.com/",rel:"noreferrer",target:"_blank",children:"here"})]}),Object(gt.jsx)("p",{children:"or use common test account credentials:"}),Object(gt.jsxs)("p",{children:["Email: ",Object(gt.jsx)("b",{children:"free@samuraijs.com"})]}),Object(gt.jsxs)("p",{children:["Password: ",Object(gt.jsx)("b",{children:"free"})]})]}),Object(gt.jsxs)(Nt.a,{children:[Object(gt.jsx)(mt.a,Object(g.a)({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email?Object(gt.jsx)("div",{style:{color:"red"},children:a.errors.email}):null,Object(gt.jsx)(mt.a,Object(g.a)({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password?Object(gt.jsx)("div",{style:{color:"red"},children:a.errors.password}):null,Object(gt.jsx)(Dt.a,{label:"Remember me",control:Object(gt.jsx)(Ct.a,Object(g.a)({},a.getFieldProps("rememberMe")))}),Object(gt.jsx)(p.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})};var Ut=function(t){var e=t.demo,a=void 0!==e&&e,n=Object(x.c)((function(t){return t.app.status})),r=Object(x.c)((function(t){return t.app.isInitialized})),c=Object(x.c)((function(t){return t.auth.isLoggedIn})),i=Object(x.b)();Object(s.useEffect)((function(){i(H())}),[i]);var o=Object(s.useCallback)((function(){i(U())}),[i]);return r?Object(gt.jsx)(Vt.a,{children:Object(gt.jsxs)("div",{className:"App",children:[Object(gt.jsx)(Pt,{}),Object(gt.jsxs)(d.a,{position:"static",children:[Object(gt.jsxs)(u.a,{children:[Object(gt.jsx)(b.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(gt.jsx)(f.a,{})}),Object(gt.jsx)(l.a,{variant:"h6",children:"News"}),c&&Object(gt.jsx)(p.a,{style:{marginLeft:"auto"},color:"inherit",onClick:o,children:"log out"})]}),"loading"===n&&Object(gt.jsx)(O.a,{color:"secondary"})]}),Object(gt.jsx)(m.a,{fixed:!0,children:Object(gt.jsxs)(St.d,{children:[Object(gt.jsx)(St.b,{exact:!0,path:"/",render:function(){return Object(gt.jsx)(Lt,{demo:a})}}),Object(gt.jsx)(St.b,{exact:!0,path:"/login",render:function(){return Object(gt.jsx)(Rt,{})}}),Object(gt.jsx)(St.b,{exact:!0,path:"/404",render:function(){return Object(gt.jsx)("h1",{children:"404: PAGE NOT FOUND"})}}),Object(gt.jsx)(St.a,{from:"*",to:"/404"})]})})]})}):Object(gt.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(gt.jsx)(h.a,{})})},_t=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,206)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,s=e.getLCP,c=e.getTTFB;a(t),n(t),r(t),s(t),c(t)}))},qt=a(25),Bt=a(50),Ht=Object(qt.c)({tasks:jt,todolists:at,app:J,auth:q}),Zt=Object(z.a)({reducer:Ht,middleware:function(t){return t().prepend(Bt.a)}});o.a.render(Object(gt.jsx)(c.a.StrictMode,{children:Object(gt.jsx)(x.a,{store:Zt,children:Object(gt.jsx)(Ut,{})})}),document.getElementById("root")),_t()}},[[150,1,2]]]);
//# sourceMappingURL=main.a34e9d73.chunk.js.map