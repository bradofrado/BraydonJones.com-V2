String.prototype.format = function() {
    let s = this;

    for (let i = 0; i < arguments.length; i++) {
        s = s.replace(`{${i}}`, arguments[i])
    }

    return s.toString();
}

String.prototype.formatObject = function(obj) {
    let s = this;

    for (let name in obj) {
        s = s.replace(`{${name}}`, obj[name])
    }

    return s.toString();
}

const $header = $('#header');
const header = new controls.header();
header.appendTo($header);

const $footer = $('#footer');
const footer = new controls.footer();
footer.appendTo($footer);