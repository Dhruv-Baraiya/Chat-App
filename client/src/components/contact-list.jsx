import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import React, { useState } from 'react'

const ContactList = ({ contacts, isChannel = false }) => {

    const { selectedChatData, setSelectedChatData, selectedChatType, setSelectedChatType, setSelectedChatMessages } = useAppStore();
    // const [image, setImage] = useState(null);
    const imgBaseURL = import.meta.env.VITE_CLOUDINARY_URL;
    // useEffect(() => {
    //     if (selectedChatData.image) {
    //       setImage(`${imgBaseURL}/${selectedChatData.image}`);  // Construct the image URL using public_id
    //     }
    //   }, [selectedChatData]);

    const handleClick = (contact) => {
        if (isChannel) setSelectedChatType("channel");
        else setSelectedChatType("contact");
        setSelectedChatData(contact);
        // if (selectedChatData && selectedChatData._id !== contact._id) {
        //     setSelectedChatMessages([]);
        // }
    }
    return (
        <div className="mt-5">{
            contacts.map(contact => (<div key={contact._id} className={`pl-10  py-2 transition-all duration-300 cursor-pointer ${selectedChatData && (selectedChatData._id === contact._id) ? "bg-[#fff]/20 hover:bg-[#ffffff]/20 mb-1" : "bg-[#f1f1f100] mb-1"} hover:bg-[#fff]/20 transition-all duration-300`} onClick={() => handleClick(contact)}>
                <div className="flex gap-5 items-center justify-start  text-neutral-300">
                    {
                        !isChannel && (
                            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                {contact.image ? (
                                    <AvatarImage src={`${imgBaseURL}/${contact.image}`} alt="profile" className="object-cover h-full w-full bg-black rounded-full" />
                                ) : (
                                    <div className={`${selectedChatData && selectedChatData._id === contact._id ? getColor(contact.color):getColor(contact.color)} uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full shadow-lg `}>
                                        {contact.firstName ? contact.firstName[0] : contact.email[0]}
                                    </div>
                                )}
                            </Avatar>
                        )
                    }
                    {isChannel && <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">#</div>}
                    {isChannel ?<span>{contact.name}</span>:<span>{`${contact.firstName} ${contact.lastName}`}</span>}
                </div>
            </div>))}

        </div>
    )
}

export default ContactList
