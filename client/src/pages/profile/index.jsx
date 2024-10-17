// export default Profile
import { useAppStore } from '@/store';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { colors, getColor } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import apiClient from '@/lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE, REMOVE_PROFILE_IMAGE_ROUTE } from '@/utils/constants';
import Loading from '@/components/ui/spinner';

function Profile() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);
  const [loading,setLoading] = useState(false)
  const imgBaseURL = import.meta.env.VITE_CLOUDINARY_URL 

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${imgBaseURL}/${userInfo.image}`);  // Construct the image URL using public_id
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error('First Name is required');
      return false;
    }
    if (!lastName) {
      toast.error('Last Name is required');
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success('Profile Updated Successfully');
          navigate('/chat');
        }
      } catch (error) {
        toast.error("Problem in setup profile")
        console.log(error);
      }
    }
  };

  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate('/chat');
    } else {
      toast.error('Please set up the profile first');
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  // const handleImageChange = async (event) => {
  //   event.preventDefault();
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = async () => {
  //     const base64Image = reader.result;
  //     setImage(base64Image);

  //     try {
  //       const mail = userInfo.email;
  //       const response = await apiClient.post(
  //         ADD_PROFILE_IMAGE_ROUTE,
  //         { image: base64Image, mail },
  //         { withCredentials: true }
  //       );

  //       if (response.status === 200 ) {
  //         console.log(response.data);
          
  //         setUserInfo({ ...userInfo, image: response.data.image });

  //         console.log(userInfo.image);
  //         toast.success('Image uploaded successfully');
  //       } else {
  //         toast.error('Failed to upload the image');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error('An error occurred during image upload');
  //     }
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   } else {
  //     toast.error('No file selected');
  //   }
  // };


  const handleImageChange = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
      setLoading(true)

      try {
        const mail = userInfo.email;
        const response = await apiClient.post(
          ADD_PROFILE_IMAGE_ROUTE,
          { image: base64Image, mail },
          { withCredentials: true }
        );

        if (response.status === 200 ) {
          // Set the new image with a cache-busting timestamp
          setImage(`${imgBaseURL}/${response.data.image}?${new Date().getTime()}`);
          setUserInfo({ ...userInfo, image: response.data.image });
          // console.log(image)
          setLoading(false)
          toast.success('Image uploaded successfully');
        } else {
          toast.error('Failed to upload the image');
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred during image upload');
      }
    };

    if (file) {
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      toast.error('No file selected');
    }
};


  const handleDeleteImage = async () => {
    setLoading(true)
    try {
      const response = await apiClient.post(REMOVE_PROFILE_IMAGE_ROUTE,{}, { withCredentials: true });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        setImage(null);
        setLoading(false)
        toast.success('Profile image removed successfully');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while removing the image');
    }
  };

  if(loading){
    return <Loading/>
  }

  return (
    <div className="bg-gradient-to-r  h-[100vh] flex items-center justify-center flex-col gap-10">
  <div className="flex flex-col gap-10 w-[80vw] md:w-max border-2 border-purple-50 shadow-2xl backdrop-blur-lg rounded-3xl p-6">
    <div>
      <IoArrowBack className="text-4xl lg:text-6xl text-purple-500 cursor-pointer transition-transform hover:scale-105" onClick={handleNavigate} />
    </div>
    <div className="grid grid-cols-2">
      <div
        className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center transition-transform hover:scale-105"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg">
          {image ? (
            <AvatarImage src={image} alt="profile" className="object-cover h-full w-full bg-black" />
          ) : (
            <div
              className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full shadow-lg ${getColor(
                selectedColor
              )}`}
            >
              {firstName ? firstName[0] : userInfo.email[0]}
            </div>
          )}
        </Avatar>
        {hovered && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full transition-opacity opacity-0 hover:opacity-100"
            onClick={image ? handleDeleteImage : handleFileInputClick}
          >
            {image ? (
              <FaTrash className="text-white text-3xl cursor-pointer hover:rotate-12 transition-transform" />
            ) : (
              <FaPlus className="text-white text-3xl cursor-pointer hover:rotate-12 transition-transform" />
            )}
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
          name="profile-image"
          accept=".png, .jpg, .jpeg, .webp, .svg, .ico"
        />
      </div>
      <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
        <div className="w-full">
          <Input
            placeholder="Email"
            type="email"
            disabled
            value={userInfo.email}
            className="rounded-lg p-6 bg-[#2c2e3b] text-white/90 shadow-md"
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="rounded-lg p-6 bg-[#2c2e3b] text-white/90 shadow-md"
          />
        </div>
        <div className="w-full">
          <Input
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="rounded-lg p-6 bg-[#2c2e3b] text-white/90 shadow-md"
          />
        </div>
      </div>
    </div>
    <div className="w-full flex gap-5 items-center justify-center">
      {colors.map((color, index) => (
        <div
          className={`${color} h-8 w-8 rounded-full cursor-pointer transition-transform transform-gpu hover:scale-110 duration-300 ${
            selectedColor === index ? 'outline outline-white/100 outline-2' : ''
          }`}
          onClick={() => {
            setSelectedColor(index);
          }}
          key={index}
        />
      ))}
    </div>
    <div className="w-full">
      <Button className="h-16 w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-700 hover:to-purple-900 text-white transition-all duration-300 transform hover:scale-105" onClick={saveChanges}>
        Save Changes
      </Button>
    </div>
  </div>
</div>

  );
}

export default Profile;
