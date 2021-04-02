import React from 'react';
import '../modal.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { addUser } from '../actions/actionCreator';
import { User } from '../API';
import { useDispatch } from 'react-redux';
import { postData } from '../services/FetchNodeServices';

import getTechSkills from '../helpers/getTechSkills';
import swal from 'sweetalert';
import { SaveUserBody } from '../API';

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

    // for submitting user Info and scrolling to modal view
    const dispatch = useDispatch();
    
    const handleSubmit = async () => {
        dispatch(addUser(newUser));

        // sending data with post request to the server 
        const data: SaveUserBody = {
            name: props.name,
            gender: props.gender,
            email: props.email,
            mobile: props.countryCode + props.mobile,
            technologies: techSkills,
            profile: props.profile,
        }

        // Node Service to call backend API
        const response = await postData(
            "record",
            data
        );

        if(response) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
    
            swal({
                title: "New User Added Successfully",
                icon: "success",
                dangerMode: true,
            });
            
        } else {
            swal({
                title: "Add New User?",
                text: "Fail to Add New User",
                icon: "warning",
                dangerMode: true,
            });
        }
         
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