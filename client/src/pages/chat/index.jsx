import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainer from './components/empty-chat-container';
import ChatContainer from './components/chat-container';

function Chat() {


  const { userInfo, selectedChatType, isUploading, isDownloading, fileUploadProgress, fileDownloadProgress } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("please setup profile first");
      navigate("/profile");
    }
  })
  return (
    <div className='flex h-[100vh] overflow-hidden text-white'>
      {
        isUploading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className='text-5xl animate-pulse'>Uploading File</h5>
          {fileUploadProgress}%
        </div>
      }
      {
        isDownloading && <div className="h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
          <h5 className='text-5xl animate-pulse'>Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      }
      <ContactsContainer />
      {
        selectedChatType === undefined ? <EmptyChatContainer /> : <ChatContainer />
      }
      {/* <EmptyChatContainer/> */}
      {/* <ChatContainer/> */}
    </div>
  )
}

export default Chat
