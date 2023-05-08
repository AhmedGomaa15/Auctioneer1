
import { useEffect, useState } from "react";
import "./updateBidder.css";
import axios from "axios";
import { getAuthToken } from "../../../services/auth";
import { useParams } from "react-router-dom";

export const UpdateBidder = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [price, setPrice] = useState('');
  const { token, user } = getAuthToken();
  const [specificUser, setSpecificUser] = useState({
    loading: true,
    result: {},
    err: null,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/course/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourse({
          ...course,
          result: response.data,
          loading: false,
          err: [],
        },
        setSpecificUser({ ...specificUser, result: response.data, loading: false, err: null })
        );
        console.log(response.data);
      })
      .catch((errors) => {
        setCourse({
          ...course,
          result: {
            coursenNme: "",
            description: "",
            price: "",
          },
          loading: false,
          err: [{ msg: errors.response.data.message }],
        });
        setSpecificUser({
          ...specificUser,
          result: {
            coursenNme: "",
            description: "",
            price: "",
          },
          loading: false,
          err: [{ msg: errors.response.data.message }],
        });
      });
  
  }, [id]);

  const handlePriceChange = e => {
    setPrice(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = { price };
    const currentPrice = specificUser.result.price;
    if (parseFloat(price) <= parseFloat(currentPrice)) {
      alert('Your bid must be greater than the current bid.');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/api/course/updateCourse/${id}`, data , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSpecificUser({ ...specificUser, loading: false, err: null});
        alert('Auction bid updated successfully!');
        window.location.reload();
      })
      .catch((errors) => {
        setSpecificUser({ ...specificUser, loading: false, err: [{ msg: errors.response.data.message }] });
      });
      setCourse({ ...course, price });
    } catch (err) {
      console.log(err);
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
          {specificUser.err.map((err, index) => {
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
      {specificUser.err !== null && error()}
      {specificUser.loading === true ? (
        loadingSpinner()
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header">Auction Info</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="small mb-1">Name</label>
                    <input className="form-control" type="text" readOnly value={specificUser.result.courseName} />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1">description</label>
                      <input className="form-control" type="text" readOnly value={specificUser.result.description} />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1">Current price</label>
                      <input className="form-control" type="text" readOnly value={specificUser.result.price} />
                    </div>
                  </div>
              <div className="mb-3">
                <label className="small mb-1">Bid</label>
                <input className="form-control" type="text" value={price} onChange={handlePriceChange} />
                <br></br>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

)}
</>

  );
}
