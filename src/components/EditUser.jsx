import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const EditUser = ({ dispatch, getalluserbyid }) => {
  console.log(getalluserbyid.userbyid);
  const [forcusfname, setForcusfname] = useState(false);
  const [forcuslname, setForcuslname] = useState(false);
  const [forcusemail, setForcusemail] = useState(false);
  const [forcusphone, setForcusphone] = useState(false);
  const [forcushoby, setForcushobby] = useState(false);
  const [forcuslocation, setForcuslocation] = useState(false);

  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    console.log(data.confirmpassword);
    var first = data.fname;
    var last = data.lname;
    var email = data.email;
    var phone = data.phone;
    var location = data.location;
    var hobby = data.hobby;
    axios
      .put(
        `https://60d2e16c858b410017b2e624.mockapi.io/api/v1/users/${getalluserbyid.userbyid}`,
        {
          first,
          last,
          email,
          phone,
          location,
          hobby
        }
      )
      .then(
        (res) => {
          console.log(res);
          alert("Update Item Successfull");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div>
      <form method="post" onSubmit={handleSubmit(onSubmit)} id="formlogin">
        <div className="form-group">
          <input
            type="text"
            className="form-control w-100"
            autoFocus
            onChange={(e) => {}}
            onFocus={() => {
              setForcusfname(true);
            }}
            onBlur={() => {
              setForcusfname(false);
            }}
            placeholder="Nhập văn bản cho thẻ này"
            value={forcusfname ? "" : getalluserbyid.userbyid.first}
            {...register("fname", {
              required: true
            })}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {" "}
            {errors.fname?.type === "required" && "Vui lòng nhập tên tài khoản"}
          </p>
        </div>
        <div className="form-group">
          <input
            type="text"
            onFocus={() => {
              setForcuslname(true);
            }}
            onBlur={() => {
              setForcuslname(false);
            }}
            placeholder="Nhập văn bản cho thẻ này"
            value={forcuslname ? "" : getalluserbyid.userbyid.last}
            className="form-control w-100"
            {...register("lname", {
              required: true
            })}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {" "}
            {errors.lname?.type === "required" && "Pls enter lastname"}
          </p>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={getalluserbyid.userbyid.email}
            className="form-control w-100"
            {...register("email", {
              required: true,

              pattern: /\S+@\S+\.\S+/
            })}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {errors.email?.type === "required" && "Please enter email"}
            {errors.email?.type === "pattern" && "Pls enter valid email"}
          </p>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control w-100"
            placeholder={getalluserbyid.userbyid.phone}
            {...register("phone", {
              required: true,

              pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g
            })}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {errors.phone?.type === "required" && "Plse Enter phone"}
            {errors.phone?.type === "pattern" && "Plse enter valid phone"}
          </p>
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control w-100"
            placeholder={getalluserbyid.userbyid.location}
            {...register("location", {
              required: true
            })}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {errors.location?.type === "required" && "Plse Enter location"}
          </p>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder={getalluserbyid.userbyid.hobby}
            className="form-control w-100"
            {...register("hobby", {
              required: true
            })}
          />
          <p style={{ color: "red", fontSize: "13px" }}>
            {errors.hobby?.type === "required" && "Plse Enter hobby"}
          </p>
        </div>
        <button className="btn btn-success w-100">Update</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getalluser: state.getalluser,
  getalluserbyid: state.getalluserbyid
});
export default connect(mapStateToProps)(EditUser);
