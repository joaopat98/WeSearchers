import React, {Component} from 'react';
import PropTypes from "prop-types";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

class SignupForm extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        method: PropTypes.string.isRequired,
    };
    state = {
        name: "",
        email: "",
        password: "",
    };
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };


    handleSubmit = e => {
        e.preventDefault();
        const {name, email, password} = this.state;
        let conf;
        switch (this.props.method){
            case "post":
                const state = {name, email, password};
                conf = {
                    method: this.props.method,
                    body: JSON.stringify(state),
                    headers: new Headers({"Content-Type": "application/json", 'X-CSRFToken': getCookie('csrftoken')})
                };
                fetch(this.props.endpoint, conf).then(response => console.log(response));
                break;
            case "get":
                fetch(this.props.endpoint + "?name=" + name + "&password=" + password).then(response => console.log(response))
        }

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="input"
                       type="text"
                       name="name"
                       placeholder="Name"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="email"
                       placeholder="Email"
                       onChange={this.handleChange}
                />
                <input className="input"
                       type="text"
                       name="password"
                       placeholder="Password"
                       onChange={this.handleChange}
                />
                <button type="submit" className="button is-info">
                    Send message
                </button>
            </form>
        );
    }
}

export default SignupForm;