pages.project = async function(options) {
    const getProject = async function (id) {
        const data = await axios.get('/api/projects/' + id);

        return data;
    }

    const project = await getProject(options.id);
    
    return `<Template image="{image}" name="{name}" description="{description}">`.component({Template}, project);
}