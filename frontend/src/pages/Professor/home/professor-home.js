import { useNavigate } from "react-router-dom";
import "./professor-home.css";
import { useRef, useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import { getAuthToken } from "../../../services/auth";

export const SellerHome = () => {
  const navigate = useNavigate();
  const { token, user } = getAuthToken();

  const [course, setCourse] = useState({
    loading: false,
    err: null,
    filename: "Choose file",
  });

  const form = useRef({
    courseName: "",
    image: null,
    description: "",
    price: 0,
    startDate: Date,
    endDate: Date,
  });

  const submit = (e) => {
    e.preventDefault();
    setCourse({ ...course, loading: true });

    const formData = new FormData();
    formData.append("courseName", form.current.courseName.value);
    formData.append("description", form.current.description.value);
    formData.append("price", form.current.price.value);
    formData.append("startDate", form.current.startDate.value);
    formData.append("endDate", form.current.endDate.value);
    formData.append("userId", user.id);
    if (form.current.image.files && form.current.image.files[0]) {
      formData.append("image", form.current.image.files[0]);
    }

    axios
      .post("http://localhost:4000/api/course", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        setCourse({ ...course, loading: false, err: null });
        navigate("/");
      })
      .catch((errors) => {
        if (typeof errors.response.data.message === "string") {
          setCourse({ ...course, loading: false, err: [{ msg: errors.response.data.message }] });
        } else {
          setCourse({ ...course, loading: false, err: errors.response.data.message });
        }
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCourse({ ...course, filename: file.name });
    } else {
      setCourse({ ...course, filename: "Choose file" });
    }
  };

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
          {course.err.map((err, index) => {
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
      {course.err !== null && error()}
      {course.loading === true ? (
        loadingSpinner()
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header">Auction</div>
                <div className="card-body">
                  <form onSubmit={(e) => submit(e)}>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="courseName">
                        Auction Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="courseName"
                        ref={(val) => {
                          form.current.courseName = val;
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="description">
                      description
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="description"
                        ref={(val) => {
                          form.current.description = val;
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="price">
                      price
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="price"
                        ref={(val) => {
                          form.current.price = val;
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="startDate">
                      startDate
                      </label>
                      <input
                        className="form-control"
                        type="Date"
                        id="startDate"
                        ref={(val) => {
                          form.current.startDate = val;
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="endDate">
                      endDate
                      </label>
                      <input
                        className="form-control"
                        type="Date"
                        id="endDate"
                        ref={(val) => {
                          form.current.endDate = val;
                        }}
                      />
                    </div>
                    <div className="mb-3 custom-file">
                      <input
                        className="custom-file-input"
                        type="file"
                        id="image"
                        ref={(val) => {
                          form.current.image = val;
                        }}
                        onChange={handleFileChange}
                      />
                      <label className="custom-file-label" htmlFor="image" data-browse="Browse">
                        {course.filename}
                      </label>
                    </div>
                    <button className="btn btn-primary form-control" type="submit">
                      Add Auction
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
