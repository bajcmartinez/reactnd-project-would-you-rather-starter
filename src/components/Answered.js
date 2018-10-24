import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from './Loading';
import Question from './Question';
import { handleLoadQuestions } from "../actions/questions";

class Dashboard extends Component {
    state = {

    };

    componentDidMount () {
        this.props.dispatch(handleLoadQuestions());
    }

    render() {
        const { questions, loading } = this.props;

        return (
            <div>
                {loading ?
                    <Loading />
                    :
                    questions && questions.map((questionId) => (
                        <Question key={questionId} id={questionId}/>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps ({ questions, loading, auth }) {
    return {
        questions: Object.keys(questions).filter((id) => {
            const question = questions[id];
            return question.optionOne.votes.includes(auth.user.id) || question.optionTwo.votes.includes(auth.user.id)
        }),
        loading
    }
}

export default connect(mapStateToProps)(Dashboard);