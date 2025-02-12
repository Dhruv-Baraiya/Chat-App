import { RiCloseFill } from 'react-icons/ri'
import React from 'react'
import { useAppStore } from '@/store'
import { useState, useEffect } from "react"
import { getColor } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'


const ChatHeader = () => {

  const [image, setImage] = useState(null);
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  const imgBaseURL = import.meta.env.VITE_CLOUDINARY_URL;

  useEffect(() => {
    if (selectedChatData.image) {
      setImage(`${imgBaseURL}/${selectedChatData.image}`);  // Construct the image URL using public_id
    }
  }, [selectedChatData]);

  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
      <div className='flex gap-5 items-center  w-full justify-between'>
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative">
            {
              selectedChatType === "contact" ?(<Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {image ? (
                  <AvatarImage src={image} alt="profile" className="object-cover h-full w-full bg-black rounded-full" />
                ) : (
                  <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full shadow-lg ${getColor(selectedChatData.color)}`}>
                    {selectedChatData.firstName ? selectedChatData.firstName[0] : selectedChatData.email[0]}
                  </div>
                )}
              </Avatar>)
              
              :(<div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">#</div>)
            }
            
          </div>
          <div>
            {selectedChatType==="channel" && selectedChatData.name}
            {
            selectedChatType === "contact" && selectedChatData.firstName?
            `${selectedChatData.firstName}  ${selectedChatData.lastName}`:selectedChatData.email
          }</div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={closeChat}>
            <RiCloseFill className='text-3xl' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
