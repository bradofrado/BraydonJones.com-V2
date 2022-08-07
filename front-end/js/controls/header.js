controls = {};
controls.header = (function() {
    const template = `<nav class="navbar navbar-expand-lg navbar-dark bg-primary-dark">
                        <div class="container header-container">
                            <a class="navbar-brand" href="/">Braydon Jones</a>
                            <div class="navbar-toggler navbar-toggler-container">
                                <span class="navbar-toggler-label">Menu</span>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </div>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav"></ul>
                            </div>
                        </div>
                    </nav>`;
    const templateTab = `<li class="nav-item" id="nav-home">
                            <a class="nav-link" name="home" href="#/">Home</a>
                        </li>`;               
    return function(options) {
        const self = this;
        const $element = $(template);
        const $searchBox = $element.find('[name="citySearch"]');

        const tabs = {};

        const createMenuTab = function(text, name, path) {
            const $tab = $(templateTab);
            const $a = $tab.find('a');
            $a.attr("name", name).attr("href", `${path}`).html(text);

            $element.find('#navbarNav').find('ul').append($tab);

            tabs[path] = {text: text, name: name, active: false };
        }

        const getActiveTab = function() {
            for (let path in tabs) {
                let curr = tabs[path];

                if (curr.active) {
                    return curr;
                }
            }

            return null;
        }

        const onTabClick = function(path) {
            const newTab = tabs[path];
            const oldTab = getActiveTab();            
            
            if (oldTab) {
                $tab = $element.find(`[name="${oldTab.name}"]`);
                $tab.removeClass("active");
                oldTab.active = false;
            }

            if (newTab) {
                $tab = $element.find(`[name="${newTab.name}"]`);
                $tab.addClass("active");
                newTab.active = true;
            }

        }

        const _onSearchEnter = function() {
            const value = $searchBox.val();

            if (value === "") return;

            W.Weather.setCity(value);
        }



        const _init = function () {
            createMenuTab("Home", "home", "/");
            createMenuTab("About Me", "about", "/about")
            createMenuTab("Projects", "projects", "/projects");

            $searchBox.on('focusout', _onSearchEnter);
            $searchBox.on('keyup', function (e) {
                if (e.key === 'Enter' || e.keyCode === 13) {
                    $searchBox.blur();
                }
            });

            router.onRouteChange.subscribe(onTabClick);
        }

        const _appendTo = function($parent) {
            $element.appendTo($parent);
        }

        _init();

        $.extend(self, {
            appendTo: _appendTo
        })
    }
})();