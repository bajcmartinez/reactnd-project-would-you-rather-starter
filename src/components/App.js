import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Answered from "./Answered";

class App extends Component {
    render() {
        const { auth } = this.props;

        return (
            <Router>
                <Fragment>
                    <Route path='/' exact render={() => auth.user ? <Redirect to='/auth/dashboard' /> : <Redirect to='/login' />} />
                    <Route path='/login' component={Login} />
                    <Route path='/auth' render={() => (
                        <Auth>
                            <Route path='/auth/dashboard' component={Dashboard} />
                            <Route path='/auth/answered' component={Answered} />
                        </Auth>
                    )} />
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps ({ loading, auth }) {
    return {
        loading,
        auth
    }
}

export default connect(mapStateToProps)(App)