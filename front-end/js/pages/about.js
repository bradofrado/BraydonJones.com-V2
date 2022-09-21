pages.about = (function() {
    class InfoContainer extends Component {
        constructor(props) {
            super(props);
        }

        template = function() {
            return `<div class="flex-split-info">
                        <h3>{title}</h3>
                        <p>{info}</p>
                    </div>`
        }
    }

    const getAbout = async function() {
        try {
            const response = await axios.get('/api/about');

            return response;
        } catch {
            return [];
        }
    }

    return async function() {
        const info = await getAbout();
        return `<div class="flex-split padding-container">
                    <div class="image-container">
                        <img src="/images/about-braydon.jpg">
                    </div>
                    <div class="text-container">
                        <h1>My Story</h1>
                    </div>
                </div>
                <div class="info-container padding-container background-primary">
                    <div>
                        <h1 class="info-title">I'm a student at Brigham Young University studying Computer Science.
                            I have many hobbies and passions.
                        </h1>
                    </div>
                    ${info.objects(`<InfoContainer title="{name}" info="{description}"/>`)}
                </div>`.component({InfoContainer})
    }
})()