import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, ListGroup, Button, FormCheck, ProgressBar } from 'react-bootstrap';

import * as style from './QuestionCard.module.scss';
import { handleSaveQuestionAnswer } from "../actions/questions";

class QuestionCard extends Component {
    state = {
        selectedOption: null,
        answeredOption: null,
        answered: false
    };

    static getDerivedStateFromProps(props) {
        const { question, user } = props;

        if (!question) return;

        let answeredOption = null;
        if (question.optionOne.votes.includes(user.id)) {
            answeredOption = 'optionOne';
        }
        if (question.optionTwo.votes.includes(user.id)) {
            answeredOption = 'optionTwo';
        }

        return {
            answeredOption,
            answered: answeredOption !== null
        }
    }

    handleSelection = (event) => {
        this.setState({
            selectedOption: event.target.value
        })
    };

    handleVote = () => {
        const { dispatch, question, user } = this.props;
        if (this.state.selectedOption != null) {
            dispatch(handleSaveQuestionAnswer(user.id, question, this.state.selectedOption));
            this.setState({
                selectedOption: null
            });
        }
    };

    formatDate (timestamp) {
        const d = new Date(timestamp);
        const time = d.toLocaleTimeString('en-US');
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
    }

    render() {
        const { question, author } = this.props;
        const { answered } = this.state;

        if (!question) {
            return (
                <Card bg='danger' text="white" className={style.question}>
                    <Card.Body>
                        <Card.Title>The question you are looking for does not exist!</Card.Title>
                        <Card.Text>
                            Please validate that the link you got is correct, we can't find your question in our database!
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }

        const title = answered ? `${author.name} asked, Would you rather...` : `${author.name} asks, Would you rather...`;

        const totalAnswers = question.optionOne.votes.length + question.optionTwo.votes.length;
        const optionOneAnswers = question.optionOne.votes.length;
        const optionTwoAnswers = question.optionTwo.votes.length;

        const currentOption = this.state.selectedOption || this.state.answeredOption;

        return (
            <Card bg={answered ? 'success' : 'info'} text="white" className={style.question}>
                <Card.Body className={style.cardMain}>
                    <small>On {this.formatDate(question.timestamp)}</small>
                    <Card.Title>
                        <img alt={author.name} src={author.avatarURL} className="img-thumbnail" />
                        &nbsp;
                        {title}
                    </Card.Title>
                    <Card.Text>

                    </Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item variant={answered ? 'success' : 'info'}>
                        <FormCheck
                            type="radio"
                            disabled={answered}
                            label={question.optionOne.text}
                            name={question.id}
                            id={question.id+"_optionOne"}
                            value="optionOne"
                            checked={currentOption === "optionOne"}
                            onChange={this.handleSelection}
                        />

                        {answered && <ProgressBar variant="info" now={optionOneAnswers/totalAnswers*100} label={`Voted by ${optionOneAnswers} user(s), popularity: ${optionOneAnswers/totalAnswers*100}%`} />}

                    </ListGroup.Item>
                    <ListGroup.Item variant={answered ? 'success' : 'info'}>
                        <FormCheck
                            type="radio"
                            disabled={answered}
                            label={question.optionTwo.text}
                            name={question.id}
                            id={question.id+"_optionTwo"}
                            value="optionTwo"
                            checked={currentOption === "optionTwo"}
                            onChange={this.handleSelection}
                        />

                        {answered && <ProgressBar variant="info" now={optionTwoAnswers/totalAnswers*100} label={`Voted by ${optionTwoAnswers} user(s), popularity: ${optionTwoAnswers/totalAnswers*100}%`} />}
                    </ListGroup.Item>
                </ListGroup>
                {!answered && (
                    <Card.Body>
                        <Button onClick={this.handleVote} variant="warning">
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
        author: questions[id] ? auth.users[questions[id].author] : null,
        user: auth.user
    }
}

QuestionCard.propTypes = {
    author: PropTypes.object,
    dispatch: PropTypes.func,
    question: PropTypes.object,
    user: PropTypes.object
};

export default connect(mapStateToProps)(QuestionCard);
