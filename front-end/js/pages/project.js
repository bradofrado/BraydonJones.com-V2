pages.project = async function(options) {
    const getProject = async function (id) {
        try {
            const data = await axios.get('/api/projects/' + id);

            return data;
        } catch {
            return null
        }
    }

    const project = await getProject(options.id);

    if (project == null) {
        return '<div>Sorry the page you are looking for does not exist</div>'
    }
    
    return `<Template image="{image}" name="{name}" description="{description}"/>`.component({Template}, project);
}