import React, { useState, ChangeEvent } from "react";
import Modal from './Modal';

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

import validationCheck from '../validations/formValidation';

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
    const [profileImage, setProfileImage] = useState('');

    // state for preview-modal
    const [preview, setPreview] = useState(false);

    // states for technology checkboxes
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);

    // opening modal handler with preview state
    const openModalHandler = () => {
        
        // form fields validation
        let validationResult = validationCheck( name, email, countryCode, mobile, profileImage );

        if (validationResult) {
            setPreview(!preview);
            window.scroll({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    // closing modal handler with preview state
    const closeModalHandler = () => {
        setPreview(!preview);
    }

    // reset the form
    const handleReset = () => {
        setName('');
        setEmail('');
        setCountryCode('');
        setMobile('');
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
        setCheck6(false);
        setProfileImage('');
    }

    // profile image upload handler
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        setProfileImage(file.name);
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
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
                                ref={imageUploader}
                                onChange={handleImageUpload}
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
                        <p> {profileImage} </p> 
                    </Grid>

                    <img
                        ref={uploadedImage}
                        hidden
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                        }}
                        alt=''
                        id='profileImg'
                    />

                    <Grid item xs={12} sm={6} >
                        <div>
                            <Button variant="contained" fullWidth color="primary" onClick={openModalHandler}>Preview</Button>

                            <Modal
                                className="modal"
                                show={preview}
                                name={name}
                                email={email}
                                countryCode={countryCode}
                                mobile={mobile}
                                gender={gender}
                                profile={profileImage}
                                close={closeModalHandler}
                                check1={check1}
                                check2={check2}
                                check3={check3}
                                check4={check4}
                                check5={check5}
                                check6={check6}

                            />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" fullWidth color="primary" onClick={handleReset}>Reset</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default AddForm;