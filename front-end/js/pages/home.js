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
                        <p>{description}</p>
                    </div>`
        }
    }

    components = {Section, SectionImage}

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
                    <?Section name="story"/>
                    <div class="p-rl-10">
                        <?SectionImage name="experience"/>
                        <div class="image-container m-t-10 m-a">
                            <img src="/images/about-braydon.jpg">
                        </div>
                        <?SectionImage name="projects"/>
                        <div class="image-container m-t-10 m-a">
                            <img src="	https://braydonjones.com/images/hobbies/4a7faabaff4235bfae3dc8160e425c64">
                        </div>
                        <?SectionImage name="hobbies"/>
                    </div>
                </div>`
    }

    init = async function() {
        const about = await this.getAbout();
        
        if (about.story) {
            const title = "I'm a student at Brigham Young University studying Computer Science. I have many hobbies and passions.";
            let tag = '<div name="about"></div>';
            let components = {about: new Template({...about.story, size: 4, bigFont: true, switch: true, padding: false})};

            this.$story.mount({children: {tag, components}, title, class:"m-t-10"});
        }

        if (about.experience) {
            this.$experience.mount(about.experience);
        }

        if (about.projects) {
            this.$projects.mount({...about.projects, switch: true});
        }

        if (about.hobbies) {
            this.$hobbies.mount(about.hobbies);
        }
    }


};

class Section extends Component {
    constructor(props) {
        super(props);

        this.props.background = this.props.background == "none" ? '' : 'background-primary';
        this.props.size = this.props.size ? this.props.size : 1;
    }

    template = function() {
        return `<div class="info-container padding-container {background} {class}">
                    <div>
                        <h{size} class="info-title">{title}</h{size}>
                    </div>
                    {children}
                </div>`
    }
}


class SectionImage extends Template {
    constructor(props) {
        super({...props, size: 4, class:"m-t-10", bigFont: true});
    }
}