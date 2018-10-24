import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logOut } from "../actions/auth";
import { handleLoadQuestions } from "../actions/questions";
import Loading from "./Loading";

class Auth extends Component {
    componentDidMount () {
        this.props.dispatch(handleLoadQuestions());
    }

    logOut() {
        this.props.dispatch(logOut());
    }

    render() {

        const { auth, children, loading } = this.props;

        // If you are not logged in, redirect to login page
        if (auth.user == null) {
            return (<Redirect to='/login' />)
        }

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">{auth.user.name}, Would you rather?</Navbar.Brand>
                    <Nav className="ml-auto">
                        <LinkContainer to="/auth/pending">
                            <Nav.Link>Pending</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/auth/answered">
                            <Nav.Link>Answered</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={() => { this.logOut() }}>
                            Log Out
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <div className="container text-center mt-3">
                    {loading ?
                        <Loading/>
                        :
                        children
                    }
                </div>
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

export default connect(mapStateToProps)(Auth);