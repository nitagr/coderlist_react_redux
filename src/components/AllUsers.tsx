import React, { FunctionComponent, useEffect, useState } from "react";

import MaterialTable from "material-table";
import Edit from '@material-ui/icons/Edit';
import { makeStyles } from "@material-ui/core/styles";
import {
  SERVER_URL,
  getData,
} from "../services/FetchNodeServices";

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
  }
}));

const AllUsers: FunctionComponent<any> = () => {

  const classes = useStyles();
  const [users, setUsers] = useState([]);

  // fetching user details from database
  const fetchUsers = async () => {
    const result = await getData('record');
    setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
              onClick: (event, rowData) => null,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default AllUsers;