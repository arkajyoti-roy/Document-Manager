import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import "./Dis.css";
import { imageDb } from "./firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// import { toast } from "react-toastify";

const Display = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    const imgRef = ref(imageDb, `iimps/${v4()}`);
    uploadBytes(imgRef, img).then(() => {
      fetchImages(); // Fetch images after upload
    });
  };

  const fetchImages = () => {
    listAll(ref(imageDb, "iimps")).then((imgs) => {
      const urls = [];
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          urls.push(url);
          if (urls.length === imgs.items.length) {
            setImgUrl(urls);
          }
        });
      });
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User is logged out");
        }
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="justify-center text-center">
        {userDetails ? (
          <>
          <div>
            <h1>Welcome {userDetails.name}</h1>
            <h2>Email: {userDetails.email}</h2>
            <h2>Phone: {userDetails.phone}</h2>
            <button className="bg-emerald-900">LOG OUT</button>

            </div>
            <br />
            <br />
            <br />
            <div className="uplo">
        <div className="form ">
          <span className="form-title">Upload your file</span>
          <p className="form-paragraph">File should be an image</p>
          <label htmlFor="file-input" className="drop-container">
            <span className="drop-title">Drop files here</span>
            or
            <input
              type="file"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
              accept="image/*"
              required
              id="file-input"
            />
          </label>{" "}
          
        </div>
        <br />
         
          
        <button onClick={handleClick}>Button</button> <br />
      </div>
          </>




        ) : (
          <p>Loading...</p>
        )}
      </div>
      
      <br />
      <br />
      <br />
      <div>
        {imgUrl.map((dataVal, index) => (
          <div  key={index}>
            <img className="impd" src={dataVal} alt="" height="50px" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
