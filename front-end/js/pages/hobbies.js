pages.hobbies = async function() {
    let getHobbies = async function() {
        try {
            return await axios.get('/api/hobbies');
        } catch {
            return [];
        }
    }

    let hobbies = await getHobbies();
    
    return `<div class="container flex-grid">
                ${hobbies.objects(`<ImageButton image="{image}" label="{label}" to="/hobbies/{_id}">`)}
            </div>`.component({ImageButton});
}

pages.hobby = async function(options) {
    const getHobby = async function (id) {
        const data = await axios.get('/api/hobbies/' + id);

        return data;
    }

    const hobby = await getHobby(options.id);
    
    return `<Template image="{image}" name="{name}" description="{description}">`.component({Template}, hobby);
}