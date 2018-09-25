import React, {Component} from 'react';
import PropTypes from "prop-types";

class Validator extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
    };
    state = {
        valid: 0
    };

    render() {
        let message;
        switch (this.state.valid){
            case 0:
                message= "Activating...";
                break;
            case 1:
                message = "Done!";
                break;
            default:
                message = "Failed";
        }
        return (
          <p>{message}</p>
        );
    }

    componentDidMount() {
        fetch(this.props.endpoint + "?guid=" + this.props.code).then(response => this.setState({["valid"]: response.status === 200 ? 1 : 2}));
    }
}

export default Validator;