class Component {
    scrict = true;
    
    constructor(props) {
        this.props = props;

        this.refs = {};
    }

    //Binds the events (<button @click="onClick">)
    // and assigns any element with a name attribute to this.${name}
    #bindEvents = function($element) {
        if ($element.nodeType === 3) return;

        for (var attr of $element.attributes) {
            if (attr.name.startsWith('@')) {
                let name = attr.name.substring(1);
                if (!this[attr.value]) {
                    throw new Error("Cannot find function " + attr.value);
                }
                
                $($element).on(name, this[attr.value].bind(this));
            }

            if (attr.name === 'name') {
                let name = '$' + attr.value;
                this[name] = $($element);
            }
        }

        for (var child of $element.childNodes) {
            this.#bindEvents(child);
        }
    }

    #bindComponentEvents = function(components) {
        //Bind the events on components
        for (let name in components) {
            const instance = components[name];
            if (instance.props) {
                for (let propName in instance.props) {
                    if (propName.startsWith('@')) {
                        let propValue = instance.props[propName];
                        let name = propName.substring(1);
                        $(instance).on(name, this[propValue].bind(this));

                        delete instance.props[propName];
                    }
                }
            }
        }
    }

    //Any reference to a component object with a name attribute is delt with here
    #setClasses = function($element) {
        //This is the wrapper object for an uninstantiated class that.
        //  it holds the information of where to mount it to the DOM
        //  Mount and instantiate it by calling the .mount(props) method
        let mountableObject = function(name, comp, $parent) {
            this.mount = function(props) {
                //Initialize the component with the props
                this[name] = new comp(props);

                //Put the component where it belongs in the dom
                this[name].appendTo($parent);

                //Get rid of the parent div where this component now belongs
                $parent.children().unwrap();
            }
        }

        //if we have made references to other classes or objects, then add those here
        for (let name in this.refs) {
            let _name = '$' + name;
            
            //<ProfileBody name="body"/> would satisy this senario.
            //The instance of ProfileBody would be referenced at this.$body
            if (typeof this.refs[name] === 'object') {
                this[_name] = this.refs[name];
            //<?ProfileBody name="body"/> would satisy this senario.
            //The class (not instantiated) of ProfileBody would be referenced at this.$body
            //To mount it in the DOM, do this.$body.mount(props) which instantiates it
            } else {
                let $parent = $element.find(`[name="${name}"]`);
                
                //If the name attribute is on the root node, make the root the parent
                if ($parent.length == 0 && $element.attr('name') == name) {
                    $parent = $element;
                }
                this[_name] = new mountableObject(_name, this.refs[name], $parent);
                this[_name].mount = this[_name].mount.bind(this);
            }
        }
    }

    render = function() {
        let template = this.template().object(this.props, this.scrict);

        if (this.components) {
            template = template.component(this.components, null, this.refs);
        }

        return template;
    }

    init = function($element) {
        //Mount all of the references to objects
        for (let name in this.refs) {
            let _name = '$' + name;
            let $parent = $element.find(`[name="${name}"]`);

            this[_name].appendTo($parent);

            $parent.children().unwrap();
        }
    }

    appendTo = function($parent) {
        let $element = $(this.render());

        this.#bindEvents($element[0]);
        this.#bindComponentEvents(this.refs);
        this.#setClasses($element);

        
        
        let p = this.init($element);
        this.$root = $element;

        if (p && p.then) {
            p.then(() => $element.appendTo($parent))
        } else {
            $element.appendTo($parent);
        }
    }
}