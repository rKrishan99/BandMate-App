import React, { useRef, useState } from "react";
import Navbar from "../../navbar/Navbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const BandProfile = () => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [changeProfileLoading, setChangeProfileLoading] = useState(false);
  const profileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState("");

  const [coverDialogOpen, setCoverDialogOpen] = useState(false);
  const [changeCoverLoading, setChangeCoverLoading] = useState(false);
  const coverInputRef = useRef(null);
  const [coverImage, setCoverImage] = useState("");

  {/* Profile Image */}
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      setImageURL(URL.createObjectURL(file)); // Set the image URL once
      setProfileDialogOpen(true); // Open the dialog
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleProfileChangeSave = async () => {
    if (!profileImage) return;

    setChangeProfileLoading(true);

    const formData = new FormData();
    formData.append("profileImage", profileImage);

    try {
      const response = await fetch(
        "http://your-backend-url/api/upload-profile-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageURL(data.newImageUrl); // Update to the new image URL
        setProfileImage(null); // Clear temporary image
        setProfileDialogOpen(false);
      } else {
        console.error("Failed to upload profile image");
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
    } finally {
      setChangeProfileLoading(false);
    }
  };

  const changeProfileLoad = () => {
    setChangeProfileLoading(true);

    setTimeout(() => {
      setChangeProfileLoading(false);
    }, 2000);
  };

  {/* Cover Image */}
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setCoverImage(file);
      setImageURL(URL.createObjectURL(file)); // Set the image URL once
      setCoverDialogOpen(true); // Open the dialog
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleCoverChangeSave = async () => {
    if (!coverImage) return;

    setChangeCoverLoading(true);

    const formData = new FormData();
    formData.append("coverImage", coverImage);

    try {
      const response = await fetch(
        "http://your-backend-url/api/upload-cover-image",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setImageURL(data.newImageUrl); // Update to the new image URL
        setCoverImage(null); // Clear temporary image
        setCoverDialogOpen(false);
      } else {
        console.error("Failed to upload Cover image");
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error("Error uploading Cover image:", error);
    } finally {
      setChangeCoverLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Overlay for Darken or Blur Background */}
      {profileDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}
      {coverDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}
      <div className="flex flex-col pb-10 lg:flex-row px-4 md:px-8 lg:px-cusPadding bg-background min-h-screen">
        {/* left part */}
        <div className="lg:w-[70%] mt-6 mx-auto max-w-full">
          {/* Profile details */}
          <div className="">
            <div className="relative">
              {/* Cover Image */}
              <img
                className="w-full h-[200px] cursor-pointer md:h-[300px] object-cover rounded-t-xl"
                src="./band-cover.jpg"
                alt="Band Cover"
                onClick={() => setCoverDialogOpen(true)}
              />
            </div>
            {/* Edit Cover Image */}
            <Dialog
                header=""
                visible={coverDialogOpen}
                onHide={() => {
                  setCoverDialogOpen(false);
                  setCoverImage(null);
                }}
                className="full mx-4 sm:mx-6 md:mx-8 md:w-[800px] lg:w-[1000px] h-auto bg-white rounded-xl p-6 md:p-10"
              >
                <div className="flex flex-col w-full justify-center items-center">
                  <h1 className="text-xl md:text-2xl">Update Cover</h1>
                  <div
                    className="m-4 md:m-10 flex items-center"
                    onClick={() => coverInputRef.current.click()}
                  >
                    {coverImage ? (
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt="Profile"
                        className="w-full md:w-[600px] lg:w-[900px] h-[150px] md:h-[200px] lg:h-[300px] object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-[200px] md:w-[600px] lg:w-[900px] h-[150px] md:h-[200px] lg:h-[300px] flex items-center bg-indigo-100 justify-center border-2 border-dashed rounded-lg border-gray-500 ">
                        <span className="font-bold">Choose a file</span>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={coverInputRef}
                      className="hidden"
                      onChange={handleCoverChange}
                    />
                  </div>
                  <Button
                    label="Save"
                    icon="pi pi-check"
                    loading={changeCoverLoading}
                    onClick={handleCoverChangeSave}
                    className="bg-blue-600 w-20 md:w-24 text-white rounded-md px-3 md:px-4 py-2"
                  />
                </div>
              </Dialog>
            <div className="bg-white flex flex-col px-6 md:px-8 py-6 rounded-b-xl relative">
              {/* Avatar Image */}
              <img
                className="w-24 h-24 md:w-32 md:h-32 lg:w-44 lg:h-44 rounded-full border-4 cursor-pointer border-white absolute -top-16 md:-top-32 left-6 md:left-8"
                src="./band-avatar.jpg"
                alt="Band Profile"
                onClick={() => setProfileDialogOpen(true)}
              />
              {/* Edit Avatar */}
              <Dialog
                header=""
                visible={profileDialogOpen}
                onHide={() => {
                  setProfileDialogOpen(false);
                  setProfileImage(null);
                }}
                className=" mx-10 w-[300px] sm:w-[400px] md:w-[500px] h-auto bg-white rounded-xl p-4 md:p-10"
              >
                <div className="flex flex-col w-full justify-center items-center">
                  <h1 className="text-xl md:text-2xl">Update Profile</h1>
                  <div
                    className="m-4 md:m-10 flex items-center"
                    onClick={() => profileInputRef.current.click()}
                  >
                    {profileImage ? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="Profile"
                        className="w-40 h-40 md:w-52 md:h-52 rounded-full"
                      />
                    ) : (
                      <div className=" flex items-center w-[200px] md:w-[300px] bg-indigo-100 justify-center border-2 border-dashed rounded-lg border-gray-500 h-[200px] md:h-[300px]">
                        <span className="font-bold">Choose a file</span>
                      </div>
                    )}

                    <input
                      type="file"
                      ref={profileInputRef}
                      className="hidden"
                      onChange={handleProfileChange}
                    />
                  </div>
                  <Button
                    label="Save"
                    icon="pi pi-check"
                    loading={changeProfileLoading}
                    onClick={handleProfileChangeSave}
                    className="bg-blue-600 w-20 md:w-24 text-white rounded-md px-3 md:px-4 py-2"
                  />
                </div>
              </Dialog>

              <div className="mt-4 lg:mt-10">
                {/* Band Name and Description */}
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                  Band Name
                </h1>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nulla consectetur aut itaque tempora praesentium, sit pariatur
                  in odit, et necessitatibus non molestias reprehenderit labore
                  sunt possimus rem! Quae, veritatis iusto.
                </p>
              </div>
            </div>
          </div>
          {/* Band posts */}
          <div>
            <div className="bg-cardBg p-6 md:p-8 rounded-xl mt-6"></div>
          </div>
        </div>
        {/* right part */}
        <div className="lg:w-[30%] mt-6 lg:ml-6">
          <div className="bg-cardBg flex p-6 md:p-8 flex-col rounded-xl">
            <div className="flex mb-6 gap-2 items-center bg-blue-700 cursor-pointer text-gray-800 hover:bg-blue-800 p-3 md:p-4 rounded-lg">
              <img
                className="w-5 h-5 md:w-6 md:h-6"
                src="./notification.png"
                alt="Notifications"
              />
              <span className="text-base md:text-lg text-white font-semibold">
                Notifications
              </span>
              <div className="bg-yellow-500 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
                <span className="text-xs text-gray-50">5</span>
              </div>
            </div>
            <div className="flex gap-2 items-center cursor-pointer text-gray-800 hover:bg-gray-100 p-3 md:p-4 rounded-lg">
              <img
                className="w-5 h-5 md:w-6 md:h-6"
                src="./create.png"
                alt="Post Ads"
              />
              <span className="text-base md:text-lg font-semibold">
                Post Ads
              </span>
            </div>
            <hr className="bg-slate-600 mb-4 mt-4" />
            <div className="flex gap-2 items-center cursor-pointer text-gray-800 hover:bg-gray-100 p-3 md:p-4 rounded-lg">
              <img
                className="w-5 h-5 md:w-6 md:h-6"
                src="./draft.png"
                alt="Draft"
              />
              <span className="text-base md:text-lg font-semibold">Draft</span>
            </div>
            <hr className="bg-slate-600 mb-4 mt-4" />
            <div className="flex gap-2 items-center cursor-pointer text-gray-800 hover:bg-gray-100 p-3 md:p-4 rounded-lg">
              <img
                className="w-5 h-5 md:w-6 md:h-6"
                src="./edit.png"
                alt="Draft"
              />
              <span className="text-base md:text-lg font-semibold">Edit Info</span>
            </div>
            <div className="flex mt-6 gap-2 items-center bg-red-600 cursor-pointer text-gray-800 hover:bg-red-700 p-3 md:p-4 rounded-lg">
              <img
                className="w-5 h-5 md:w-6 md:h-6"
                src="./logout-white.png"
                alt="Logout"
              />
              <span className="text-base md:text-lg text-white font-semibold">
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandProfile;
