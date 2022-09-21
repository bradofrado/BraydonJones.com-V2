RegExp.prototype.execAll = function(s) {
    let match;
    let all = [];
    while ((match = this.exec(s)) != null) {
        all.push(match);
    }

    return all
}

String.prototype.format = function() {
    let s = this;

    for (let i = 0; i < arguments.length; i++) {
        s = s.replaceAll(`{${i}}`, arguments[i])
    }

    return s.toString();
}

String.prototype.object = function(obj, scrict) {
    let s = this;

    //Scrict means that anything in brackets that doesn't have an object is replaced with ''
    if (scrict) {
        let matches = /{(\w*)}/g.execAll(s);

        for (let match of matches) {
            const name = match[1];
            s = s.replaceAll(match[0], obj[name] || '')
        }
    } else {
        for (let name in obj) {
            s = s.replaceAll(`{${name}}`, obj[name])
        }
    }

    return s.toString();
}

String.prototype.event = function() {

}

String.prototype.component = function(comps, props, classes) {
    let s = this;

    if (props) {
        s = s.object(props, true);
    }
    
    const matchComponent = function(compName) {
        const propsRegexString = `(@?\\w*)="([^"]*)"\\s*`;
        const tagRegexString = `<(\\??)({0})\\s*(({1})*)\\s*\\/>`;
        const tagChildrenRegexString = `<(\\??)({0})\\s*(({1})*)\\s*>\\s*(.*)\\s*<\\/(\\??)({0})\\s*>`;

        const tagRegex = new RegExp(tagRegexString.format(compName, propsRegexString), 'g');
        const tagChildrenRegex = new RegExp(tagChildrenRegexString.format(compName, propsRegexString), 'g');
        const propsRegex = new RegExp(propsRegexString, 'g');

        let matches = tagRegex.execAll(s);
        let singleTag = true;

        if (matches.length == 0) {
            matches = tagChildrenRegex.execAll(s);
            singleTag = false;
        }

        const results = [];
        for (let match of matches) {
            const isClass = match[1] !== "";
            const tag = match[2];
            const propsString = match[3];

            props = {};
            const propMatches = propsRegex.execAll(propsString);
            for (let propMatch of propMatches) {
                const propName = propMatch[1];
                const propValue = propMatch[2];

                if (propValue) {
                    props[propName] = propValue;
                }
            }

            if (!singleTag) {
                let children = match[7];
                let closeIsClass = match[8] !== "";
                let endTag = match[9];

                if (closeIsClass != isClass) {
                    throw new Error("If tag starts (or doesn't start) with ?, it must end with the same");
                }

                if (tag !== endTag) {
                    throw new Error("Start tag must match end tag");
                }

                const childComps = {}
                const childString = children.component(comps, props, childComps);
                
                props.children = {
                    tag: childString,
                    components: childComps
                }
            }

            results.push({props, match: match[0], isClass});
        }

        return results;
    }

    let setClasses = function(name, instance, props) {
        if (classes[name]) {
            throw new Error("Instance with the name " + name + " has already been defined")
        }

        classes[name] = instance;
    }

    let nextName = 0;
    for (let compName in comps) {
        const results = matchComponent(compName);

        for (let result of results) {
            //Is class is when you put <?class> instead of <class>
            //We do not want to initialize this, just provide a place where it can be mounted (<div name=""></div>)
            if (result.isClass) {
                if (!classes) {
                    throw new Error("Must include a class object for <?class>");
                }

                if (!result.props.name) {
                    throw new Error("Must have a name on <?class>");
                }

                setClasses(result.props.name, comps[compName]);
                let $parent = `<div name="${result.props.name}"></div>`;
                s = s.replace(result.match, $parent);
            } else {
                const instance = comps[compName].render ? comps[compName] : new comps[compName](result.props);

                if (!instance.render) {
                    throw new Error("Instance of " + compName + " must have a render method");
                }

                //If the instance has a name property on it, set classes to this instance
                if (typeof classes === 'object') {
                    const name = result.props.name ? result.props.name : `${++nextName}`;
                    setClasses(name, instance);
                    let $parent = `<div name="${name}"></div>`;

                    s = s.replace(result.match, $parent);
                } else {
                    s = s.replace(result.match, instance.render());
                }
            }
        }
    }

    return s.toString();
}

Array.prototype.objects = function(s) {
    return this.map(x => s.object(x, true)).join('');
}

function isNullOrUndefined(obj) {
    var a;
    return obj === null || obj === a;
}

const onATagClick = function(e) {
    e.preventDefault();
    const $self = $(e.currentTarget);
    const href = $self.attr('href');
    router.changeRoute(href);
}

const $header = $('#header');
const header = new controls.header();
header.appendTo($header);

const $footer = $('#footer');
const footer = new controls.footer();
footer.appendTo($footer);

const handleResponse = async function(response) {
    let data;
    try {
        data = await response.json();
    } catch {

    }

    if (!response.ok) {
        throw data;
    }

    return data;
}
const axios = {
    get: async function(url) {
        url = url.length && url.startsWith('/api') ? 'http://localhost:3000' + url : url;
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
        });
        
        return await handleResponse(response);
    },
    post: async function(url, body) {
        const isFormData = body instanceof(FormData);
        body = isFormData ? body : JSON.stringify(body);
        let params = {
            method: 'POST',
            credentials: 'include',
            body: body
        }

        if (!isFormData) {
            params.headers = {
                'Content-Type': 'application/json',
            }
        }

        url = url.length && url.startsWith('/api') ? 'http://localhost:3000' + url : url;
        const response = await fetch(url, params);

        return await handleResponse(response);
    },
    put: async function(url, body) {
        const isFormData = body instanceof(FormData);
        body = isFormData ? body : JSON.stringify(body);
        let params = {
            method: 'PUT',
            credentials: 'include',
            body: body
        }

        if (!isFormData) {
            params.headers = {
                'Content-Type': 'application/json',
            }
        }

        url = url.length && url.startsWith('/api') ? 'http://localhost:3000' + url : url;
        const response = await fetch(url, params);

        return await handleResponse(response);
    },
    delete: async function(url, body) {
        url = url.length && url.startsWith('/api') ? 'http://localhost:3000' + url : url;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });

        return await handleResponse(response);
    }
}