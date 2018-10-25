import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

Question.propTypes = {
  match: PropTypes.object.isRequired
}