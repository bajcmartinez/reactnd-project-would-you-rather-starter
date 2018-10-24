import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserCard from "./UserCard";

class Leaderboard extends Component {
    render() {
        const { usersIds, users } = this.props;

        return (
            <div>
                {usersIds.map((userId, position) => (
                    <UserCard key={userId} user={users[userId]} position={position+1} />
                ))}
            </div>
        )
    }
}

function mapStateToProps ({ auth }) {
    const { users } = auth;
    return {
        usersIds: Object.keys(users).sort((a, b) => (Object.keys(users[b].answers).length - users[b].questions.length) - (Object.keys(users[a].answers).length - users[a].questions.length)),
        users: users
    }
}

export default connect(mapStateToProps)(Leaderboard);