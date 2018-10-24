import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionList from './QuestionsList';

class Pending extends Component {
    render() {
        const { questions } = this.props;

        return (
            <QuestionList questions={questions} />
        )
    }
}

function mapStateToProps ({ questions, auth }) {
    return {
        questions: Object.keys(questions).filter((id) => {
            const question = questions[id];
            return !question.optionOne.votes.includes(auth.user.id) && !question.optionTwo.votes.includes(auth.user.id)
        }).sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Pending);