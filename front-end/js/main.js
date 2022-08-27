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

String.prototype.object = function(obj) {
    let s = this;

    for (let name in obj) {
        s = s.replace(`{${name}}`, obj[name])
    }

    return s.toString();
}

String.prototype.component = function(comps) {
    let s = this;

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

                props[propName] = propValue;
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

    const matches = /<(\w+)\s*(((\w*)="([^"]*)"\s*)*)\s*>/g.execAll(s);

    for (let match of matches) {
        const name = match[1];
        const propsString = match[2];

        const props = {};
        const propMatches = /(\w*)="([^"]*)"\s*/g.execAll(propsString);
        for (let propMatch of propMatches) {
            const propName = propMatch[1];
            const propValue = propMatch[2];

            props[propName] = propValue;
        }

        const comp = comps[name];
        if (!comp) {
            throw new Error("Invalid component " + name);
        }

        const instance = new comp(props);

        if (!instance.render) {
            throw new Error("Instance of " + name + " must have a render method");
        }

        s = s.replace(match[0], instance.render());
    }

    return s.toString();
}

const $header = $('#header');
const header = new controls.header();
header.appendTo($header);

const $footer = $('#footer');
const footer = new controls.footer();
footer.appendTo($footer);