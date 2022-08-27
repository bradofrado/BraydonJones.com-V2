pages.login = function() {
    const template =  `<div class="login-page">
                        <div>
                            <h1>Log in</h1>
                            <p>Login to Braydon Jones' website</p>
                            <div class="signin-container">
                                <form class="d-flex flex-column">
                                    <div class="form-field">
                                        <input name="username" type="text" placeholder="Username">
                                    </div>
                                    <div class="form-field">
                                        <input name="password" type="password" placeholder="Password">
                                    </div>
                                    <button type="submit" class="button button-primary h-2">Log in</button>
                                    <a href="/signup" class="mt-1">Sign up</a>
                                </form>
                            </div>
                        </div>
                    </div>`;
    let $element = $(template);
    let $form = $element.find('form');
    let $username = $element.find('[name="username"]');
    let $password = $element.find('[name="password"]');

    $form.on('submit', function(e) {
        e.preventDefault();
        const username = $username.val();
        const password = $password.val();

        axios.post('http://localhost:3000/api/users/login', {username, password}).then(function() {
            router.changeRoute('/');
        })
    });

    return $element;
}

//Go to the login screen on Ctrl+L
$(document).on('keydown', function(e) {
    if(e.ctrlKey && e.keyCode == ('L').charCodeAt(0)) {
        e.preventDefault();
        router.changeRoute('/login');
    }
})

pages.signup = function() {
    return `<div class="login-page">
                <div>
                    <h1>Sign Up</h1>
                    <div class="signin-container">
                        <form class="d-flex flex-column">
                            <fieldset>
                                <div class="form-field">
                                    <input type="text" placeholder="First Name">
                                </div>
                                <div class="form-field">
                                    <input type="text" placeholder="Last Name">
                                </div>
                                <div class="form-field">
                                    <input type="text" placeholder="Email">
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="form-field">
                                    <input type="text" placeholder="Username">
                                </div>
                                <div class="form-field">
                                    <input type="password" placeholder="Password">
                                </div>
                            </fieldset>
                            <button type="submit" class="button button-primary">Sign Up</button>
                            <a href="/login" class="">Log in</a>
                        </form>
                    </div>
                </div>
            </div>`
}