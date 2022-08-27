pages.experiences = function() {
    const experience = [
        {image: "/images/about-braydon.jpg", label: "Hello", id: "0"},
        {image: "/images/about-braydon.jpg", label: "Hello", id: "1"},
        {image: "/images/about-braydon.jpg", label: "Hello", id: "2"},
        {image: "/images/about-braydon.jpg", label: "Hello", id: "3"},
    ];
    
    return `<div class="container flex-grid">
                ${experience.objects(`<ImageButton image="{image}" label="{label}" to="/experience/{id}">`)}
            </div>`.component({ImageButton});
}

pages.experience = async function(options) {
    const getExperience = async function (id) {
        const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=odgen,US&units=imperial&APPID=90c44777a8e8b56c5560e70182b508ff');

        return data;
    }

    const experience = await getExperience(options.id);
    
    return `<Template image="{image}" name="{name}" description="{description}">`.component({Template}, experience);
}