class Template extends Component {
    constructor(props) {
        super(props);
    }

    template = function() {
        return `<div class="flex-split container">
                    <div class="image-container">
                        <img src="{image}">
                    </div>
                    <div class="">
                        <h1>{name}</h1>
                        <p>{description}</p>
                    </div>
                </div>`;
    }
}