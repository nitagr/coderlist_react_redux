import React, { useState, useEffect, ChangeEvent } from 'react';
import '../modal.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { addUser } from '../actions/actionCreator';
import { User, UserState } from '../API';
import { connect, useDispatch } from 'react-redux';

const Modal = (props: any) => {

    // technology stack string for display selected using checkbox
    let tech = '| ';
    if (props.check1) {
        tech += 'C++ ';
        tech += '| '
    }
    if (props.check2) {
        tech += 'Python ';
        tech += '| '
    }
    if (props.check3) {
        tech += 'javascript ';
        tech += '| '
    }
    if (props.check4) {
        tech += 'NodeJs ';
        tech += '| '
    }
    if (props.check5) {
        tech += 'React ';
        tech += '| '
    }
    if (props.check6) {
        tech += 'MongoDB ';
        tech += '| '
    }
    const newUser: User = {
        id: Math.random(),
        name: props.name,
        email: props.email,
        countryCode: props.countryCode,
        mobile: props.mobile,
        gender: props.gender,
        profile: props.profile,
        tech: tech,

    }
    const dispatch = useDispatch();
    
    // for submitting user Info and scrolling to modal view
    const handleSubmit = () => {
        dispatch(addUser(newUser));
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
        });
    }

    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(-7vh)' : 'translateY(-10vh)',
                    opacity: props.show ? 1 : 0
                }}>
                <div className="modal-header">
                    <h3>Preview Details</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>Name: {props.name}</p>
                    <p>Email: {props.email}</p>
                    <p>Mobile: {props.mobile}</p>
                    <p>Gender: {props.gender}</p>
                    <p>Profile Image: {props.profile}</p>
                    <p>Technologies: {tech}</p>
                </div>

                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <div className="modal-footer">
                            <Button value="Submit" variant="contained" fullWidth color="primary" onClick={handleSubmit} >Submit</Button>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="modal-footer">
                            <Button variant="contained" fullWidth color="primary" onClick={props.close}>Cancel</Button>
                        </div>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
};
export default Modal;