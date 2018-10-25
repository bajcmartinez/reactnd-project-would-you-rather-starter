import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {Card, ListGroup, Form, Button} from "react-bootstrap";
import { connect } from "react-redux";

import * as style from "./QuestionCard.module.scss";
import { handleSaveQuestion } from "../actions/questions";

class NewQuestion extends Component {
    state = {
        optionOneText: "",
        optionTwoText: ""
    };

    handleOptionOneText = (event) => {
        this.setState({
            optionOneText: event.target.value.trim()
        })
    };

    handleOptionTwoText = (event) => {
        this.setState({
            optionTwoText: event.target.value.trim()
        })
    };

    handleSave = (e) => {
        e.preventDefault();
        const { dispatch, user } = this.props;

        dispatch(handleSaveQuestion({
            ...this.state,
            author: user.id
        }));

        this.props.history.push('/auth/pending');
    };

    render() {
        const { user } = this.props;

        return (
            <Form onSubmit={this.handleSave}>
                <Card bg='light' className={style.question}>
                    <Card.Body className={style.cardMain}>
                        <small>Creating new question</small>
                        <Card.Title>
                            <img alt={user.name} src={user.avatarURL} className="img-thumbnail" />
                            &nbsp;
                            Would you rather?
                        </Card.Title>
                        <Card.Text>

                        </Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant='light'>
                            <Form.Control required type="text" placeholder="Option 1" value={this.state.optionOneText} onChange={this.handleOptionOneText} />
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant='light'>
                            <Form.Control required type="text" placeholder="Option 2" value={this.state.optionTwoText} onChange={this.handleOptionTwoText} />
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button type="submit" variant="primary">
                            Add Question
                        </Button>
                    </Card.Body>
                </Card>
            </Form>
        )
    }
}

function mapStateToProps ({ questions, auth }, {id}) {
    return {
        user: auth.user
    }
}

NewQuestion.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    user: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(NewQuestion));
