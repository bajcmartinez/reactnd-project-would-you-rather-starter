import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Login from './Login';
import Auth from './Auth';
import Pending from './Pending';
import Answered from "./Answered";
import NewQuestion from './NewQuestion';
import Question from './Question';
import NotFound from './NotFound';
import Leaderboard from "./Leaderboard";

class App extends Component {
    render() {
        const { auth } = this.props;

        return (
            <Router>
                <Switch>
                    <Route path='/' exact render={() => auth.user ? <Redirect to='/auth/pending' /> : <Redirect to='/login' />} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/auth' render={() => (
                        <Auth>
                            <Switch>
                                <Route exact path='/auth/add' component={NewQuestion} />
                                <Route exact path='/auth/pending' component={Pending} />
                                <Route exact path='/auth/answered' component={Answered} />
                                <Route exact path='/auth/leaderboard' component={Leaderboard} />
                                <Route exact path='/auth/question/:id' component={Question} />
                                <Route component={NotFound} />
                            </Switch>
                        </Auth>
                    )} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps ({ auth }) {
    return {
        auth
    }
}

App.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(App)

