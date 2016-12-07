import React from 'react';
import firebase from 'firebase';

class ForumPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.setState({userId:user.uid});
            } else {
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

        if(!this.state.userId) { // if the user isn't signed in
            content = <SignUpForm signUpCallback={this.signUp} signInCallback={this.signIn} />;
        } else { // if the user is signed in
            content = (<div><Messages /><PostedMessages /></div>);
        }

        return (
             <div> 
                <header className="container-fluid">
                    {this.state.userId &&
                        <div className="logout">
                            <button className="btn btn-default" onClick={() => this.signOut()}>Sign Out {firebase.auth().currentUser.username}</button>
                        </div>
                    }
                </header> 
                <h2>Share Your Thoughts</h2>

                <main className="container">
                    {content}
                </main>
            </div>
        );
    } 
} 

// keeps track of message box
class Messages extends React.Component {
   constructor(props) {
        super(props);
        this.state = {post:''};
    }

    updatePost(event) {
        this.setState({post: event.target.value});
    }

    postMessage(event) {
        event.preventDefault();

        var messagesRef = firebase.database().ref('message'); // adds this element into JOITC
        var newMessage = { // creates the message with its fields
            text: this.state.post,
            userId: firebase.auth().currentUser.uid
           // time: firebase.database.ServerValue.TIMESTAMP
        };
        messagesRef.push(newMessage); // adds the message into the JOITC

        this.setState({post:''}); // resets the state
    }

    render() {
        var currentUser = firebase.auth().currentUser; // get all data from current user

        return (
            <div className="message-box write-message">

                <form className="message-input" role="form">
                    <textarea name="text" value={this.state.post} className="form-control" onChange={(e) => this.updatePost(e)}></textarea>
                    <div className="form-group send-message">
                        <button className="btn btn-default"
                            disabled={this.state.post.length === 0}
                            onClick={(e) => this.postMessage(e)}>
                                Post
                        </button>
                    </div>
                </form>
            </div>
        );
    } 
}

// keeps track of messages that have been posted
class PostedMessages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: []}; // an array of messages to be posted
    }

    componentDidMount() {
        var users = firebase.database().ref('users'); // refer to user element in JOITC
        users.on('value', (snapshot) => {
            this.setState({users:snapshot.val()});
        });

        var messagesRef = firebase.database().ref('message'); // refer to message element in JOITC
        messagesRef.on('value', (snapshot) => {
            var messageList = [];
            snapshot.forEach(function(item) {
                var singleMessage = item.val();
                singleMessage.key = item.key;
                messageList.push(singleMessage);
            });
            messageList.sort((a,b) => b.time - a.time);
            this.setState({messages: messageList});
        });
    }

    componentWillUnmount() {
        firebase.database().ref('users').off();
        firebase.database().ref('message').off();
    }

    render() {
        if(!this.state.users) { // if there is no user data, there are no messages
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

// keeps track of the data for a single message
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

// creates a sign up form that asks for email, password and username
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

    // tracks whether or not the user
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
        var passwordErrors = this.validate(this.state.password, {required:true, minLength:5});
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

// shows error messages when things are input incorrectly
class ValidationErrors extends React.Component {
    render() {
        return (
            <div>
                {this.props.errors.required &&
                    <p className="help-block">Required!</p>
                }
                {this.props.errors.email &&
                    <p className="help-block">Not a valid email address!</p>
                }
                {this.props.errors.minLength &&
                    <p className="help-block">Must be at least {this.props.errors.minLength} characters.</p>        
                }
            </div>
        );
    } 
}
export default ForumPage;