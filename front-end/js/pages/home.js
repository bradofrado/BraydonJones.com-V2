pages = {};
pages.home = class extends Component {
    constructor(props) {
        super(props);
    }

    InfoContainer  = class extends Component {
        constructor(props) {
            super(props);
        }

        template = function() {
            return `<div class="flex-split-info">
                        <h3>{name}</h3>
                        <p>{description}</p>
                    </div>`
        }
    }

    components = {Section, ImageButton}

    getAbout = async function() {
        try {
            const response = await axios.get('/api/about');

            const about = {};
            about.story = response.find(x => x.name == "My Story");
            about.experience = response.find(x => x.name == "Experience");
            about.hobbies = response.find(x => x.name == "Hobbies");
            about.projects = response.find(x => x.name == "Projects");

            return about;
        } catch {
            return [];
        }
    }

    template = function() {
        return `<div>
                    <div class="title-container">
                        <h1 class="title">Braydon Jones</h1>
                        <h2>Developer, Musician, Sports </h2>
                    </div>
                    <?Section name="section"/>
                </div>`
    }

    init = async function() {
        const about = await this.getAbout();
        
        if (about.story) {
            const title = "I'm a student at Brigham Young University studying Computer Science. I have many hobbies and passions.";
            let tag = '<div name="about"></div>';
            let components = {about: new this.InfoContainer(about.story)};

            this.$section.mount({children: {tag, components}, title, class:"m-t-10"});
        }
    }


};

class Section extends Component {
    constructor(props) {
        super(props);

        this.props.background = this.props.background == "none" ? '' : 'background-primary';
    }

    template = function() {
        return `<div class="info-container padding-container {background} {class}">
                    <div>
                        <h1 class="info-title">{title}</h1>
                    </div>
                    {children}
                </div>`
    }
}