pages.experiences = async function() {
    let getExperience = async function() {
        try {
            return await axios.get('/api/experience');
        } catch {
            return [];
        }
    }

    let experience = await getExperience();
    
    return `<div class="container flex-grid">
                ${experience.objects(`<ImageButton image="{image}" label="{label}" to="/experience/{_id}"/>`)}
            </div>`.component({ImageButton});
}

pages.experience = async function(options) {
    const getExperience = async function (id) {
        const data = await axios.get('/api/experience/' + id);

        return data;
    }

    const experience = await getExperience(options.id);
    
    return `<Template image="{image}" name="{name}" description="{description}"/>`.component({Template}, experience);
}