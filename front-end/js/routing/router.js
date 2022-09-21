router = (function () {
    const routers = {};
    const views = {};

    RegExp.prototype.execAll = function(s) {
        let match;
        let all = [];
        while ((match = this.exec(s)) != null) {
            all.push(match);
        }

        return all
    }

    String.prototype.betweenAll = function(s1, s2) {
        let s = this;
        let regex = new RegExp(`${s1}[^${s1}${s2}]*${s2}`, 'mg');
        return regex.execAll(s).map(x => x[0].substring(1,x[0].length - 1));
    }

    let keyValuesToObject = function(keys, values) {
        let result = {};
        for (let i = 0; i < keys.length; i++)
        {
            result[keys[i]] = values[i];
        }

        return result;
    }

    let getParamNames = function (optionalRoute) {
        //Get all of the expressions with {...}
        const re = /{[^{}]*}/mg
        const a = re.execAll(optionalRoute);

        //Get rid of the { and } characters
        const b = a.map(x => x[0].substring(1,x[0].length - 1));

        return optionalRoute.betweenAll('{', '}');
    }

    let getParamValues = function (path, paramPath) {
        let withoutParams = paramPath.split(/{.*}/);

        for (let i = 0; i < withoutParams.length; i++)
        {
            const re = new RegExp(withoutParams[i]);
            const e = re.exec(path);
            path = path.replace(e[0], '');
        }
        path ='/' + path.replace('/', '//') + '/';

        //return everything in between the / and / characters
        return path.betweenAll('/', '/');
    }

    let findOptionalRoute = function(path) {
        const optionalRoutes = Object.keys(routers).filter(route => route.includes("{") && route.includes("}"));

        if (optionalRoutes.length === 0)
        {
            return null;
        }

        for (let i = 0; i < optionalRoutes.length; i++)
        {
            const _path = optionalRoutes[i];

            const regex = new RegExp(_path.replaceAll(/{.*}/g, '.*').replaceAll('/', '\/'));

            const e = regex.exec(path);
            if (e != null)
            {
                let paramNames = getParamNames(_path);
                let paramValues = getParamValues(path, _path);

                let route = routers[Object.keys(routers).find(r => r === _path)];
                let view = views[Object.keys(views).find(view => view === route.name)];

                if (view === null)
                {
                    view = {content: route.content}
                }

                return {...view, options: keyValuesToObject(paramNames, paramValues)};
            }
        }
    }

    let saveState = function(path) {
        const state = window.history.state;
        window.history.pushState(state, '', path);
    }

    let getContent = async function(content, options) {
        if (typeof content === 'function' && content.toString().startsWith('class')) {
            return new content(options);
        }

        content = content(options);
        
        if (typeof content === "string") {
            content = $(content);
        }

        if (content.then) {
            next = await content;
            
            if (typeof next === 'string') {
                return $(next);
            }
            
            return next;
        }

        return content;
    }
    
    this.view = function(name, id, templateFunction, path) {
        views[name] = {content: templateFunction, id: id};
    
        if (path) {
            this.route(path, name);
        }
    }
    
    this.route = function(path, template) {
        if (path[0] != "/")
        {
            throw "All paths must start with /";
        }

        if (typeof template === "function")
        {
            routers[path] = {content: template};
        }
        else if (typeof template === "string")
        {
            routers[path] = {content: views[template].content, name: template};
        }
    }
    
    this.router = async function() {
        const path = window.location.pathname || "/";
    
        let route = routers[path];
        let view;

        //If this route doesn't exit, return the 404 error page
        if (route === undefined) {
            view = findOptionalRoute(path);

            if (view == null) {
                view = views['404'];
                route = null;
            }            
        }
        else {
            //Try and get the view that has this route
            let viewName = route.name;

            //If there is no view with this route, just return the route content
            if (viewName === undefined)
            {
                view = {content: route.content};
            }
            //Otherwise return the view
            else {
                view = views[viewName];
            }
        }    
        
        router.onRouteChange.call(path);
    
        const id = view.id ? view.id : '#app';

        $(id).html(views.loading.content());
        const content = await getContent(view.content, view.options);
        
        $(id).html('');
        content.appendTo($(id));        
    }

    this.view('404', null, function () {
        return `<div>
                    <h1>404 File Not Found</h1>
                    <p>Sorry, the file you are looking for does not exist</p>
                </div`
    });

    this.view('loading', null, function() {
        return `<div class="container">
                    <h1>Loading</h1>
                </div>`
    })

    this.view('home', null, function () {
        return "<h1>Home</h1>";
    })
    
    this.route('/', 'home');
    
    this.route('/index.html', 'home');

    this.route('/home', 'home');

    window.addEventListener('load', this.router);
    window.addEventListener('popstate', this.router);    
});

let r = new router();

router.view = function(name, id, templateFunction, path) {
    r.view(name, id, templateFunction, path);
}

router.path = function(path, template, id) {
    r.path(path, template, id);
}

router.route = function () {
    r.router();
}

router.changeRoute = function(path) {
    if (path !== window.location.pathname) {
        const state = window.history.state;
        window.history.pushState(state, '', path);
        r.router();
    }
}

router.handleRouteChange = function () {
    let subscriptions = [];

    let _subscribe = function (f) {
        subscriptions.push(f);
    }

    let _call = function (path) {
        for (let f of subscriptions) {
            f(path);
        }
    }

    $.extend(this, {
        subscribe: _subscribe,
        call: _call
    });
};
let h = new router.handleRouteChange();

router.onRouteChange = h;