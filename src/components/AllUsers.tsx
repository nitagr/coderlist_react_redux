import React, { FunctionComponent, useEffect, useState } from "react";

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
import {
  SERVER_URL,
  getData,
  postData,
  deleteData
} from "../services/FetchNodeServices";
import { UserData } from '../API';

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
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));


const AllUsers: FunctionComponent<any> = () => {

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [getRowData, setRowData] = useState<UserData >();

  // fetching user details from database
  const fetchUsers = async () => {
    const result = await getData('record');
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, [users]);

  // setting parameter to open and close dialog for edit and delete
  const handleDialogOpen = (data: any) => {
    setDialogOpen(true);
    setRowData(data);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
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
              <Button autoFocus color="inherit" >
                Edit
              </Button>
              <Button autoFocus color="inherit" onClick = {handleDeleteUser} >
                Delete
              </Button>
            </Toolbar>
          </AppBar>
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