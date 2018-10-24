import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from "../actions/auth";

class Dashboard extends Component {
    state = {

    };

    logOut() {
        this.props.dispatch(logOut());
    }

    render() {

        const { auth, children } = this.props;

        // If you are not logged in, redirect to login page
        if (auth.user == null) {
            return (<Redirect to='/login' />)
        }

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Would you rather?</Navbar.Brand>
                    <Nav className="ml-auto">
                        <LinkContainer to="/auth/dashboard">
                            <Nav.Link>Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/auth/answered">
                            <Nav.Link href="#features">Answered</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={() => { this.logOut() }}>
                            Log Out
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <div className="container text-center mt-3">
                    {children}
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ auth }) {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Dashboard);