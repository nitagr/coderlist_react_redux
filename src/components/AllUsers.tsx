import React, { FunctionComponent, useEffect, useState, ChangeEvent } from "react";

import MaterialTable from "material-table";
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import swal from 'sweetalert';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Avatar from "@material-ui/core/Avatar";
import { UserData, SaveUserBody } from '../API';
import {
  SERVER_URL,
  getData,
  deleteData,
  postDataAndImage,
  editData,
} from "../services/FetchNodeServices";

import getTechSkills from '../helpers/getTechSkills';
import validationCheck from '../validations/formValidation';

// styling table using material styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
  },
  subdiv: {
    width: 1200,
    padding: 10,
  },
  formSubdiv: {
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
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    display: "none",
},
}));


const AllUsers: FunctionComponent<any> = () => {

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [getRowData, setRowData] = useState<UserData>();

  // user information states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>(' ');
  const [gender, setGender] = useState<string>('female');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [profileImage, setProfileImage] = useState<File>();
  const [profileName, setProfileName] = useState<string>('./no-image.png');
  const [saveProfileBtn, setSaveProfileBtn] = useState<boolean>(false);

  // states for technology checkboxes
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);
  const [check6, setCheck6] = useState(false);

  // technology stack string for display selected using checkbox
  const skillsSelected = [ check1, check2, check3, check4, check5, check6 ];
  const techSkills = getTechSkills(skillsSelected);
  
  // fetching user details from database
  const fetchUsers = async () => {
    const result = await getData('record');
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  // setting parameter to open and close dialog for edit and delete
  const handleDialogOpen = (data: UserData) => {
    setDialogOpen(true);
    setName(data.name)
    setEmail(data.email);
    setMobile((data.mobile).substr(3));
    setGender(data.gender);
    setProfileName(data.profile);
    setRowData(data);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSaveProfileBtn(false);
  }

  // handler function to delete user 
  const handleDeleteUser = async () => {
    const response = await deleteData(`record/${getRowData._id}`);
    if (response) {
      swal({
        title: "User Deleted Successfully",
        icon: "success",
        dangerMode: true,
      });
    } else {
      swal({
        title: "Fail to Delete Record",
        icon: "warning",
        dangerMode: true,
      });
    }
  }

  // data for edit User 
  const body: SaveUserBody = {
    name: name,
    gender: gender,
    email: email,
    mobile: countryCode + mobile,
    technologies: techSkills,
    profile: profileName,
  }

  const handleEditUser = async () => {
    // form fields validation
    let validationResult = validationCheck( name, email, countryCode, mobile, profileName);
    
    if(validationResult){
      const response = await editData(`record/${getRowData._id}`, body);
      if (response) {
        swal({
          title: "User Details Edited Successfully",
          icon: "success",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Fail to Edit User Details",
          icon: "warning",
          dangerMode: true,
        });
      }
    }
  }

  const handleProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setProfileName(file.name);    
    setProfileImage(file);
    setSaveProfileBtn(true);      
  }

  const handleProfileUpload = async () => {
    const formData = new FormData();

    formData.append(
        'image',
        profileImage,
    );
    const config = { headers: { "content-type": "multipart/form-data" } };
    const response = await postDataAndImage('record/profile-upload', formData, config);
    setSaveProfileBtn(false);

    if (response) {
        swal({
          title: "Profile Image Uploaded Successfully",
          icon: "success",
          dangerMode: true,
        });
      } else {
        swal({
          title: "Failed to Upload Profile Image?",
          icon: "warning",
          dangerMode: true,
        });
      }
  }
  const showDialog = () => {
    return (
      <div>
        <Dialog
          fullScreen
          open={dialogOpen}
          onClose={handleDialogClose}
        >
          <AppBar className={classes.appBar}>
            
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDialogClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                User Details
              </Typography>
            </Toolbar>

          </AppBar>

          <div className={classes.root}>
            <div className={classes.formSubdiv}>
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

                <Grid item xs={12} sm={4}>
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
                      id="icon-button-profile"
                      type="file"
                      multiple
                      onChange={handleProfileChange}
                    />

                    <label htmlFor="icon-button-profile">
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                    {saveProfileBtn ? <Button color="primary" style={{ padding: 5 }} onClick={() => handleProfileUpload()}>Save</Button> : <></>}
                    <Avatar
                      alt="Remy Sharp"
                      variant="rounded"
                      style={{ marginLeft: 20 }}
                      src={`${SERVER_URL}/record/getfile/${profileName}`}
                      className={classes.large}
                    />
                  </div>
                   
                </Grid>

                <Grid item xs={12} sm={4}>  </Grid>

                <Grid item xs={12} sm={6}> 
                  <Button variant="contained" fullWidth color="primary" onClick={handleEditUser}>Edit</Button>
                </Grid>

                <Grid item xs={12} sm={6}> 
                  <Button variant="contained" fullWidth color="primary" onClick={handleDeleteUser}>Delete</Button>
                </Grid>

              </Grid>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        <MaterialTable
          title="List of Users"
          columns={[
            {
              title: "Name",
              field: "Name",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.name}</b>
                  </div>
                </div>
              ),
            },

            {
              title: "Email",
              field: "Email",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div><b>{rowData.email}</b></div>
                </div>
              ),
            },

            {
              title: "Gender",
              field: "Gender",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.gender}</b>
                  </div>
                </div>
              ),
            },

            {
              title: "Mobile",
              field: "Mobile",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.mobile}</b>
                  </div>
                </div>
              ),
            },

            {
              title: "Technologies",
              field: "Technologies",
              render: (rowData) => (
                <div style={{ flexDirection: "column" }}>
                  <div>
                    <b>{rowData.technologies}</b>
                  </div>
                </div>
              ),
            },

            {
              title: "Profile Image",
              field: "Profile Image",
              render: (rowData) => (
                <div style={{ borderRadius: 10 }}>
                  <img
                    src={`${SERVER_URL}/record/getfile/${rowData.profile}`}
                    width="50"
                    height="50"
                    alt=""
                  />
                </div>
              ),
            },
          ]}
          data={users}
          actions={[
            {
              icon: Edit,
              tooltip: "Edit User Details",
              onClick: (event, rowData) => handleDialogOpen(rowData),
            },
          ]}
        />
      </div>
      {showDialog()}
    </div>
  );
}

export default AllUsers;