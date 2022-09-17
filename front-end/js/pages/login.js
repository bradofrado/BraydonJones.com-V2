class Admin extends Component {
    constructor(props) {
        super(props);
    }

    template = function() {
        return `<div>You are an admin, {firstname}!</div>`
    }
}

class ProfileBody extends Component {
    constructor(props) {
        super(props);
    }
    
    components = {Admin};

    template = function() {
        if (!this.props.roles.includes('admin')) {
            return ``
        }

        return `<div><?Admin name="admin" /></div>`
    }

    init = function() {
        this.$admin && this.$admin.mount(this.props)
    }
}

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    components = {ProfileBody};

    template = function() {
        return `<div>
                    <h1>Welcome, {firstname}</h1>
                    <a href="" @click="onLogout">Logout</a>
                    <?ProfileBody name="body">
                </div>`
    }

    init = function() {
        this.$body.mount(this.props);
    }

    onLogout = function(e) {
        e.preventDefault();
        axios.delete('/api/users').then(function() {
            location.reload();
        });
    }
}

class Login extends Component {
    constructor(props) {
        super(props);

        this.onATagClick = onATagClick;
    }

    template = function() {
        return `<div>
                    <h1>Log in</h1>
                    <p>Login to Braydon Jones' website</p>
                    <div class="signin-container">
                        <form class="d-flex flex-column" @submit="onSubmit">
                            <div class="form-field">
                                <input name="username" type="text" placeholder="Username">
                            </div>
                            <div class="form-field">
                                <input name="password" type="password" placeholder="Password">
                            </div>
                            <button type="submit" class="button button-primary h-2">Log in</button>
                            <a href="/signup" class="mt-1" @click="onATagClick">Sign up</a>
                        </form>
                    </div>
                </div>`
    }

    onSubmit = function(e) {
        e.preventDefault();
        const username = this.$username.val();
        const password = this.$password.val();

        axios.post('/api/users/login', {username, password}).then(function() {
            location.reload();
        })
    }
}

pages.login = class extends Component {
    template =  function() {
                    return `<div class="login-page">
                            <?Profile name="profile"/>
                            <?Login name="login"/>
                        </div>`;
                }
    components = {Profile, Login};

    init = async function($element) {
        let user;
        try {
            user = await axios.get('/api/users');
        } catch {
        
        }

        if (user) {
            this.$profile.mount(user);
        } else {
            this.$login.mount();
        }
    }
}

//Go to the login screen on Ctrl+L
$(document).on('keydown', function(e) {
    if(e.ctrlKey && e.keyCode == ('L').charCodeAt(0)) {
        e.preventDefault();
        router.changeRoute('/login');
    }
})

pages.signup = function() {
    template = `<div class="login-page">
                        <div>
                            <h1>Sign Up</h1>
                            <div class="signin-container">
                                <form class="d-flex flex-column">
                                    <fieldset>
                                        <div class="form-field">
                                            <input type="text" name="firstname" placeholder="First Name">
                                        </div>
                                        <div class="form-field">
                                            <input type="text" name="lastname" placeholder="Last Name">
                                        </div>
                                        <div class="form-field">
                                            <input type="text" name="email" placeholder="Email">
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div class="form-field">
                                            <input type="text" name="username" placeholder="Username">
                                        </div>
                                        <div class="form-field">
                                            <input type="password" name="password" placeholder="Password">
                                        </div>
                                    </fieldset>
                                    <button type="submit" class="button button-primary">Sign Up</button>
                                    <a href="/login" class="">Log in</a>
                                </form>
                            </div>
                        </div>
                    </div>`
    const $element = $(template);
    let $form = $element.find('form');
    let $firstname = $element.find('[name="firstname"]');
    let $lastname = $element.find('[name="lastname"]');
    let $email = $element.find('[name="email"]');
    let $username = $element.find('[name="username"]');
    let $password = $element.find('[name="password"]');

    $form.on('submit', function(e) {
        e.preventDefault();
        const firstname = $firstname.val();
        const lastname = $lastname.val();
        const email = $email.val();
        const username = $username.val();
        const password = $password.val();

        axios.post('/api/users', {username, password, firstname, lastname, email}).then(function() {
            router.changeRoute('/');
        })
    });

    $element.find('a').on('click', onATagClick);

    return $element;
}