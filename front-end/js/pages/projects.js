pages.projects = async function() {
    let getProjects = async function() {
        try {
            return await axios.get('/api/projects');
        } catch {
            return [];
        }
    }

    let projects = await getProjects();

    return `<div class="container flex-grid">
                ${projects.objects(`<ImageButton image="{image}" label="{label}" to="/projects/{_id}">`)}
            </div>`.component({ImageButton});
}