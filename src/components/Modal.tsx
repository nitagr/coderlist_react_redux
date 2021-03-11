import React, { useState, useEffect, ChangeEvent } from 'react';
import '../modal.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { addUser } from '../actions/actionCreator';
import { User, UserState } from '../API';
import { connect, useDispatch } from 'react-redux';
import getTechSkills from '../helpers/getTechSkills';

const Modal = (props: any) => {

    // technology stack string for display selected using checkbox
    const skillsSelected = [ 
        props.check1,
        props.check2,
        props.check3,
        props.check4,
        props.check5,
        props.check6,
    ];

    let techSkills = getTechSkills(skillsSelected);
    
    const newUser: User = {
        id: Math.random(),
        name: props.name,
        email: props.email,
        countryCode: props.countryCode,
        mobile: props.mobile,
        gender: props.gender,
        profile: props.profile,
        tech: techSkills,
    }

    // converting image into base64 and storing it in localstorage service
    function getBase64Image(img: any) {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx = canvas.getContext("2d");
        if (ctx)
            ctx.drawImage(img, 0, 0, img.width, img.height);

        let dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    }
    // profile storage handler
    const handleProfileStorage = () => {
        let profileImage = document.getElementById('profileImg');
        let imgData = getBase64Image(profileImage);
        localStorage.setItem(props.profile, imgData);
    }

    const dispatch = useDispatch();
    
    // for submitting user Info and scrolling to modal view
    const handleSubmit = () => {
        dispatch(addUser(newUser));
        handleProfileStorage();
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
                    <p>Technologies: {techSkills}</p>
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