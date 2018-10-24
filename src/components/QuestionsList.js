import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './QuestionsList.module.scss';
import QuestionCard from "./QuestionCard";

export default function QuestionList(props) {
    if (props.questions && props.questions.length === 0) {
        return (
            <div>
                All done, come back later to answer some more questions
            </div>
        )
    }

    return (
       <div>
           <TransitionGroup>
               {props.questions && props.questions.map((questionId) => (
                   <CSSTransition
                       key={questionId}
                       timeout={500}
                       classNames="question-list"
                   >
                       <QuestionCard id={questionId}/>
                   </CSSTransition>
               ))}

           </TransitionGroup>
       </div>
    )
}

