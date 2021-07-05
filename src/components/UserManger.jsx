import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import AddUser from "./AddUser";
import { CSVLink } from "react-csv";
import TextareaAutosize from "react-textarea-autosize";
import MaterialTable from "material-table";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import { Admin, Resource } from "react-admin";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="first" />
      <DateField source="last" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="location" />
      <TextField source="hobby" />

      <BooleanField source="commentable" />
    </Datagrid>
  </List>
);
const columns = [
  { field: "id", headerName: "ID", width: 130 },
  { field: "first", headerName: "First name", width: 130, editable: true },
  { field: "last", headerName: "Last name", width: 130, editable: true },
  {
    field: "email",
    headerName: "Email",
    width: 160,
    editable: true
  },
  {
    field: "phone",
    headerName: "Phone",

    sortable: false,
    width: 130,
    editable: true
  },
  {
    field: "hobby",
    headerName: "Hob by",
    sortable: false,
    width: 130,
    editable: true
  },
  {
    field: "hobbys",
    headerName: "Action",
    sortable: false,
    width: 160,
    renderCell: () => (
      <span style={{ display: "flex" }}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="contained" color="secondary">
          Del
        </Button>
      </span>
    )
  }
];
const UserManger = ({ dispatch, getalluser, row }) => {
  console.log(getalluser.users);

  const [editRowsModel, setEditRowsModel] = React.useState({});
  console.log(editRowsModel);
  const handleEditRowModelChange = React.useCallback((params) => {
    setEditRowsModel(params.model);
  }, []);
  const handleEditCellChange = (e) => {
    console.log(e);
  };
  const [forcus, setForcus] = useState(false);
  useEffect(() => {
    let sub = true;
    axios
      .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users")
      .then((res) => {
        if (sub) {
          dispatch({
            type: "FETCH_ALL",
            payload: res.data
          });
        }
      });
    return () => {
      sub = false;
    };
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>

      <DataGrid
        onEditCellChange={handleEditCellChange}
        rows={getalluser.users}
        columns={columns}
        pageSize={5}
        checkboxSelection
        editRowsModel={editRowsModel}
        onEditRowModelChange={handleEditRowModelChange}
      />
      {/* <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={getalluser.users}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...getalluser.users];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...getalluser.users];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);

                resolve();
              }, 1000);
            })
        }}
      /> */}
      {/* <TableContainer component={Paper} style={{ height: 400, width: "auto" }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead style={{ fontWeight: "bold" }}>
            <TableRow>
              <TableCell align="right">ID </TableCell>
              <TableCell align="right">First</TableCell>
              <TableCell align="right">Last</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Hobby</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getalluser.users.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="right" component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {item.first}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {item.last}
                </TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.phone}</TableCell>
                <TableCell align="right">{item.location}</TableCell>
                <TableCell align="right">{item.hobby}</TableCell>
                <TableCell align="right" style={{ paddingLeft: "5px" }}>
                  <Link to="/edit-user" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch({
                          type: "FETCH_USER_BY_ID",
                          payload: item
                        });
                      }}
                      color="primary"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button variant="contained" color="secondary">
                    Del
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <span style={{ display: "flex" }}>
        <CSVLink
          data={getalluser.users}
          style={{ marginRight: "8px", textDecoration: "none" }}
        >
          <Button variant="contained" color="primary">
            Download CSV
          </Button>
        </CSVLink>

        <AddUser />
      </span>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getalluser: state.getalluser,
  getalluserbyid: state.getalluserbyid
});
export default connect(mapStateToProps)(UserManger);
