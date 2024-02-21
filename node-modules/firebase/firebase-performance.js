import{registerVersion as e,_registerComponent as t,_getProvider,getApp as n}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";class FirebaseError extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,FirebaseError.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ErrorFactory.prototype.create)}}class ErrorFactory{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,o=this.errors[e],a=o?function replaceTemplate(e,t){return e.replace(r,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(o,n):"Error",s=`${this.serviceName}: ${a} (${i}).`;return new FirebaseError(i,s,n)}}const r=/\{\$([^}]+)}/g;function deepEqual(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],o=t[i];if(isObject(n)&&isObject(o)){if(!deepEqual(n,o))return!1}else if(n!==o)return!1}for(const e of r)if(!n.includes(e))return!1;return!0}function isObject(e){return null!==e&&"object"==typeof e}function getModularInstance(e){return e&&e._delegate?e._delegate:e}var i;!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(i||(i={}));const o={debug:i.DEBUG,verbose:i.VERBOSE,info:i.INFO,warn:i.WARN,error:i.ERROR,silent:i.SILENT},a=i.INFO,s={[i.DEBUG]:"log",[i.VERBOSE]:"log",[i.INFO]:"info",[i.WARN]:"warn",[i.ERROR]:"error"},defaultLogHandler=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=s[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class Component{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}let c,u;const l=new WeakMap,p=new WeakMap,g=new WeakMap,d=new WeakMap,f=new WeakMap;let h={get(e,t,n){if(e instanceof IDBTransaction){if("done"===t)return p.get(e);if("objectStoreNames"===t)return e.objectStoreNames||g.get(e);if("store"===t)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wrap(e[t])},set:(e,t,n)=>(e[t]=n,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function wrapFunction(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?function getCursorAdvanceMethods(){return u||(u=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}().includes(e)?function(...t){return e.apply(unwrap(this),t),wrap(l.get(this))}:function(...t){return wrap(e.apply(unwrap(this),t))}:function(t,...n){const r=e.call(unwrap(this),t,...n);return g.set(r,t.sort?t.sort():[t]),wrap(r)}}function transformCachableValue(e){return"function"==typeof e?wrapFunction(e):(e instanceof IDBTransaction&&function cacheDonePromiseForTransaction(e){if(p.has(e))return;const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("complete",complete),e.removeEventListener("error",error),e.removeEventListener("abort",error)},complete=()=>{t(),unlisten()},error=()=>{n(e.error||new DOMException("AbortError","AbortError")),unlisten()};e.addEventListener("complete",complete),e.addEventListener("error",error),e.addEventListener("abort",error)}));p.set(e,t)}(e),t=e,function getIdbProxyableTypes(){return c||(c=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}().some((e=>t instanceof e))?new Proxy(e,h):e);var t}function wrap(e){if(e instanceof IDBRequest)return function promisifyRequest(e){const t=new Promise(((t,n)=>{const unlisten=()=>{e.removeEventListener("success",success),e.removeEventListener("error",error)},success=()=>{t(wrap(e.result)),unlisten()},error=()=>{n(e.error),unlisten()};e.addEventListener("success",success),e.addEventListener("error",error)}));return t.then((t=>{t instanceof IDBCursor&&l.set(t,e)})).catch((()=>{})),f.set(t,e),t}(e);if(d.has(e))return d.get(e);const t=transformCachableValue(e);return t!==e&&(d.set(e,t),f.set(t,e)),t}const unwrap=e=>f.get(e);const m=["get","getKey","getAll","getAllKeys","count"],v=["put","add","delete","clear"],b=new Map;function getMethod(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(b.get(t))return b.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=v.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!i&&!m.includes(n))return;const method=async function(e,...t){const o=this.transaction(e,i?"readwrite":"readonly");let a=o.store;return r&&(a=a.index(t.shift())),(await Promise.all([a[n](...t),i&&o.done]))[0]};return b.set(t,method),method}!function replaceTraps(e){h=e(h)}((e=>({...e,get:(t,n,r)=>getMethod(t,n)||e.get(t,n,r),has:(t,n)=>!!getMethod(t,n)||e.has(t,n)})));const w="@firebase/installations",T=new ErrorFactory("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function isServerError(e){return e instanceof FirebaseError&&e.code.includes("request-failed")}function getInstallationsEndpoint({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function extractAuthTokenInfoFromResponse(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function getErrorFromResponse(e,t){const n=(await t.json()).error;return T.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function getHeaders({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function getHeadersWithAuth(e,{refreshToken:t}){const n=getHeaders(e);return n.append("Authorization",function getAuthorizationHeader(e){return`FIS_v2 ${e}`}(t)),n}async function retryIfServerError(e){const t=await e();return t.status>=500&&t.status<600?e():t}function sleep(e){return new Promise((t=>{setTimeout(t,e)}))}const E=/^[cdef][\w-]{21}$/;function generateFid(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function encode(e){return function bufferToBase64UrlSafe(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}(e).substr(0,22)}(e);return E.test(t)?t:""}catch(e){return""}}function getKey(e){return`${e.appName}!${e.appId}`}const I=new Map;function fidChanged(e,t){const n=getKey(e);callFidChangeCallbacks(n,t),function broadcastFidChange(e,t){const n=function getBroadcastChannel(){!y&&"BroadcastChannel"in self&&(y=new BroadcastChannel("[Firebase] FID Change"),y.onmessage=e=>{callFidChangeCallbacks(e.data.key,e.data.fid)});return y}();n&&n.postMessage({key:e,fid:t});!function closeBroadcastChannel(){0===I.size&&y&&(y.close(),y=null)}()}(n,t)}function callFidChangeCallbacks(e,t){const n=I.get(e);if(n)for(const e of n)e(t)}let y=null;const S="firebase-installations-store";let _=null;function getDbPromise(){return _||(_=function openDB(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const a=indexedDB.open(e,t),s=wrap(a);return r&&a.addEventListener("upgradeneeded",(e=>{r(wrap(a.result),e.oldVersion,e.newVersion,wrap(a.transaction),e)})),n&&a.addEventListener("blocked",(e=>n(e.oldVersion,e.newVersion,e))),s.then((e=>{o&&e.addEventListener("close",(()=>o())),i&&e.addEventListener("versionchange",(e=>i(e.oldVersion,e.newVersion,e)))})).catch((()=>{})),s}("firebase-installations-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore(S)}})),_}async function set(e,t){const n=getKey(e),r=(await getDbPromise()).transaction(S,"readwrite"),i=r.objectStore(S),o=await i.get(n);return await i.put(t,n),await r.done,o&&o.fid===t.fid||fidChanged(e,t.fid),t}async function remove(e){const t=getKey(e),n=(await getDbPromise()).transaction(S,"readwrite");await n.objectStore(S).delete(t),await n.done}async function update(e,t){const n=getKey(e),r=(await getDbPromise()).transaction(S,"readwrite"),i=r.objectStore(S),o=await i.get(n),a=t(o);return void 0===a?await i.delete(n):await i.put(a,n),await r.done,!a||o&&o.fid===a.fid||fidChanged(e,a.fid),a}async function getInstallationEntry(e){let t;const n=await update(e.appConfig,(n=>{const r=function updateOrCreateInstallationEntry(e){return clearTimedOutRequest(e||{fid:generateFid(),registrationStatus:0})}(n),i=function triggerRegistrationIfNecessary(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(T.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function registerInstallation(e,t){try{const n=await async function createInstallationRequest({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=getInstallationsEndpoint(e),i=getHeaders(e),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const a={fid:n,authVersion:"FIS_v2",appId:e.appId,sdkVersion:"w:0.6.4"},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await retryIfServerError((()=>fetch(r,s)));if(c.ok){const e=await c.json();return{fid:e.fid||n,registrationStatus:2,refreshToken:e.refreshToken,authToken:extractAuthTokenInfoFromResponse(e.authToken)}}throw await getErrorFromResponse("Create Installation",c)}(e,t);return set(e.appConfig,n)}catch(n){throw isServerError(n)&&409===n.customData.serverCode?await remove(e.appConfig):await set(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:waitUntilFidRegistration(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function waitUntilFidRegistration(e){let t=await updateInstallationRequest(e.appConfig);for(;1===t.registrationStatus;)await sleep(100),t=await updateInstallationRequest(e.appConfig);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await getInstallationEntry(e);return n||t}return t}function updateInstallationRequest(e){return update(e,(e=>{if(!e)throw T.create("installation-not-found");return clearTimedOutRequest(e)}))}function clearTimedOutRequest(e){return function hasInstallationRequestTimedOut(e){return 1===e.registrationStatus&&e.registrationTime+1e4<Date.now()}(e)?{fid:e.fid,registrationStatus:0}:e}async function generateAuthTokenRequest({appConfig:e,heartbeatServiceProvider:t},n){const r=function getGenerateAuthTokenEndpoint(e,{fid:t}){return`${getInstallationsEndpoint(e)}/${t}/authTokens:generate`}(e,n),i=getHeadersWithAuth(e,n),o=t.getImmediate({optional:!0});if(o){const e=await o.getHeartbeatsHeader();e&&i.append("x-firebase-client",e)}const a={installation:{sdkVersion:"w:0.6.4",appId:e.appId}},s={method:"POST",headers:i,body:JSON.stringify(a)},c=await retryIfServerError((()=>fetch(r,s)));if(c.ok){return extractAuthTokenInfoFromResponse(await c.json())}throw await getErrorFromResponse("Generate Auth Token",c)}async function refreshAuthToken(e,t=!1){let n;const r=await update(e.appConfig,(r=>{if(!isEntryRegistered(r))throw T.create("not-registered");const i=r.authToken;if(!t&&function isAuthTokenValid(e){return 2===e.requestStatus&&!function isAuthTokenExpired(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+36e5}(e)}(i))return r;if(1===i.requestStatus)return n=async function waitUntilAuthTokenRequest(e,t){let n=await updateAuthTokenRequest(e.appConfig);for(;1===n.authToken.requestStatus;)await sleep(100),n=await updateAuthTokenRequest(e.appConfig);const r=n.authToken;return 0===r.requestStatus?refreshAuthToken(e,t):r}(e,t),r;{if(!navigator.onLine)throw T.create("app-offline");const t=function makeAuthTokenRequestInProgressEntry(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function fetchAuthTokenFromServer(e,t){try{const n=await generateAuthTokenRequest(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await set(e.appConfig,r),n}catch(n){if(!isServerError(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await set(e.appConfig,n)}else await remove(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function updateAuthTokenRequest(e){return update(e,(e=>{if(!isEntryRegistered(e))throw T.create("not-registered");return function hasAuthTokenRequestTimedOut(e){return 1===e.requestStatus&&e.requestTime+1e4<Date.now()}(e.authToken)?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e}))}function isEntryRegistered(e){return void 0!==e&&2===e.registrationStatus}async function getToken(e,t=!1){const n=e;await async function completeInstallationRegistration(e){const{registrationPromise:t}=await getInstallationEntry(e);t&&await t}(n);return(await refreshAuthToken(n,t)).token}function getMissingValueError(e){return T.create("missing-app-config-values",{valueName:e})}const publicFactory=e=>{const t=e.getProvider("app").getImmediate(),n=function extractAppConfig(e){if(!e||!e.options)throw getMissingValueError("App Configuration");if(!e.name)throw getMissingValueError("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw getMissingValueError(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,heartbeatServiceProvider:_getProvider(t,"heartbeat"),_delete:()=>Promise.resolve()}},internalFactory=e=>{const t=e.getProvider("app").getImmediate(),n=_getProvider(t,"installations").getImmediate();return{getId:()=>async function getId(e){const t=e,{installationEntry:n,registrationPromise:r}=await getInstallationEntry(t);return r?r.catch(console.error):refreshAuthToken(t).catch(console.error),n.fid}(n),getToken:e=>getToken(n,e)}};!function registerInstallations(){t(new Component("installations",publicFactory,"PUBLIC")),t(new Component("installations-internal",internalFactory,"PRIVATE"))}(),e(w,"0.6.4"),e(w,"0.6.4","esm2017");const A="@firebase/performance",k=new ErrorFactory("performance","Performance",{"trace started":"Trace {$traceName} was started before.","trace stopped":"Trace {$traceName} is not running.","nonpositive trace startTime":"Trace {$traceName} startTime should be positive.","nonpositive trace duration":"Trace {$traceName} duration should be positive.","no window":"Window is not available.","no app id":"App id is not available.","no project id":"Project id is not available.","no api key":"Api key is not available.","invalid cc log":"Attempted to queue invalid cc event","FB not default":"Performance can only start when Firebase app instance is the default one.","RC response not ok":"RC response is not ok","invalid attribute name":"Attribute name {$attributeName} is invalid.","invalid attribute value":"Attribute value {$attributeValue} is invalid.","invalid custom metric name":"Custom metric name {$customMetricName} is invalid","invalid String merger input":"Input for String merger is invalid, contact support team to resolve.","already initialized":"initializePerformance() has already been called with different options. To avoid this error, call initializePerformance() with the same options as when it was originally called, or call getPerformance() to return the already initialized instance."}),R=new class Logger{constructor(e){this.name=e,this._logLevel=a,this._logHandler=defaultLogHandler,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in i))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?o[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,i.DEBUG,...e),this._logHandler(this,i.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,i.VERBOSE,...e),this._logHandler(this,i.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,i.INFO,...e),this._logHandler(this,i.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,i.WARN,...e),this._logHandler(this,i.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,i.ERROR,...e),this._logHandler(this,i.ERROR,...e)}}("Performance");let C,N,O,P;R.logLevel=i.INFO;class Api{constructor(e){if(this.window=e,!e)throw k.create("no window");this.performance=e.performance,this.PerformanceObserver=e.PerformanceObserver,this.windowLocation=e.location,this.navigator=e.navigator,this.document=e.document,this.navigator&&this.navigator.cookieEnabled&&(this.localStorage=e.localStorage),e.perfMetrics&&e.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=e.perfMetrics.onFirstInputDelay)}getUrl(){return this.windowLocation.href.split("?")[0]}mark(e){this.performance&&this.performance.mark&&this.performance.mark(e)}measure(e,t,n){this.performance&&this.performance.measure&&this.performance.measure(e,t,n)}getEntriesByType(e){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(e):[]}getEntriesByName(e){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(e):[]}getTimeOrigin(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)}requiredApisAvailable(){return fetch&&Promise&&function areCookiesEnabled(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}()?!!function isIndexedDBAvailable(){try{return"object"==typeof indexedDB}catch(e){return!1}}()||(R.info("IndexedDB is not supported by current browser"),!1):(R.info("Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled."),!1)}setupObserver(e,t){if(!this.PerformanceObserver)return;new this.PerformanceObserver((e=>{for(const n of e.getEntries())t(n)})).observe({entryTypes:[e]})}static getInstance(){return void 0===C&&(C=new Api(N)),C}}function getIid(){return O}function mergeStrings(e,t){const n=e.length-t.length;if(n<0||n>1)throw k.create("invalid String merger input");const r=[];for(let n=0;n<e.length;n++)r.push(e.charAt(n)),t.length>n&&r.push(t.charAt(n));return r.join("")}class SettingsService{constructor(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.flTransportEndpointUrl=mergeStrings("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o"),this.transportKey=mergeStrings("AzSC8r6ReiGqFMyfvgow","Iayx0u-XT3vksVM-pIV"),this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}getFlTransportFullUrl(){return this.flTransportEndpointUrl.concat("?key=",this.transportKey)}static getInstance(){return void 0===P&&(P=new SettingsService),P}}var M;!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.VISIBLE=1]="VISIBLE",e[e.HIDDEN=2]="HIDDEN"}(M||(M={}));const D=["firebase_","google_","ga_"],L=new RegExp("^[a-zA-Z]\\w*$");function getServiceWorkerStatus(){const e=Api.getInstance().navigator;return(null==e?void 0:e.serviceWorker)?e.serviceWorker.controller?2:3:1}function getVisibilityState(){switch(Api.getInstance().document.visibilityState){case"visible":return M.VISIBLE;case"hidden":return M.HIDDEN;default:return M.UNKNOWN}}function getEffectiveConnectionType(){const e=Api.getInstance().navigator.connection;switch(e&&e.effectiveType){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}function getAppId(e){var t;const n=null===(t=e.options)||void 0===t?void 0:t.appId;if(!n)throw k.create("no app id");return n}const F={loggingEnabled:!0};function getConfig(e,t){const n=function getStoredConfig(){const e=Api.getInstance().localStorage;if(!e)return;const t=e.getItem("@firebase/performance/configexpire");if(!t||!function configValid(e){return Number(e)>Date.now()}(t))return;const n=e.getItem("@firebase/performance/config");if(!n)return;try{return JSON.parse(n)}catch(e){return}}();return n?(processConfig(n),Promise.resolve()):function getRemoteConfig(e,t){return function getAuthTokenPromise(e){const t=e.getToken();return t.then((e=>{})),t}(e.installations).then((n=>{const r=function getProjectId(e){var t;const n=null===(t=e.options)||void 0===t?void 0:t.projectId;if(!n)throw k.create("no project id");return n}(e.app),i=function getApiKey(e){var t;const n=null===(t=e.options)||void 0===t?void 0:t.apiKey;if(!n)throw k.create("no api key");return n}(e.app),o=new Request(`https://firebaseremoteconfig.googleapis.com/v1/projects/${r}/namespaces/fireperf:fetch?key=${i}`,{method:"POST",headers:{Authorization:`FIREBASE_INSTALLATIONS_AUTH ${n}`},body:JSON.stringify({app_instance_id:t,app_instance_id_token:n,app_id:getAppId(e.app),app_version:"0.6.4",sdk_version:"0.0.1"})});return fetch(o).then((e=>{if(e.ok)return e.json();throw k.create("RC response not ok")}))})).catch((()=>{R.info("Could not fetch config, will use default configs")}))}(e,t).then(processConfig).then((e=>function storeConfig(e){const t=Api.getInstance().localStorage;if(!e||!t)return;t.setItem("@firebase/performance/config",JSON.stringify(e)),t.setItem("@firebase/performance/configexpire",String(Date.now()+60*SettingsService.getInstance().configTimeToLive*60*1e3))}(e)),(()=>{}))}function processConfig(e){if(!e)return e;const t=SettingsService.getInstance(),n=e.entries||{};return void 0!==n.fpr_enabled?t.loggingEnabled="true"===String(n.fpr_enabled):t.loggingEnabled=F.loggingEnabled,n.fpr_log_source?t.logSource=Number(n.fpr_log_source):F.logSource&&(t.logSource=F.logSource),n.fpr_log_endpoint_url?t.logEndPointUrl=n.fpr_log_endpoint_url:F.logEndPointUrl&&(t.logEndPointUrl=F.logEndPointUrl),n.fpr_log_transport_key?t.transportKey=n.fpr_log_transport_key:F.transportKey&&(t.transportKey=F.transportKey),void 0!==n.fpr_vc_network_request_sampling_rate?t.networkRequestsSamplingRate=Number(n.fpr_vc_network_request_sampling_rate):void 0!==F.networkRequestsSamplingRate&&(t.networkRequestsSamplingRate=F.networkRequestsSamplingRate),void 0!==n.fpr_vc_trace_sampling_rate?t.tracesSamplingRate=Number(n.fpr_vc_trace_sampling_rate):void 0!==F.tracesSamplingRate&&(t.tracesSamplingRate=F.tracesSamplingRate),t.logTraceAfterSampling=shouldLogAfterSampling(t.tracesSamplingRate),t.logNetworkAfterSampling=shouldLogAfterSampling(t.networkRequestsSamplingRate),e}function shouldLogAfterSampling(e){return Math.random()<=e}let B,q=1;function getInitializationPromise(e){return q=2,B=B||function initializePerf(e){return function getDocumentReadyComplete(){const e=Api.getInstance().document;return new Promise((t=>{if(e&&"complete"!==e.readyState){const handler=()=>{"complete"===e.readyState&&(e.removeEventListener("readystatechange",handler),t())};e.addEventListener("readystatechange",handler)}else t()}))}().then((()=>function getIidPromise(e){const t=e.getId();return t.then((e=>{O=e})),t}(e.installations))).then((t=>getConfig(e,t))).then((()=>changeInitializationStatus()),(()=>changeInitializationStatus()))}(e),B}function changeInitializationStatus(){q=3}let j,U=3,$=[],H=!1;function processQueue(e){setTimeout((()=>{if(0!==U)return $.length?void function dispatchQueueEvents(){const e=$.splice(0,1e3),t=e.map((e=>({source_extension_json_proto3:e.message,event_time_ms:String(e.eventTime)})));(function sendEventsToFl(e,t){return function postToFlEndpoint(e){const t=SettingsService.getInstance().getFlTransportFullUrl();return fetch(t,{method:"POST",body:JSON.stringify(e)})}(e).then((e=>(e.ok||R.info("Call to Firebase backend failed."),e.json()))).then((e=>{const n=Number(e.nextRequestWaitMillis);let r=1e4;isNaN(n)||(r=Math.max(n,r));const i=e.logResponseDetails;Array.isArray(i)&&i.length>0&&"RETRY_REQUEST_LATER"===i[0].responseAction&&($=[...t,...$],R.info("Retry transport request later.")),U=3,processQueue(r)}))})({request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:SettingsService.getInstance().logSource,log_event:t},e).catch((()=>{$=[...e,...$],U--,R.info(`Tries left: ${U}.`),processQueue(1e4)}))}():processQueue(1e4)}),e)}function transportHandler(e){return(...t)=>{!function addToQueue(e){if(!e.eventTime||!e.message)throw k.create("invalid cc log");$=[...$,e]}({message:e(...t),eventTime:Date.now()})}}function sendLog(e,t){j||(j=transportHandler(serializer)),j(e,t)}function logTrace(e){const t=SettingsService.getInstance();!t.instrumentationEnabled&&e.isAuto||(t.dataCollectionEnabled||e.isAuto)&&Api.getInstance().requiredApisAvailable()&&(e.isAuto&&getVisibilityState()!==M.VISIBLE||(!function isPerfInitialized(){return 3===q}()?getInitializationPromise(e.performanceController).then((()=>sendTraceLog(e)),(()=>sendTraceLog(e))):sendTraceLog(e)))}function sendTraceLog(e){if(!getIid())return;const t=SettingsService.getInstance();t.loggingEnabled&&t.logTraceAfterSampling&&setTimeout((()=>sendLog(e,1)),0)}function serializer(e,t){return 0===t?function serializeNetworkRequest(e){const t={url:e.url,http_method:e.httpMethod||0,http_response_code:200,response_payload_bytes:e.responsePayloadBytes,client_start_time_us:e.startTimeUs,time_to_response_initiated_us:e.timeToResponseInitiatedUs,time_to_response_completed_us:e.timeToResponseCompletedUs},n={application_info:getApplicationInfo(e.performanceController.app),network_request_metric:t};return JSON.stringify(n)}(e):function serializeTrace(e){const t={name:e.name,is_auto:e.isAuto,client_start_time_us:e.startTimeUs,duration_us:e.durationUs};0!==Object.keys(e.counters).length&&(t.counters=e.counters);const n=e.getAttributes();0!==Object.keys(n).length&&(t.custom_attributes=n);const r={application_info:getApplicationInfo(e.performanceController.app),trace_metric:t};return JSON.stringify(r)}(e)}function getApplicationInfo(e){return{google_app_id:getAppId(e),app_instance_id:getIid(),web_app_info:{sdk_version:"0.6.4",page_url:Api.getInstance().getUrl(),service_worker_status:getServiceWorkerStatus(),visibility_state:getVisibilityState(),effective_connection_type:getEffectiveConnectionType()},application_process_state:0}}const V=["_fp","_fcp","_fid"];class Trace{constructor(e,t,n=!1,r){this.performanceController=e,this.name=t,this.isAuto=n,this.state=1,this.customAttributes={},this.counters={},this.api=Api.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=`FB-PERF-TRACE-START-${this.randomId}-${this.name}`,this.traceStopMark=`FB-PERF-TRACE-STOP-${this.randomId}-${this.name}`,this.traceMeasure=r||`FB-PERF-TRACE-MEASURE-${this.randomId}-${this.name}`,r&&this.calculateTraceMetrics())}start(){if(1!==this.state)throw k.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2}stop(){if(2!==this.state)throw k.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),logTrace(this)}record(e,t,n){if(e<=0)throw k.create("nonpositive trace startTime",{traceName:this.name});if(t<=0)throw k.create("nonpositive trace duration",{traceName:this.name});if(this.durationUs=Math.floor(1e3*t),this.startTimeUs=Math.floor(1e3*e),n&&n.attributes&&(this.customAttributes=Object.assign({},n.attributes)),n&&n.metrics)for(const e of Object.keys(n.metrics))isNaN(Number(n.metrics[e]))||(this.counters[e]=Math.floor(Number(n.metrics[e])));logTrace(this)}incrementMetric(e,t=1){void 0===this.counters[e]?this.putMetric(e,t):this.putMetric(e,this.counters[e]+t)}putMetric(e,t){if(!function isValidMetricName(e,t){return!(0===e.length||e.length>100)&&(t&&t.startsWith("_wt_")&&V.indexOf(e)>-1||!e.startsWith("_"))}(e,this.name))throw k.create("invalid custom metric name",{customMetricName:e});this.counters[e]=function convertMetricValueToInteger(e){const t=Math.floor(e);return t<e&&R.info(`Metric value should be an Integer, setting the value as : ${t}.`),t}(null!=t?t:0)}getMetric(e){return this.counters[e]||0}putAttribute(e,t){const n=function isValidCustomAttributeName(e){return!(0===e.length||e.length>40)&&(!D.some((t=>e.startsWith(t)))&&!!e.match(L))}(e),r=function isValidCustomAttributeValue(e){return 0!==e.length&&e.length<=100}(t);if(n&&r)this.customAttributes[e]=t;else{if(!n)throw k.create("invalid attribute name",{attributeName:e});if(!r)throw k.create("invalid attribute value",{attributeValue:t})}}getAttribute(e){return this.customAttributes[e]}removeAttribute(e){void 0!==this.customAttributes[e]&&delete this.customAttributes[e]}getAttributes(){return Object.assign({},this.customAttributes)}setStartTime(e){this.startTimeUs=e}setDuration(e){this.durationUs=e}calculateTraceMetrics(){const e=this.api.getEntriesByName(this.traceMeasure),t=e&&e[0];t&&(this.durationUs=Math.floor(1e3*t.duration),this.startTimeUs=Math.floor(1e3*(t.startTime+this.api.getTimeOrigin())))}static createOobTrace(e,t,n,r){const i=Api.getInstance().getUrl();if(!i)return;const o=new Trace(e,"_wt_"+i,!0),a=Math.floor(1e3*Api.getInstance().getTimeOrigin());o.setStartTime(a),t&&t[0]&&(o.setDuration(Math.floor(1e3*t[0].duration)),o.putMetric("domInteractive",Math.floor(1e3*t[0].domInteractive)),o.putMetric("domContentLoadedEventEnd",Math.floor(1e3*t[0].domContentLoadedEventEnd)),o.putMetric("loadEventEnd",Math.floor(1e3*t[0].loadEventEnd)));if(n){const e=n.find((e=>"first-paint"===e.name));e&&e.startTime&&o.putMetric("_fp",Math.floor(1e3*e.startTime));const t=n.find((e=>"first-contentful-paint"===e.name));t&&t.startTime&&o.putMetric("_fcp",Math.floor(1e3*t.startTime)),r&&o.putMetric("_fid",Math.floor(1e3*r))}logTrace(o)}static createUserTimingTrace(e,t){logTrace(new Trace(e,t,!1,t))}}function createNetworkRequestEntry(e,t){const n=t;if(!n||void 0===n.responseStart)return;const r=Api.getInstance().getTimeOrigin(),i=Math.floor(1e3*(n.startTime+r)),o=n.responseStart?Math.floor(1e3*(n.responseStart-n.startTime)):void 0,a=Math.floor(1e3*(n.responseEnd-n.startTime));!function logNetworkRequest(e){const t=SettingsService.getInstance();if(!t.instrumentationEnabled)return;const n=e.url,r=t.logEndPointUrl.split("?")[0],i=t.flTransportEndpointUrl.split("?")[0];n!==r&&n!==i&&t.loggingEnabled&&t.logNetworkAfterSampling&&setTimeout((()=>sendLog(e,0)),0)}({performanceController:e,url:n.name&&n.name.split("?")[0],responsePayloadBytes:n.transferSize,startTimeUs:i,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:a})}function setupOobResources(e){getIid()&&(setTimeout((()=>function setupOobTraces(e){const t=Api.getInstance(),n=t.getEntriesByType("navigation"),r=t.getEntriesByType("paint");if(t.onFirstInputDelay){let i=setTimeout((()=>{Trace.createOobTrace(e,n,r),i=void 0}),5e3);t.onFirstInputDelay((t=>{i&&(clearTimeout(i),Trace.createOobTrace(e,n,r,t))}))}else Trace.createOobTrace(e,n,r)}(e)),0),setTimeout((()=>function setupNetworkRequests(e){const t=Api.getInstance(),n=t.getEntriesByType("resource");for(const t of n)createNetworkRequestEntry(e,t);t.setupObserver("resource",(t=>createNetworkRequestEntry(e,t)))}(e)),0),setTimeout((()=>function setupUserTimingTraces(e){const t=Api.getInstance(),n=t.getEntriesByType("measure");for(const t of n)createUserTimingTrace(e,t);t.setupObserver("measure",(t=>createUserTimingTrace(e,t)))}(e)),0))}function createUserTimingTrace(e,t){const n=t.name;"FB-PERF-TRACE-MEASURE"!==n.substring(0,"FB-PERF-TRACE-MEASURE".length)&&Trace.createUserTimingTrace(e,n)}class PerformanceController{constructor(e,t){this.app=e,this.installations=t,this.initialized=!1}_init(e){this.initialized||(void 0!==(null==e?void 0:e.dataCollectionEnabled)&&(this.dataCollectionEnabled=e.dataCollectionEnabled),void 0!==(null==e?void 0:e.instrumentationEnabled)&&(this.instrumentationEnabled=e.instrumentationEnabled),Api.getInstance().requiredApisAvailable()?function validateIndexedDBOpenable(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}().then((e=>{e&&(!function setupTransportService(){H||(processQueue(5500),H=!0)}(),getInitializationPromise(this).then((()=>setupOobResources(this)),(()=>setupOobResources(this))),this.initialized=!0)})).catch((e=>{R.info(`Environment doesn't support IndexedDB: ${e}`)})):R.info('Firebase Performance cannot start if the browser does not support "Fetch" and "Promise", or cookies are disabled.'))}set instrumentationEnabled(e){SettingsService.getInstance().instrumentationEnabled=e}get instrumentationEnabled(){return SettingsService.getInstance().instrumentationEnabled}set dataCollectionEnabled(e){SettingsService.getInstance().dataCollectionEnabled=e}get dataCollectionEnabled(){return SettingsService.getInstance().dataCollectionEnabled}}function getPerformance(e=n()){e=getModularInstance(e);return _getProvider(e,"performance").getImmediate()}function initializePerformance(e,t){e=getModularInstance(e);const n=_getProvider(e,"performance");if(n.isInitialized()){const e=n.getImmediate();if(deepEqual(n.getOptions(),null!=t?t:{}))return e;throw k.create("already initialized")}return n.initialize({options:t})}function trace(e,t){return e=getModularInstance(e),new Trace(e,t)}const factory=(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=e.getProvider("installations-internal").getImmediate();if("[DEFAULT]"!==n.name)throw k.create("FB not default");if("undefined"==typeof window)throw k.create("no window");!function setupApi(e){N=e}(window);const i=new PerformanceController(n,r);return i._init(t),i};!function registerPerformance(){t(new Component("performance",factory,"PUBLIC")),e(A,"0.6.4"),e(A,"0.6.4","esm2017")}();export{getPerformance,initializePerformance,trace};

//# sourceMappingURL=firebase-performance.js.map
