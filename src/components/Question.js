import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, Button, FormCheck } from 'react-bootstrap';

import * as style from './Question.module.scss';
import { handleSaveQuestionAnswer } from "../actions/questions";

class Question extends Component {
    state = {
        selectedOption: null,
        disabled: false
    };

    componentWillMount() {
        const { question, user } = this.props;

        let selectedOption = null;

        if (question.optionOne.votes.includes(user.id))
            selectedOption = 'optionOne';

        if (question.optionTwo.votes.includes(user.id))
            selectedOption = 'optionTwo';

        this.setState({
            selectedOption,
            disabled: selectedOption !== null
        })
    }

    handleSelection = (event) => {
        this.setState({
            selectedOption: event.target.value
        })
    };

    handleVote = () => {
        const { dispatch, question, user } = this.props;
        dispatch(handleSaveQuestionAnswer(user.id, question, this.state.selectedOption));
    };

    render() {
        const { question } = this.props;
        const { disabled } = this.state;

        return (
            <Card className={style.question}>
                <Card.Body>
                    <Card.Title>Would you rather?</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <FormCheck
                            type="radio"
                            disabled={disabled}
                            label={question.optionOne.text}
                            name={question.id}
                            value="optionOne"
                            checked={this.state.selectedOption === "optionOne"}
                            onChange={this.handleSelection}
                        />

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <FormCheck
                            type="radio"
                            disabled={disabled}
                            label={question.optionTwo.text}
                            name={question.id}
                            value="optionTwo"
                            checked={this.state.selectedOption === "optionTwo"}
                            onChange={this.handleSelection}
                        />
                    </ListGroup.Item>
                </ListGroup>
                {!disabled && (
                    <Card.Body>
                        <Button onClick={this.handleVote} variant="primary">
                            Vote
                        </Button>
                    </Card.Body>
                )}

            </Card>
        )
    }
}

function mapStateToProps ({ questions, auth }, {id}) {
    return {
        question: questions[id],
        user: auth.user
    }
}

export default connect(mapStateToProps)(Question);