pages.projects = function() {
    const projects = [
        {image: "/images/about-braydon.jpg", label: "Hello", id: "0"},
        {image: "/images/about-braydon.jpg", label: "Hello", id: "1"},
        {image: "/images/about-braydon.jpg", label: "Hello", id: "2"},
        {image: "/images/about-braydon.jpg", label: "Hello", id: "3"},
    ];

    return `<div class="container flex-grid">
                ${projects.objects(`<ImageButton image="{image}" label="{label}" to="/projects/{id}">`)}
            </div>`.component({ImageButton});
}