pages.project = async function(options) {
    const getProject = async function (id) {
        const data = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=odgen,US&units=imperial&APPID=90c44777a8e8b56c5560e70182b508ff');

        return data;
    }

    const project = await getProject(options.id);
    
    return `<Template image="{image}" name="{name}" description="{description}">`.component({Template}, project);
}