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

    return function() {
        const info = [
            { title: "My Story", info: "I grew up in the small town of Mountain Green, Utah. Motivated by father's career in programming, I started coding when I was 14 and have since" },
            //{ title: "Experience", info: "I have many hobbies"}
        ];
        return `<div class="flex-split padding-container">
                    <div class="image-container">
                        <img src="/images/about-braydon.jpg">
                    </div>
                    <div class="text-container">
                        <h1>My Story</h1>
                    </div>
                </div>
                <div class="info-container padding-container">
                    <div>
                        <h1 class="info-title">I'm a student at Brigham Young University studying Computer Science.
                            I have many hobbies and passions.
                        </h1>
                    </div>
                    ${info.map(x => `<@ InfoContainer title="{title}" info="{info}" @>`.object(x)).join('')}
                </div>`.component({InfoContainer})
    }
})()