import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import "./Dis.css";
// import { storage } from './firebaseConfig';
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { imageDb } from "./firebase";
import { saveAs } from "file-saver";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { toast } from "react-toastify";

const Display = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  const navigate = useNavigate();
  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleShowClick = () => {
    setIsDivVisible(true);
  };

  const handleHideClick = () => {
    setIsDivVisible(false);
  };

  const handleClick = () => {
    handleHideClick();
    const imgRef = ref(imageDb, `iimps/${v4()}`);
    uploadBytes(imgRef, img).then(() => {
      fetchImages(); // Fetch images after upload
      toast.success("Uploaded Successfully!", {
        position: "top-right",
      });
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
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
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

  const handleDelete = async (imageUrl) => {
    if (!imageUrl) {
      console.error("Invalid URL:", imageUrl);
      alert("Invalid URL. Please try again.");
      return;
    }

    try {
      // Find the reference of the image to delete
      const imgRef = ref(imageDb, imageUrl);

      // Delete the image from Firebase Storage
      await deleteObject(imgRef);

      // Update the state to remove the deleted image URL
      setImgUrl(imgUrl.filter((url) => url !== imageUrl));
      alert("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Error deleting file: " + error.message);
    }
  };

  const handelLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Logout Successfully!", {
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadImage = (url) => {
    saveAs(url, "downloaded_image");
  };

  const [showFirstDiv, setShowFirstDiv] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstDiv(false);
    }, 2900);

    return () => clearTimeout(timer);
  }, []);
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "black",
  };

  return (
    <>
      <div>
        {userDetails ? (
          <>
            <header className="text-gray-600 body-font">
              <div className="container w-full shad gap-56 mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  <span className="ml-3 text-xl">Document Manager</span>
                </a>
                <h1 className="font-semibold text-2xl text-black">
                  Hello, {userDetails.name}!
                </h1>
                <div className="flex flex-row gap-44">
                  <div>
                    <button onClick={handleShowClick}>
                      <svg
                        height="2.5em"
                        viewBox="0 0 1024.00 1024.00"
                        className="icon"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                        transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
                        stroke="#000000"
                        strokeWidth="0.01024"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          stroke="#fcfcfc"
                          strokeWidth="16.384"
                        >
                          <path
                            d="M819.5 783.7h-51.3c-16.6 0-30 13.4-30 30s13.4 30 30 30h51.3c16.6 0 30-13.4 30-30s-13.5-30-30-30zM665.7 783.7H143.9c-16.6 0-30 13.4-30 30s13.4 30 30 30h521.8c16.6 0 30-13.4 30-30s-13.5-30-30-30z"
                            fill="#657671"
                          />
                          <path
                            d="M834.7 940.7H230.1c-23.9 0-43.5-19.6-43.5-43.5s19.6-43.5 43.5-43.5h604.6c23.9 0 43.5 19.6 43.5 43.5s-19.5 43.5-43.5 43.5z"
                            fill="#9a7f74"
                          />
                          <path
                            d="M791.8 409.6H665.7c-16.6 0-30 13.4-30 30s13.4 30 30 30h126.2c41 0 74.4 33.4 74.4 74.4v281.3c0 41-33.4 74.4-74.4 74.4H232.4c-41 0-74.4-33.4-74.4-74.4V544c0-41 33.4-74.4 74.4-74.4h139.3c16.6 0 30-13.4 30-30s-13.4-30-30-30H232.4C158.3 409.6 98 469.9 98 544v281.3c0 74.1 60.3 134.4 134.4 134.4h559.4c74.1 0 134.4-60.3 134.4-134.4V544c0-74.1-60.3-134.4-134.4-134.4z"
                            fill="#000000"
                          />
                          <path
                            d="M362.3 272.1l118.8-118.8v550.9c0 16.6 13.4 30 30 30s30-13.4 30-30V153.3l118.8 118.8c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.7-11.7 11.7-30.7 0-42.4L552.6 80c-11.1-11.1-25.9-17.2-41.5-17.2-15.7 0-30.4 6.1-41.5 17.2L319.9 229.7c-11.7 11.7-11.7 30.7 0 42.4s30.7 11.7 42.4 0z"
                            fill="#000000"
                          />
                        </g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M819.5 783.7h-51.3c-16.6 0-30 13.4-30 30s13.4 30 30 30h51.3c16.6 0 30-13.4 30-30s-13.5-30-30-30zM665.7 783.7H143.9c-16.6 0-30 13.4-30 30s13.4 30 30 30h521.8c16.6 0 30-13.4 30-30s-13.5-30-30-30z"
                            fill="#657671"
                          />
                          <path
                            d="M834.7 940.7H230.1c-23.9 0-43.5-19.6-43.5-43.5s19.6-43.5 43.5-43.5h604.6c23.9 0 43.5 19.6 43.5 43.5s-19.5 43.5-43.5 43.5z"
                            fill="#9a7f74"
                          />
                          <path
                            d="M791.8 409.6H665.7c-16.6 0-30 13.4-30 30s13.4 30 30 30h126.2c41 0 74.4 33.4 74.4 74.4v281.3c0 41-33.4 74.4-74.4 74.4H232.4c-41 0-74.4-33.4-74.4-74.4V544c0-41 33.4-74.4 74.4-74.4h139.3c16.6 0 30-13.4 30-30s-13.4-30-30-30H232.4C158.3 409.6 98 469.9 98 544v281.3c0 74.1 60.3 134.4 134.4 134.4h559.4c74.1 0 134.4-60.3 134.4-134.4V544c0-74.1-60.3-134.4-134.4-134.4z"
                            fill="#000000"
                          />
                          <path
                            d="M362.3 272.1l118.8-118.8v550.9c0 16.6 13.4 30 30 30s30-13.4 30-30V153.3l118.8 118.8c5.9 5.9 13.5 8.8 21.2 8.8s15.4-2.9 21.2-8.8c11.7-11.7 11.7-30.7 0-42.4L552.6 80c-11.1-11.1-25.9-17.2-41.5-17.2-15.7 0-30.4 6.1-41.5 17.2L319.9 229.7c-11.7 11.7-11.7 30.7 0 42.4s30.7 11.7 42.4 0z"
                            fill="#000000"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div>
                    {/* )} */}
                    <button
                      onClick={handelLogout}
                      className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    >
                      Log Out
                      <svg
                        fill="#000000"
                        height="2.2em"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </header>
            <br />
            <br />
            <br />
            {isDivVisible && (
              <div>
                <div className="uploo">
                  <div className="form foxx ">
                    <button
                      style={{ marginLeft: "90%" }}
                      onClick={handleHideClick}
                    >
                      x
                    </button>
                    <br />
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
                    <div className="flex items-center justify-center pt-5 ">
                      <button
                        onClick={handleClick}
                        className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer text-gray-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                      >
                        Upload
                        <svg
                          className="w-5 h-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    {/* <button onClick={handleClick}>Submit</button> <br /> */}
                  </div>
                  <br />
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={containerStyle}>
            <Loader />
          </div>
        )}
      </div>
      <br />
      <br />
      {/* <img className="impd" src={dataVal} alt="" height="50px" /> */}
      <br />
      <div className="flex flex-row gap-3">
        {imgUrl.map((url, index) => (
          <div key={index}>
            
            <img className="impd" src={url} alt={`Image ${index}`} />
   
            <div>
              <button
                onClick={() => downloadImage(url)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 mr-2 -ml-1"
                >
                  <path
                    d="M12 4v12m8-8l-8 8-8-8"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                Download
              </button>

              <button
                onClick={() => handleDelete(url)}
                className="inline-flex items-center px-6 py-3 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-base font-medium rounded-md shadow-sm hover:-translate-y-1 hover:scale-110"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Display;
