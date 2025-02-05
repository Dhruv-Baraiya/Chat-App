

export const createChatSlice = (set, get) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    directMessagesContacts: [],
    contactsFetched: false, 
    messagesFetched: false,
    isUploading: false,
    isDownloading: false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    channels:[],
    channelsFatched:false,
    setChannels:(channels)=>set({channels}),
    setIsUploading:(isUploading)=>set({isUploading}),
    setIsDownloading:(isDownloading)=>set({isDownloading}),
    setFileUploadProgress: (fileUploadProgress)=>set({fileUploadProgress}),
    setFileDownloadProgress: (fileDownloadProgress)=>set({fileDownloadProgress}),
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData, messagesFetched: false }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages, messagesFetched: true }),
    setDirectMessagesContacts: (directMessagesContacts) => set({directMessagesContacts, contactsFetched: true}),
    setChannnelsFatched:(channelsFatched)=>set({channelsFatched}),
    addChannel: (channel)=>{
        const channels = get().channels;
        set({channels: [channel,...channels]})
    },
    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [], }),
    addMessage: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages,
                {
                    ...message,
                    recipient:
                        selectedChatType === "channel" ? message.recipient : message.recipient._id,
                    sender:
                        selectedChatType === "channel" ? message.sender : message.sender._id,
                },
            ],
        });
    },
});