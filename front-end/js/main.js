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

    const matches = /<@\s*(\w+)\s*(((\w*)="([^"]*)"\s*)*)\s*@>/g.execAll(s);

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