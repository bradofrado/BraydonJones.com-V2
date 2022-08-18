class Component {
    constructor(props) {
        this.props = props;
    }

    render = function() {
        const template = this.template();

        return template.formatObject(this.props);
    }
}