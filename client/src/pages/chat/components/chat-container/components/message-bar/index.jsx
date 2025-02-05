import { useSocket } from '@/context/SocketContext';
import apiClient from '@/lib/api-client';
import { useAppStore } from '@/store';
import { UPLOAD_FILE_ROUTE } from '@/utils/constants';
import EmojiPicker from 'emoji-picker-react';
import { document } from 'postcss';
import React, { useEffect, useRef, useState } from 'react'
import { GrAttachment } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5';
import { RiEmojiStickerFill, RiEmojiStickerLine } from 'react-icons/ri';
import { toast } from 'sonner';

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const { selectedChatData, selectedChatType, userInfo, setIsUploading, setFileUploadProgress } = useAppStore();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    addEventListener("mousedown", handleClickOutside);
    return () => {
      removeEventListener("mousedown", handleClickOutside);
    }
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  }

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Please write something before sending!");
      return;
    }
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined
      })
      // console.log("inside emit");
    }
  }

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // const handleAttachmentChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.size <= 10 * 1024 * 1024) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('file', file);
  
  //       // Call the backend API to upload the file
  //       const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
  //         withCredentials: true,
  //         // headers: {
  //         //   'Content-Type': 'multipart/form-data',
  //         // },
  //       });
  
  //       if (response.status === 200 && response.data) {
  //         // After successful upload, emit message to socket
  //         if (selectedChatType === "contact") {
  //           socket.emit("sendMessage", {
  //             sender: userInfo.id,
  //             content: undefined, // No text content
  //             recipient: selectedChatData._id,
  //             messageType: "file",
  //             fileUrl: response.data.fileUrl // Assuming file URL is returned from the backend
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.error("File upload error:", error);
  //     }
  //   } else {
  //     toast.error('File is too large. Select a file under 10 MB.');
  //   }
  // };
  
  const handleAttachmentChange = async (event) => {
    try {
    const file = event.target.files[0];
    // console.log(file)
    if (file && file.size <= 10 * 1024 * 1024) {
    // if(file){}
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
  
        // Call the backend API to upload the file
        const response = await apiClient.post(UPLOAD_FILE_ROUTE,formData,{withCredentials:true,timeout:30000, onUploadProgress:data=>{setFileUploadProgress(Math.round(100*data.loaded)/data.total)}});
  
        if (response.status === 200 && response.data) {
          setIsUploading(false);
          // After successful upload, emit message to socket
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined, // No text content
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: response.data.filePath // Assuming file URL is returned from the backend
            });
          }
        }
      }
      else{
        setIsUploading(false)
        toast.error('File is too large. Select a file under 10 MB.');
      }
      } catch (error) {
        setIsUploading(false)
        console.error("File upload error:", error);
      }
  }; 

  return (
    <div className='h-[10vh] bg-[#1c1d25] flex items-center justify-center px-8 mb-6 gap-6'>
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input type="text" className='flex-1 p-4 bg-transparent rounded-md focus:border-none focus:outline-none' placeholder='Enter Message' value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleAttachmentClick}>
          <GrAttachment className='text-2xl' />
        </button>
        <input type='file' className='hidden' ref={fileInputRef} onChange={handleAttachmentChange} />
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={() => setEmojiPickerOpen(true)}>
            {/* <RiEmojiStickerFill className='text-2xl'/> */}
            <RiEmojiStickerLine className='text-2xl' />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme='dark' open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
          </div>
        </div>
      </div>
      <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-4 hover:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleSendMessage}>
        <IoSend className='text-2xl' />
      </button>
    </div>
  )
}

export default MessageBar
