import React from 'react';
import UserListItem from './UserListItem';
import { connect } from 'react-redux';
import { UserState } from '../API';
import { addUser } from '../actions/actionCreator';
import { User } from '../API'
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const UserList = (state: UserState) => {
    let users = state.users;
    const scrollBottom = () => {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
        });
    }

    const scrollTop = () => {
        window.scroll({
            top: 0,
            left: 0,
        });
    }

    return (
        <div className='user-list'>
            <h1>Users List</h1>
            <Button variant="contained" color="secondary" onClick={scrollBottom}>Scroll ⬇️</Button>
            <ol className="container-list">
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        {users.map((user: any) => (
                            <li>
                                <UserListItem
                                    user={user} />
                            </li>
                        ))}
                    </Grid>
                </Grid>
            </ol>
            <Button variant="contained" color="secondary" onClick={scrollTop}>Scroll ⬆️</Button>
        </div>
    )
};
const mapStateToProps = (state: UserState) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, { addUser })(UserList);
