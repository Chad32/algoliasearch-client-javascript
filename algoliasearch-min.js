var AlgoliaSearch=function(d,c,e,b){this.applicationID=d;this.apiKey=c;if(this._isUndefined(b)){b=[d+"-1.algolia.io",d+"-2.algolia.io",d+"-3.algolia.io"]}this.hosts=[];for(var a=0;a<b.length;++a){if(Math.random()>0.5){this.hosts.reverse()}if(!this._isUndefined(e)&&(e==="https"||e==="HTTPS")){this.hosts.push("https://"+b[a])}else{this.hosts.push("http://"+b[a])}}if(Math.random()>0.5){this.hosts.reverse()}};AlgoliaSearch.prototype={deleteIndex:function(b,c){var a=this;this._jsonRequest({method:"DELETE",url:"/1/indexes/"+encodeURIComponent(b),callback:c})},moveIndex:function(d,c,e){var a={operation:"move",destination:c};var b=this;this._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(indexName)+"/operation",body:a,callback:e})},copyIndex:function(d,c,e){var a={operation:"copy",destination:c};var b=this;this._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(indexName)+"/operation",body:a,callback:e})},getLogs:function(d,c,b){var a=this;if(this._isUndefined(c)){c=0}if(this._isUndefined(b)){b=10}this._jsonRequest({method:"GET",url:"/1/logs?offset="+c+"&length="+b,callback:d})},listIndexes:function(b){var a=this;this._jsonRequest({method:"GET",url:"/1/indexes/",callback:b})},initIndex:function(a){return new this.Index(this,a)},listUserKeys:function(b){var a=this;this._jsonRequest({method:"GET",url:"/1/keys",callback:b})},getUserKeyACL:function(a,c){var b=this;this._jsonRequest({method:"GET",url:"/1/keys/"+a,callback:c})},deleteUserKey:function(a,c){var b=this;this._jsonRequest({method:"DELETE",url:"/1/keys/"+a,callback:c})},addUserKey:function(c,d){var b=this;var a=new Object();a.acl=c;this._jsonRequest({method:"POST",url:"/1/keys",body:a,callback:d})},addUserKeyWithValidity:function(d,b,e){var c=this;var a=new Object();a.acl=d;this._jsonRequest({method:"POST",url:"/1/indexes/"+c.indexName+"/keys",body:a,callback:e})},startQueriesBatch:function(){this.batch=[]},addQueryInBatch:function(d,b,a){var c="query="+b;if(!this._isUndefined(a)&&a!=null){c=this._getSearchParams(a,c)}this.batch.push({indexName:d,params:c})},sendQueriesBatch:function(f,b){var a=this;var e={requests:[],apiKey:this.apiKey,appID:this.applicationID};for(var c=0;c<a.batch.length;++c){e.requests.push(a.batch[c])}window.clearTimeout(a.onDelayTrigger);if(!this._isUndefined(b)&&b!=null&&b>0){var d=window.setTimeout(function(){a._sendQueriesBatch(e,f)},b);a.onDelayTrigger=d}else{this._sendQueriesBatch(e,f)}},Index:function(a,b){this.indexName=b;this.as=a},_sendQueriesBatch:function(a,b){this._jsonRequest({cache:this.cache,method:"POST",url:"/1/indexes/*/queries",body:a,callback:b})},_jsonRequest:function(d){var c=this;var f=d.callback;var b=null;var e=d.url;if(!this._isUndefined(d.body)){e=d.url+"_body_"+JSON.stringify(d.body)}if(!this._isUndefined(d.cache)){b=d.cache;if(!this._isUndefined(b[e])){if(!this._isUndefined(f)){f(true,b[e])}return}}var a=function(h){var g=0;if(!this._isUndefined(h)){g=h}if(c.hosts.length<=g){if(!this._isUndefined(f)){f(false,{message:"Cannot contact server"})}return}d.callback=function(j,l,k,i){if(!l&&!this._isUndefined(i)){console.log("Error: "+i.message)}if(!this._isUndefined(d.cache)){b[e]=i}if(!l&&j&&(g+1)<c.hosts.length){a(g+1)}else{if(!this._isUndefined(f)){f(l,i)}}};d.hostname=c.hosts[g];c._jsonRequestByHost(d)};a()},_jsonRequestByHost:function(d){var a=null;if(!this._isUndefined(d.body)){a=JSON.stringify(d.body)}var c=d.hostname+d.url;var b=null;b=new XMLHttpRequest();if("withCredentials" in b){b.open(d.method,c,true);b.setRequestHeader("X-Algolia-API-Key",this.apiKey);b.setRequestHeader("X-Algolia-Application-Id",this.applicationID);if(a!=null){b.setRequestHeader("Content-type","application/json")}}else{if(typeof XDomainRequest!="undefined"){b=new XDomainRequest();b.open(d.method,c)}else{console.log("your browser is too old to support CORS requests")}}b.send(a);b.onload=function(f){if(!this._isUndefined(f)){var e=(f.target.status==0||f.target.status==503);var g=(f.target.status===200||f.target.status===201);d.callback(e,g,f.target,f.target.response!=null?JSON.parse(f.target.response):null)}else{d.callback(false,true,f,JSON.parse(b.responseText))}};b.onerror=function(e){d.callback(true,false,null,{message:"Could not connect to Host"})}},_getSearchParams:function(a,c){if(this._isUndefined(a)||a==null){return c}for(var b in a){if(b!=null&&a.hasOwnProperty(b)){c+=(c.length==0)?"?":"&";c+=b+"="+encodeURIComponent(a[b])}}return c},_isUndefined:function(a){return a===void 0},applicationID:null,apiKey:null,hosts:[],cache:{}};AlgoliaSearch.prototype.Index.prototype={addObject:function(b,d,c){var a=this;if(this.as._isUndefined(c)){this.as._jsonRequest({action:"addObject",url:"/1/indexes/"+encodeURIComponent(a.indexName),body:b,callback:d})}else{this.as._jsonRequest({method:"PUT",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/"+encodeURIComponent(c),body:b,callback:d})}},addObjects:function(e,f){var d=this;var a={requests:[]};for(var b=0;b<e.length;++b){var c={action:"addObject",body:e[b]};a.requests.push(c)}this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(d.indexName)+"/batch",body:a,callback:f})},getObject:function(f,e,a){var c=this;var d="";if(!this.as._isUndefined(a)){d="?attributes=";for(var b=0;b<a.length;++b){if(b!=0){d+=","}d+=a[b]}}this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(c.indexName)+"/"+encodeURIComponent(f)+d,callback:e})},partialUpdateObject:function(c,b){var a=this;this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/"+encodeURIComponent(c.objectID)+"/partial",body:c,callback:b})},saveObject:function(a,c){var b=this;this.as._jsonRequest({method:"PUT",url:"/1/indexes/"+encodeURIComponent(b.indexName)+"/"+encodeURIComponent(a.objectID),body:a,callback:c})},saveObjects:function(e,f){var d=this;var a={requests:[]};for(var b=0;b<e.length;++b){var c={action:"updateObject",objectID:encodeURIComponent(e[b].objectID),body:e[b]};a.requests.push(c)}this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(d.indexName)+"/batch",body:a,callback:f})},deleteObject:function(c,b){if(c==null||c.length==0){b(false,{message:"empty objectID"});return}var a=this;this.as._jsonRequest({method:"DELETE",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/"+encodeURIComponent(c),callback:b})},search:function(e,g,b,a){var d=this;var f="query="+encodeURIComponent(e);if(!this.as._isUndefined(b)&&b!=null){f=this.as._getSearchParams(b,f)}window.clearTimeout(d.onDelayTrigger);if(!this.as._isUndefined(a)&&a!=null&&a>0){var c=window.setTimeout(function(){d._search(f,g)},a);d.onDelayTrigger=c}else{this._search(f,g)}},waitTask:function(a,c){var b=this;this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(b.indexName)+"/task/"+a,callback:function(e,d){if(e&&d.status==="published"){c(true,d)}else{if(e&&d.pendingTask){return b.waitTask(a,c)}else{c(false,d)}}}})},getSettings:function(b){var a=this;this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/settings",callback:b})},setSettings:function(a,c){var b=this;this.as._jsonRequest({method:"PUT",url:"/1/indexes/"+encodeURIComponent(b.indexName)+"/settings",body:a,callback:fcallback})},listUserKeys:function(b){var a=this;this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(a.indexName)+"/keys",callback:b})},getUserKeyACL:function(a,c){var b=this;this.as._jsonRequest({method:"GET",url:"/1/indexes/"+encodeURIComponent(b.indexName)+"/keys/"+a,callback:c})},deleteUserKey:function(a,c){var b=this;this.as._jsonRequest({method:"DELETE",url:"/1/indexes/"+encodeURIComponent(b.indexName)+"/keys/"+a,callback:c})},addUserKey:function(c,d){var b=this;var a=new Object();a.acl=c;this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(b.indexName)+"/keys",body:a,callback:d})},addUserKeyWithValidity:function(d,b,e){var c=this;var a=new Object();a.acl=d;a.validity=b;this.as._jsonRequest({method:"POST",url:"/1/indexes/"+encodeURIComponent(c.indexName)+"/keys",body:a,callback:e})},_search:function(a,b){this.as._jsonRequest({cache:this.cache,method:"POST",url:"/1/indexes/"+encodeURIComponent(this.indexName)+"/query",body:{params:a,apiKey:this.as.apiKey,appID:this.as.applicationID},callback:b})},as:null,indexName:null,cache:{},emptyConstructor:function(){}};