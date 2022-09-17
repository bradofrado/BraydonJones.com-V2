class Link extends Component {
    constructor(props) {
        super(props);

        this.scrict = false;
    }

    onClick = function(e) {
        e.preventDefault();
        const $self = $(e.currentTarget);
        const href = $self.attr('href');
        router.changeRoute(href);
    }

    template = function() {
        return `<a class="{class}" href="{href}" @click="onClick">{children}</a>`;
    }
}