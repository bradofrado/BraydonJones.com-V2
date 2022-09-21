class Template extends Component {
    constructor(props) {
        super(props);

        this.props.size = this.props.size ? this.props.size : 1;
        this.props.bigFont = this.props.bigFont ? "big" : "";
        this.props.switch = this.props.switch ? "switch" : "none";
        this.props.padding = this.props.padding ? "" : "p-l-none";
    }

    template = function() {
        return `<div class="flex-split container {class} {padding}">
                    <div class="image-container order-{switch}">
                        <img src="{image}">
                    </div>
                    <div class="info-container {padding}">
                        <h{size}>{name}</h{size}>
                        <p class="{bigFont}">{description}</p>
                    </div>
                </div>`;
    }
}