import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';

class App extends Component {
    render() {
        const { auth } = this.props;

        return (
            <Router>
                <Fragment>
                    <Route path='/' exact render={() => auth.user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />} />
                    <Route path='/login' component={Login} />
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