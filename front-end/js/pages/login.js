class EditTemplate extends Component {
    constructor(props) {
        super(props);
    }

    template = function() {
        return `<div id="editTemplate">
                    <p>Populating <span name="typeLabel">{type}</span></p>
                    <form  @submit="onSubmit">
                        <div>
                            <label>Name:</label>
                            <input name="name" />
                        </div>
                        <div>
                            <label>Description: </label>
                            <textarea name="description"></textarea>
                        </div>
                        <div>
                            <label>From:</label>
                            <input name="from" />
                        </div>
                        <div>
                            <label>To: </label>
                            <input name="to"/>
                        </div>
                        <div>
                            <input type="file" name="image"/>
                        </div>
                        <button type="submit" name="submit">Submit</button>
                        <button type="button" name="delete" @click="onDelete">Delete</button>
                        <button type="button" @click="onClear">Clear</button>
                    </form>
                </div>`
    }

    init = function() {
        this.$delete.detach();
    }

    onClear = function(e) {
        this.populate(this.props.type);
    }

    onSubmit = function(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append('name', this.$name.val());
        formData.append('description', this.$description.val());
        formData.append('from', this.$from.val());
        formData.append('to', this.$to.val());
        if (this.$image.prop('files')[0]) {
            formData.append('image', this.$image.prop('files')[0], this.$image.prop('files')[0].name);
        }

        let self = this;
        if (this.id) {
            axios.put('/api/' + this.props.type + '/' + this.id, formData).then(function(data) {
                self.populate(self.props.type);
                location.reload();
            });
        } else {
            axios.post('/api/' + this.props.type, formData).then(function(data) {
                self.populate(self.props.type);
                location.reload();
            });
        }
    }

    onDelete = function(e) {
        if (!this.id) {
            throw new Error("No id to delete");
        }

        let self = this;
        axios.delete('/api/' + this.props.type + '/' + this.id).then(function(data) {
            self.populate(self.props.type);
            location.reload();
        })
    }

    populate = function(type, item) {
        item = $.extend({name: '', description: '', to: '', from: '', _id: null}, item);
        this.props.type = type;
        this.$typeLabel.html(type);
        this.$name.val(item.name);
        this.$description.val(item.description);
        this.$from.val(item.from);
        this.$to.val(item.to);

        this.id = item._id;

        if (this.id) {
            this.$delete.insertAfter(this.$submit);
        } else {
            this.$delete.detach();
        }
    }
}

class EditTemplateButton extends Component {
    constructor(props) {
        super(props);
    }

    components = {ImageButton}

    template = function() {
        return `<div class="m-2">
                    <ImageButton label="{name}" @click="onClick"/>
                </div>`;
    }

    onClick = function(e) {
        $(this).trigger('click', [this.props]);
    }
}

class EditTemplateList extends Component {
    constructor(props) {
        super(props);
    }

    template = function() {
        return `<div>
                    <h2>{type}</h2>
                    <div name="container" class="d-flex"></div>
                </div>`;
    }

    init = async function($element) {
        const createButton = function(item) {
            const instance = new EditTemplateButton(item);
            $(instance).on('click', this.onEditClick.bind(this));
            instance.appendTo(this.$container);
        }.bind(this);

        const response = await axios.get('/api/' + this.props.type);

        for (let item of response) {
            createButton(item);
        }

        //Add the new button
        createButton({name: "New " + this.props.type, _id: null});
    }

    onEditClick = function(e, item) {
        $(this).trigger('click', [this.props.type, item]);
    }
}

class Admin extends Component {
    constructor(props) {
        super(props);
    }

    components = {EditTemplate, EditTemplateList};

    template = function() {
        return `<div>
                    <p>You are an admin, {firstname}!</p>
                    <EditTemplate name="edit" type="projects"/>
                    <EditTemplateList type="projects" @click="onTemplateClick"/>
                    <EditTemplateList type="experience" @click="onTemplateClick"/>
                    <EditTemplateList type="hobbies" @click="onTemplateClick"/>
                </div>`
    }

    onTemplateClick = function(e, type, item) {
        this.$edit.populate(type, item);
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
        return `<div class="container">
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