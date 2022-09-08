class Component {
    scrict = true;
    
    constructor(props) {
        this.props = props;
    }

    render = function() {
        const template = this.template();

        return template.object(this.props, this.scrict);
    }

    init = function($element) {
        
    }

    appendTo = function($parent) {
        let $element = $(this.render());
        this.init($element);

        $element.appendTo($parent);
    }
}