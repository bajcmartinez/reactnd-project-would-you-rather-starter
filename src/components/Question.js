import React, { Component } from 'react';

import QuestionCard from './QuestionCard';

class Question extends Component {
    render() {
        const { match } = this.props;

        return (
            <QuestionCard key={match.params.id} id={match.params.id}/>
        )
    }
}

export default Question;