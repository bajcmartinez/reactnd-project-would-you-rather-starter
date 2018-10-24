import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ListGroup, Button, FormCheck, ProgressBar } from 'react-bootstrap';

import * as style from './QuestionCard.module.scss';
import { handleSaveQuestionAnswer } from "../actions/questions";

class QuestionCard extends Component {
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
            answered: selectedOption !== null
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

    formatDate (timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
    }

    render() {
        const { question, author } = this.props;
        const { answered } = this.state;

        const title = answered ? `${author.name} asked, Would you rather...` : `${author.name} asks, Would you rather...`;

        const totalAnswers = question.optionOne.votes.length + question.optionTwo.votes.length;
        const optionOneAnswers = question.optionOne.votes.length;
        const optionTwoAnswers = question.optionTwo.votes.length;

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
                            value="optionOne"
                            checked={this.state.selectedOption === "optionOne"}
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
                            value="optionTwo"
                            checked={this.state.selectedOption === "optionTwo"}
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
        author: auth.users[questions[id].author],
        user: auth.user
    }
}

export default connect(mapStateToProps)(QuestionCard);