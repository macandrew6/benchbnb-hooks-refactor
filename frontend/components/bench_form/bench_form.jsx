import React, { useState, useEffect, useRef } from "react";
import { withRouter, Redirect } from "react-router-dom";
import LoadingIcon from "../loading/loading_icon";

const BenchForm = ({ loading, createBench, lat, lng, history }) => {
  const [description, setDescription] = useState("");
  const [seating, setSeating] = useState(2);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const descRef = useRef(null);

  useEffect(() => {
    descRef.current.focus();
  }, []);

  const navigateToSearch = () => {
    history.push("/");
  };

  const update = field => {
    return e => {
      switch (field) {
        case "description":
          return setDescription(e.target.value);
        case "seating":
          return setSeating(e.target.value);
        default:
          return;
      }
    };
  };

  const handleFile = e => {
    const files = [];
    const urls = [];
    for (let i = 0; i < e.currentTarget.files.length; i++) {
      const file = e.currentTarget.files[i];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        files.push(file);
        urls.push(fileReader.result);
        setPhotoFiles(files);
        setPhotoUrls(urls);
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bench[description]", description);
    formData.append("bench[seating]", seating);
    formData.append("bench[lat]", lat);
    formData.append("bench[lng]", lng);

    if (photoFiles !== []) {
      photoFiles.forEach(photoFile => {
        formData.append("bench[photos][]", photoFile);
      });
    }

    createBench(formData).then(res => {
      let wildCard = res.bench.id;
      history.push(`/benches/${wildCard}`);
    });
  };

  const preview =
    photoUrls !== []
      ? photoUrls.map((photoUrl, i) => (
          <img
            src={photoUrl}
            key={i * performance.now()}
            height="250px"
            width="250px"
          />
        ))
      : null;

  if (loading) {
    return <LoadingIcon className="bench-form-container" />;
  }

  return (
    <div>
      <div className="bench-form-container">
        <form className="bench-form" onSubmit={handleSubmit}>
          <label htmlFor="description">
            Description
            <br />
            <input
              type="text"
              ref={descRef}
              onChange={update("description")}
              value={description}
              required
            />
          </label>
          <br />
          <label htmlFor="number of seats">
            Number of Seats
            <br />
            <input
              min="0"
              type="number"
              onChange={update("seating")}
              value={seating}
              required
            />
          </label>
          <br />
          <label htmlFor="latitude">
            Latitude
            <br />
            <input type="number" disabled value={lat} />
          </label>
          <br />
          <label htmlFor="longitude">
            Longitude
            <br />
            <input type="number" disabled value={lng} />
          </label>

          <div className="photo-input-container">
            {preview}
            <input type="file" multiple="multiple" onChange={handleFile} />
          </div>
          <br />
          <button className="btn" type="submit" multiple="multiple">
            Create Bench
          </button>
          <br />
          <button onClick={navigateToSearch}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(BenchForm);
