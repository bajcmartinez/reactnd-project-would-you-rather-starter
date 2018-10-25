import React  from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup, Badge } from 'react-bootstrap';

import * as style from './QuestionCard.module.scss';

const special = ['zeroth','first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

const UserCard = (props) => {

    const stringifyNumber = (n) => {
        if (n < 20) return special[n];
        if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
        return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
    };

    const { user, position } = props;

    const askedQuestions = user.questions.length;
    const answeredQuestions = Object.keys(user.answers).length;

    return (
        <Card bg='info' text="white" className={style.question}>
            <Card.Body className={style.cardMain}>
                <small>{stringifyNumber(position).toUpperCase()}</small>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    <span>
                        <img alt={user.name} src={user.avatarURL} className="img-thumbnail" />
                        &nbsp;
                        {user.name}
                    </span>
                    <span className="text-center">
                        Points:
                        <h1>
                            <Badge variant="success">{askedQuestions+answeredQuestions}</Badge>
                        </h1>
                    </span>
                </Card.Title>
                <Card.Text>

                </Card.Text>
            </Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item variant='info' className="d-flex justify-content-between align-items-center">
                    Asked questions <Badge variant="secondary">{askedQuestions}</Badge>
                </ListGroup.Item>
                <ListGroup.Item variant='info' className="d-flex justify-content-between align-items-center">
                    Answered questions <Badge variant="secondary">{answeredQuestions}</Badge>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
};

UserCard.propTypes = {
    position: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
};

export default UserCard;

