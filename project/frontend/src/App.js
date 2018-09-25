import React, {Component} from 'react';
import './App.css';
import SignupForm from "./components/SignupForm";
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'
import Validator from "./components/Validator";
import queryString from 'query-string'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Route path="/user/validate" render={() => (
                            <Validator endpoint="/api/user/validate" code={queryString.parse(window.location.search).guid}/>
                        )}/>
                        <Route render={() => (
                            <SignupForm endpoint="/api/user" method="post"/>
                        )}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
