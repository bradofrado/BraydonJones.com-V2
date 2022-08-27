class Link extends Component {
    constructor(props) {
        super(props);
    }

    onClick = function(e) {

    }

    template = function() {
        return `<a class="{class}" src="{src}" @click="onClick">{children}</a>`;
    }
}