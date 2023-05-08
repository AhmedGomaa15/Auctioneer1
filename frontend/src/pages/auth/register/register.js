import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    loading: true,
    result: {},
    err: null,
  });

  const form = useRef({
    email: "",
    password: "",
    name: "",
    userTypeId: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true });
    axios
      .post("http://localhost:4000/api/auth/register", {
        name: form.current.name.value,
        email: form.current.email.value,
        password: form.current.password.value,
        userTypeId: form.current.userTypeId.value,
      })
      .then(() => {
        setRegister({ ...register, loading: false });
        navigate("/login");
      })
      .catch((errors) => {
        setRegister({ ...register, loading: false, err: errors.response.data.message });
      });
  };

  useEffect(() => {
    setRegister({ ...register, loading: true });
    axios
      .get("http://localhost:4000/api/auth/register")
      .then((data) => {
        setRegister({ ...register, result: data.data, loading: false, err: null });
      })
      .catch((err) => {
        setRegister({ ...register, loading: false, err: [{ msg: `something went wrong ${err}` }] });
      });
  }, []);

  const loadingSpinner = () => {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  const error = () => {
    return (
      <div className="container">
        <div className="row">
          {register.err.map((err, index) => {
            return (
              <div key={index} className="col-sm-12 alert alert-danger" role="alert">
                {err.msg}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {register.err !== null && error()}
      {register.loading === true ? (
        loadingSpinner()
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header">Register new user</div>
                <div className="card-body">
                  <form onSubmit={(e) => submit(e)}>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="name">
                        Name (how your name will appear to other users on the site)
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        ref={(val) => {
                          form.current.name = val;
                        }}
                      />
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="role">
                          Role
                        </label>
                        <select
                          className="form-control"
                          type="text"
                          id="role"
                          ref={(val) => {
                            form.current.userTypeId = val;
                          }}
                        >
                          <option value="-1">Select a Role</option>
                          {register.result.roles.map((role) => {
                            return (
                              <option key={role.id} value={role.id}>
                                {role.role}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="email">
                          Email address
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          ref={(val) => {
                            form.current.email = val;
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="password">
                          Password
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="password"
                          ref={(val) => {
                            form.current.password = val;
                          }}
                        />
                      </div>
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
