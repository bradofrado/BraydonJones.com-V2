pages = {};
pages.home = (function() {
    const template = `<div class="title-container">
                        <h1 class="title">Braydon Jones</h1>
                        <h2>Developer, Musician, </h2>
                      </div>`;

    return function() {
        const $element = $(template);

        return $element;
    }
})();