import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import * as style from './Login.module.scss';
import Loading from './Loading';
import { logIn } from '../actions/auth';
import { handleLoadUsers } from '../actions/auth';

class Login extends Component {
    state = {
        username: 'johndoe'
    };

    componentDidMount () {
        this.props.dispatch(handleLoadUsers());
    }

    handleChange = (e) => {
        const username = e.target.value;

        this.setState(() => ({
            username
        }))
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(logIn(this.state.username));
    }

    render() {
        const { auth, loading } = this.props;
        const { username } = this.state;

        // If you are already logged in, redirect to dashboard, nothing to do here
        if (auth.user != null) {
            return (<Redirect to='/auth/dashboard' />)
        }

        return (
            <div className={style.loginContainer}>
                {loading ?
                    <Loading />
                        :
                    <Form onSubmit={e => this.handleSubmit(e)} className={style.loginForm}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={this.handleChange}
                            placeholder="Username"
                            required autoFocus isInvalid={auth.error != null}/>
                        <Form.Control.Feedback type="invalid">
                            {auth.error}
                        </Form.Control.Feedback>
                        <br/>

                        <Button variant="primary" type="submit" className="btn-block">Sign In</Button>
                    </Form>
                }
            </div>
        )
    }
}

function mapStateToProps ({ auth, loading }) {
    return {
        auth,
        loading
    }
}

export default connect(mapStateToProps)(Login);