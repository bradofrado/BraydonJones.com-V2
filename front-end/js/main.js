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
        s = s.replace(`{${i}}`, arguments[i])
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

String.prototype.component = function(comps, props) {
    let s = this;

    if (props) {
        s = s.object(props, true);
    }
    
    const matchComponent = function(compName) {
        const propsRegexString = `(\\w*)="([^"]*)"\\s*`;
        const tagRegexString = `<({0})\\s*(({1})*)\\s*>`;

        const regex = new RegExp(tagRegexString.format(compName, propsRegexString), 'g');
        const propsRegex = new RegExp(propsRegexString, 'g');

        const matches = regex.execAll(s);

        const results = [];
        for (let match of matches) {
            const name = match[1];
            const propsString = match[2];

            props = {};
            const propMatches = propsRegex.execAll(propsString);
            for (let propMatch of propMatches) {
                const propName = propMatch[1];
                const propValue = propMatch[2];

                if (propValue) {
                    props[propName] = propValue;
                }
            }

            results.push({props, match: match[0]});
        }

        return results;
    }

    
    for (let compName in comps) {
        const results = matchComponent(compName);

        for (let result of results) {
            const instance = new comps[compName](result.props);

            if (!instance.render) {
                throw new Error("Instance of " + compName + " must have a render method");
            }

            s = s.replace(result.match, instance.render());
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
    const $self = $(this);
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
        url = url.length && url.startsWith('/api') ? 'http://localhost:3000' + url : url;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        });

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