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
                        <Switch>
                            <Route exact path='/auth/add' render={() => (<Auth><NewQuestion /></Auth>)} />
                            <Route exact path='/auth/pending' render={() => (<Auth><Pending /></Auth>)} />
                            <Route exact path='/auth/answered' render={() => (<Auth><Answered /></Auth>)} />
                            <Route exact path='/auth/leaderboard' render={() => (<Auth><Leaderboard /></Auth>)} />
                            <Route exact path='/auth/question/:id' render={({match}) => (<Auth><Question match={match} /></Auth>)} />
                            <Route component={NotFound} />
                        </Switch>
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

