import React from 'react';
import { User } from '../API';
import Grid from "@material-ui/core/Grid";

const UserListItem = (props: any) => {
    let dataImage = localStorage.getItem(props.user.profile);
    let srcValue = "data:image/png;base64," + dataImage;
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={9}>
                    <h3>{props.user.name}'s Details</h3><hr />
                    <div className='list-wrapper'>
                        <p><i> NAME:</i>  <b> &nbsp;{props.user.name}</b> </p>
                        <p><i> EMAIL:</i>   <b> &nbsp;{props.user.email}</b> </p>
                        <p> <i>MOBILE:</i>   <b> &nbsp;{props.user.mobile}</b> </p>
                        <p> <i>GENDER:</i>   <b> &nbsp;{props.user.gender}</b> </p>
                        <p> <i>TECHNOLOGIES:</i>   <b> &nbsp;{props.user.tech}</b> </p>
                    </div><br />

                </Grid>
                <Grid item xs={12} sm={3}>
                    <img style={{ width: '200px', height: '213px', marginTop: '70px' }} alt="" id='profile' src = {srcValue} />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserListItem;