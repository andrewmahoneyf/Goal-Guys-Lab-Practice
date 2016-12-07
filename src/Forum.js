import React from 'react';
import firebase from 'firebase';
// import Time from 'react-time';

class ForumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                // console.log('Auth state changed: logged in as', user.email);
                this.setState({userId:user.uid});
            } else {
                // console.log('Auth state changed: logged out');
                this.setState({userId: null});
            }
        })
    }

    signUp(email, password, username) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(firebaseUser) {
                var profilePromise = firebaseUser.updateProfile({
                    displayName: username
                });

                var userRef = firebase.database().ref('users/'+firebaseUser.uid);
                var userData = {
                    username: username
                }
                var userPromise = userRef.set(userData);
                return Promise.all(profilePromise, userPromise);
            })
            .then(() => this.forceUpdate())
            .catch((err) => console.log(err));
    }

    signIn(email, password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((err) => console.log(err));
    }

    signOut() {
        firebase.auth().signOut();
    }

    render() {
        var content = null;

        if(!this.state.userId) {
            content = <SignUpForm signUpCallback={this.signUp} signInCallback={this.signIn} />;
        } else {
            content = (<div><Messages /><PostedMessages /></div>);
        }

        return (
             <div> 
                <header className="container-fluid">
                    {this.state.userId &&
                        <div className="logout">
                            <button className="btn btn-warning" onClick={() => this.signOut()}>Sign Out {firebase.auth().currentUser.username}</button>
                        </div>
                    }
                </header> 
                <h2>Forum</h2>

                <main className="container">
                    {content}
                </main>
            </div>
        );
    }
}


class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {post: ''};
    }

    updatePost(event) {
        this.setState({post: event.target.value});
    }

    postMessage(event) {
        event.preventDefault();

        var messages = firebase.database().ref('message');
        var newMessage = {
            text: this.state.post,
            userId: firebase.auth().currentUser.uid
           // time: firebase.database.ServerValue.TIMESTAMP
        };
        messages.push(newMessage);

        this.setState({post:''});
    }

    render() {
        var currentUser = firebase.auth().currentUser;

        return (
            <div className="message-box write-message">
                <p className="username">{currentUser.username}</p>

                <form className="message-input" role="form">
                    <textarea name="text" value={this.state.post} className="form-control" onChange={(e) => this.updatePost(e)}></textarea>
                    <div className="form-group send-message">
                        <button className="btn btn-primary"
                            disabled={this.state.post.length === 0}
                            onClick={(e) => this.postMessage(e)}>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

class PostedMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
    }

    componentDidMount() {
        var users = firebase.database().ref('users');
        users.on('value', (snapshot) => {
            this.setState({users:snapshot.val()});
        });

        var messages = firebase.database().ref('message');
        messages.on('value', (snapshot) => {
            var messageList = [];
            snapshot.forEach(function(item) {
                var singleMessage = item.val();
                singleMessage.key = item.key;
                messageList.push(singleMessage);
            });
            messageList.sor((a,b) => b.time - a.time);
            this.setState({messagePosts: messageList});
        });
    }

    componentWillUnmount() {
        firebase.database().ref('users').off();
        firebase.database().ref('message').off();
    }

    render() {
        if(!this.state.users) {
            return null;
        }

        var messageObjects = this.state.messages.map((singleMessage) => {
            return <MessageItem singleMessage={singleMessage}
                                user={this.state.users[singleMessage.userId]}
                                key={singleMessage.key} />
        })

        return (<div>{messageObjects}</div>);
    }
}

class MessageItem extends React.Component {
    favoriteMessage() {
        var messageFavorite = firebase.database().ref('messages/'+this.props.singleMessage.key+'/favorites');
        var userId = firebase.auth().currentUser.uid
        var favorite = this.props.singleMessage.favorites || {};
        if (favorite && favorite[userId]) {
            favorite[userId] = null;
        } else {
            favorite[userId] = true;
        }

        messageFavorite.set(favorite)
    }

       //             <span className="time"><Time value={this.props.singleMessage.time} relative/></span>
    render() {
        var favorited = false;
        var numFavorites = 0;
        if(this.props.singleMessage.favorites) {
            numFavorites = Object.keys(this.props.singleMessage.favorites).length;
            if(this.props.singleMessage.favorites[firebase.auth().currentUser.uid])
                favorited = true;
        }

        return (
            <div className="message-box">
                <div>
                    <span className="username">{this.props.user.username}</span>

                </div>
                <div className="singleMessage">{this.props.singleMessage.text}</div>
                <div className="favorites">
                    <i className={'fa fa-star '+(favorited ? 'user-liked': '')} onClick={() => this.favoriteMessage()}></i>
                    <span>{numFavorites}</span>
                </div>
            </div>
        );
    }
}

MessageItem.propTypes = {
    singleMessage: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
}; 

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': undefined,
            'password': undefined,
            'username': undefined
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var field = event.target.name;
        var value = event.target.value;

        var changes = {};
        changes[field] = value;
        this.setState(changes);
    }

    signUp(event) {
        event.preventDefault;
        this.props.signUpCallback(this.state.email, this.state.password, this.state.username);
    }

    signIn(event) {
        event.preventDefault;
        this.props.signInCallback(this.state.email, this.state.password);
    }

    validate(value, validations) {
        var errors = {isValid: true, style:''};

        if(value !== undefined) {
            if(validations.required && value === '') {
                errors.required = true;
                errors.isValid = false;
            }

            if(validations.minLength && value.length < validations.minLength) {
                errors.minLength = validations.minLength;
                errors.isValid = false;
            }

            if(validations.email) {
                var valid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
                if(!valid) {
                    errors.email = true;
                    errors.isValid = false;
                }
            }
        }

        if(!errors.isValid) {
            errors.style = 'has-error';
        } else if (value !== undefined) {
            errors.style = 'has-success';
        } else {
            errors.isValid = false;
        }
        return errors;
    }

    render() {
        var emailErrors = this.validate(this.state.email, {required:true, email:true});
        var passwordErrors = this.validate(this.state.password, {required:true, minLength:6});
        var usernameErrors = this.validate(this.state.username, {required:true, minLength:3});

        var signUpEnabled = (emailErrors.isValid && passwordErrors.isValid && passwordErrors.isValid);
        var signInEnabled = (emailErrors.isValid && passwordErrors.isValid);

        return (
            <form role="form" className="sign-up-form">
                <ValidatedInput field="email" type="email" label="Email" changeCallback={this.handleChange} errors={emailErrors} />
                <ValidatedInput field="password" type="password" label="Password" changeCallback={this.handleChange} errors={passwordErrors} />
                <ValidatedInput field="username" type="text" label="Username" changeCallback={this.handleChange} errors={usernameErrors} />
                <div className="form-group sign-up-buttons">
                    <button className="btn btn-primary" disabled={!signUpEnabled} onClick={(e) => this.signUp(e)}>Sign Up</button>
                    <button className="btn btn-primary" disabled={!signInEnabled} onClick={(e) => this.signIn(e)}>Sign In</button>
                </div>
            </form>
        )
    }
}

SignUpForm.propTypes = {
    signUpCallback: React.PropTypes.func.isRequired,
    signInCallback: React.PropTypes.func.isRequired
};

class ValidatedInput extends React.Component {
    render() {
        return (
            <div className={"form-group "+this.props.errors.style}>
                <label htmlFor={this.props.field} className="control-label">{this.props.label}</label>
                <input id={this.props.field} type={this.props.type} name={this.props.field} className="form-control" onChange={this.props.changeCallback} />
                <ValidationErrors errors={this.props.errors} />
            </div>
        );
    }
}

class ValidationErrors extends React.Component {
    render() {
        return (
            <div>
                {this.props.errors.required &&
                    <p className="help-block">Required!</p>
                }
                {this.props.errors.email &&
                    <p className="help-block">Not an email address!</p>
                }
                {this.props.errors.minLength &&
                    <p className="help-block">Must be at least {this.props.errors.minLength} characters.</p>        
                }
            </div>
        );
    }
}
export { ForumPage };