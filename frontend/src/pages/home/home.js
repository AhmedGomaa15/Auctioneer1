import "./home.css";
import { getAuthToken } from "../../services/auth";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const { token, user } = getAuthToken();


  const [courses, setCourses] = useState({
    loading: true,
    result: [],
    err: null,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/course/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: search,
  },
      })
      .then((resposne) => {
        console.log(resposne.data);
        setCourses({ ...courses, result: resposne.data, loading: false, err: null });
      })
      .catch((errors) => {
        setCourses({ ...courses, loading: false, err: [{ msg: errors.response.data.message }] });
      });
  }, [search]);

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
          {courses.err.map((err, index) => {
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
      {courses.err !== null && error()}
      {courses.loading === true ? (
        loadingSpinner()
      ) : (
        
              <div className="card-body" style={{ backgroundColor: "#F8F8F8" }}>
                <div className="row mb-3">
                  <label className="small mb-1" htmlFor="name">
                    Search
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>

        <div className="d-flex flex-wrap justify-content-between">
          {courses.result.map((item) => {
            return (
              <div key={item.id} className="cardDesign">
                <div className="card">
                  <img className="card-img-top" src={item.courseImage} alt="" />
                  <div className="card-body">
                    <h5 className="card-title">{item.courseName}</h5>
                    <h5 className="card-title">{item.description}</h5>
                    <h5 className="card-title">price:{item.price}</h5>
                    <h5 className="card-title">startDate:{item.startDate}</h5>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </>
  );
};
