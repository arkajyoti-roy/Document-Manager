import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import "./Dis.css";
import { useNavigate } from "react-router-dom";

import { imageDb } from "./firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
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

const handelLogout = async ()=>{
  try {
    await auth.signOut();
    toast.success("Logout Successfully!", {
      position: 'top-right'
    });
    navigate("/login");
  } catch (error) {
    console.error(error.message);
  }
}


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="justify-center text-center">
        {userDetails ? (
          <>
            {/* <div>
              <h1>Welcome {userDetails.name}</h1>
              <h2>Email: {userDetails.email}</h2>
              <h2>Phone: {userDetails.phone}</h2>
              <button className="bg-emerald-900">LOG OUT</button>
            </div> */}

            <header className="text-gray-600 body-font">
              <div className="container mx-auto flex flex-wrap p-5 gap-80 flex-col md:flex-row items-center shad	">
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
                  Hello {userDetails.name}!
                </h1>

                {/* {!isDivVisible && (
        <button onClick={handleShowClick}>Show Div</button> */}
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
                    <button onClick={handelLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
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
                    <button onClick={handleClick}>Submit</button> <br />
                  </div>
                  <br />
                </div>
              </div>
            )}
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
          <div key={index}>
            <img className="impd" src={dataVal} alt="" height="50px" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Display;
