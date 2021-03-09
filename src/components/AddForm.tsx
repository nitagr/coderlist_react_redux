import React, { useState, ChangeEvent } from "react";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// styles
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        padding: 10,
    },
    subdiv: {
        width: 450,
        boxShadow: '0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17)',
        height: 500,
        padding: 10,
        borderRadius: 10
    },
    formControl: {

        minWidth: 400,
        display: 'flex',
        flexDirection: 'row',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    input: {
        display: "none",
    },
}));

const AddForm = () => {
    //useStyles
    const classes = useStyles();

    // user information states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState(' ');
    const [gender, setGender] = useState('female');
    const [countryCode, setCountryCode] = useState(' ');
    const [profileImage, setProfileImage] = useState('/no-image.png');

    // state for preview-modal
    const [preview, setPreview] = useState(false);

    // states for technology checkboxes
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);

    // form field validation check for entries
    const validationCheck = () => {
        let nameFormat = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let mobileFormat = /^\d{10}$/;

        if (name === '') {
            alert('Name: Name required');
        } else if (!nameFormat.test(name)) {
            alert('Name: Only letters and whitespaces are allowed');
        } else if (!emailFormat.test(email)) {
            alert('Email: Invalid email');
        } else if (countryCode !== '+91') {
            alert('Code: Invalid country Code, maybe due to leading whitespaces');
        } else if (!mobileFormat.test(mobile)) {
            alert('Mobile: Not a Valid Number, maybe due to leading whitespaces');
        } else if (mobile === '') {
            alert('Mobile: Mobile number is required');
        } else {
            return true;
        }
        return false;
    };

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={2}>
                        <h4>Name:</h4>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <TextField label="Name" fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <h4>Gender:</h4>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <FormControl component="fieldset"  >
                            <RadioGroup aria-label="gender" name="gender1" value={gender} row onChange={(e) => { setGender(e.target.value) }}>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <h4>Email:</h4>
                    </Grid>

                    <Grid item xs={12} sm={10}>
                        <TextField label="Email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <h4>Mobile:</h4>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <TextField label="Country Code" fullWidth variant="outlined" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <TextField label="Mobile" fullWidth variant="outlined" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <h4>Technologies:</h4>
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={check1}
                                        color="primary"
                                        onChange={() => setCheck1(!check1)}
                                    />
                                }
                                label="C++"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={check2}
                                        color="primary"
                                        onChange={() => setCheck2(!check2)}
                                    />
                                }
                                label="Python"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={check3}
                                        color="primary"
                                        onChange={() => setCheck3(!check3)}
                                    />
                                }
                                label="Javascript"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={check4}
                                        color="primary"
                                        onChange={() => setCheck4(!check4)}
                                    />
                                }
                                label="Nodejs"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={check5}
                                        color="primary"
                                        onChange={() => setCheck5(!check5)}
                                    />
                                }
                                label="React"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={check6}
                                        color="primary"
                                        onChange={() => setCheck6(!check6)}
                                    />
                                }
                                label="MongoDB"
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <h4>Profile Upload:</h4>
                    </Grid>

                    <Grid item xs={12} sm={1}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <input
                                accept="image/*"
                                className={classes.input}                        
                                id="icon-button-file"
                                type="file"                               
                            />

                            <label htmlFor="icon-button-file">
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                >
                                <PhotoCamera />
                                </IconButton>
                            </label>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={7}>
                        <img                            
                            hidden
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                            }}
                            alt=''
                            id='profileImg'
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} >
                        <div>
                            <Button variant="contained" fullWidth color="primary" >Preview</Button>                           
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" fullWidth color="primary" >Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default AddForm;