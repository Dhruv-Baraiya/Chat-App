// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { useState, useEffect } from "react"
// import { FaPlus } from "react-icons/fa"
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import Lottie from "react-lottie"
// import { animationDefaultOptions, getColor } from '@/lib/utils'
// import apiClient from "@/lib/api-client"
// import { SEARCH_CONTACT_ROUTE } from "@/utils/constants"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Avatar, AvatarImage } from "@/components/ui/avatar"
// import { useAppStore } from "@/store"



// const NewDM = () => {
//     const [image, setImage] = useState({});
//     const imgBaseURL = import.meta.env.VITE_CLOUDINARY_URL;

//     const { setSelectedChatType, setSelectedChatData } = useAppStore();
//     const [searchedContacts, setSearchedContact] = useState([])
//     const [openNewContactModal, setOpenNewContactModal] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const searchContacts = async (searchTerm) => {
//         try {
//             if (searchTerm.length > 0) {
//                 const response = await apiClient.post(SEARCH_CONTACT_ROUTE, { searchTerm }, { withCredentials: true });
//                 if (response.status === 200 && response.data.contacts) {
//                     setSearchedContact(response.data.contacts);
//                 }
//             } else {
//                 setSearchedContact([]);
//             }
//         } catch (error) {

//         }
//     }

//     useEffect(() => {
//         const newImages = {};
//         searchedContacts.forEach((contact) => {
//             if (contact.image) {
//                 newImages[contact._id] = `${imgBaseURL}/${contact.image}`;
//             }
//         });
//         setImage(newImages);
//     }, [searchedContacts]);

//     const selectNewContact = (contact) => {
//         setOpenNewContactModal(false);
//         setSelectedChatType("contact");
//         setSelectedChatData(contact);
//         setSearchedContact([]);
//     };

//     return (
//         <>
//             <TooltipProvider>
//                 <Tooltip>
//                     <TooltipTrigger>
//                         <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" onClick={() => setOpenNewContactModal(true)} />
//                     </TooltipTrigger>
//                     <TooltipContent className="bg-[#1b1c1e] border-none mb-2 p-3 text-white">
//                         <p>Select New Contact</p>
//                     </TooltipContent>
//                 </Tooltip>
//             </TooltipProvider>
//             <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
//                 <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
//                     <DialogHeader>
//                         <DialogTitle>Please Select contact</DialogTitle>
//                         <DialogDescription>

//                         </DialogDescription>
//                     </DialogHeader>
//                     <div>
//                         <Input placeholder="Search Contact" className="rounded-lg bg-[#2c2e3b] border-none" onChange={(e) => {setSearchTerm(e.target.value);searchContacts(e.target.value);}} />
//                     </div>

//                     {
//                         searchTerm && searchedContacts.length ===0? (
//                             <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center mt-5  duration-1000 transition-all'>
//                                 <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
//                                     <h3 className='poppins-medium'>No match found</h3>
//                                 </div>
//                             </div>
//                         ) :(
//                         searchedContacts.length > 0 ? (
//                             <ScrollArea className='h-[250px]'>
//                                 <div className="flex flex-col gap-5">
//                                     {
//                                             searchedContacts.map((contact) => (
//                                                 <div className="flex gap-3 items-center cursor-pointer" key={contact._id} onClick={() => selectNewContact(contact)}>
//                                                     <div className="w-12 h-12 relative">
//                                                         <Avatar className="h-12 w-12 rounded-full overflow-hidden">
//                                                             {image[contact._id] ? (
//                                                                 <AvatarImage src={image[contact._id]} alt="profile" className="object-cover h-full w-full bg-black" />
//                                                             ) : (
//                                                                 <div
//                                                                     className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full shadow-lg ${getColor(
//                                                                         contact.color
//                                                                     )}`}
//                                                                 >
//                                                                     {contact.firstName ? contact.firstName[0] : contact.email[0]}
//                                                                 </div>
//                                                             )}
//                                                         </Avatar>
//                                                     </div>
//                                                     <div className="flex flex-col">
//                                                         <span>
//                                                             {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email}
//                                                         </span>
//                                                         <span className="text-xs">
//                                                             {contact.email}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             ))
//                                     }
//                                 </div>
//                             </ScrollArea>):(<div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center mt-5  duration-1000 transition-all'>
//                             <Lottie isClickToPauseDisabled={true} height={100} width={100} options={animationDefaultOptions} />
//                             <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
//                                 <h3 className='poppins-medium'>
//                                     Hi <span className='text-purple-500'>!</span> Search New
//                                     <span className='text-purple-500'> Contact. </span>
//                                 </h3>
//                             </div>
//                         </div>)
//                     )
//                 }
//                 </DialogContent>
//             </Dialog>

//         </>
//     )
// }

// export default NewDM
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Lottie from "react-lottie"
import { animationDefaultOptions, getColor } from '@/lib/utils'
import apiClient from "@/lib/api-client"
import { SEARCH_CONTACT_ROUTE } from "@/utils/constants"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useAppStore } from "@/store"
import { Loading2 } from "@/components/ui/spinner"

const NewDM = () => {
    const [image, setImage] = useState({});
    const imgBaseURL = import.meta.env.VITE_CLOUDINARY_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [searchedContacts, setSearchedContact] = useState([]);
    const [openNewContactModal, setOpenNewContactModal] = useState(false);

    const searchContacts = async (searchTerm) => {
        setLoading(true); // Set loading to true when search starts
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(SEARCH_CONTACT_ROUTE, { searchTerm }, { withCredentials: true });
                if (response.status === 200 && response.data.contacts) {
                    setSearchedContact(response.data.contacts);
                }
            } else {
                setSearchedContact([]);
            }
        } catch (error) {
            // Handle error
        }
        setLoading(false); // Set loading to false when search completes
    };

    useEffect(() => {
        const newImages = {};
        searchedContacts.forEach((contact) => {
            if (contact.image) {
                newImages[contact._id] = `${imgBaseURL}/${contact.image}`;
            }
        });
        setImage(newImages);
    }, [searchedContacts]);

    const selectNewContact = (contact) => {
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContact([]);
        setSearchTerm("");
    };

    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" onClick={() => setOpenNewContactModal(true)} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1b1c1e] border-none mb-2 p-3 text-white">
                        <p>Select New Contact</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please Select Contact</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input 
                            placeholder="Search Contact" 
                            className="rounded-lg bg-[#2c2e3b] border-none" 
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                searchContacts(e.target.value);
                            }} 
                        />
                    </div>
                    
                    {loading ? (
                        <Loading2/>
                    ) : searchTerm && searchedContacts.length === 0 ? (
                        <div className='flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center mt-5  duration-1000 transition-all'>
                            <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
                                <h3 className='poppins-medium'>No match found</h3>
                            </div>
                        </div>
                    ) : (
                        searchedContacts.length > 0 ? (
                            <ScrollArea className='h-[250px]'>
                                <div className="flex flex-col gap-5">
                                    {searchedContacts.map((contact) => (
                                        <div className="flex gap-3 items-center cursor-pointer" key={contact._id} onClick={() => selectNewContact(contact)}>
                                            <div className="w-12 h-12 relative">
                                                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                    {image[contact._id] ? (
                                                        <AvatarImage src={image[contact._id]} alt="profile" className="object-cover h-full w-full bg-black" />
                                                    ) : (
                                                        <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full shadow-lg ${getColor(contact.color)}`}>
                                                            {contact.firstName ? contact.firstName[0] : contact.email[0]}
                                                        </div>
                                                    )}
                                                </Avatar>
                                            </div>
                                            <div className="flex flex-col">
                                                <span>
                                                    {contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : contact.email}
                                                </span>
                                                <span className="text-xs">{contact.email}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        ) : (
                            <div className='flex-1 md:flex flex-col justify-center items-center mt-5 md:mt-0 duration-1000 transition-all'>
                                <Lottie isClickToPauseDisabled={true} height={100} width={100} options={animationDefaultOptions} />
                                <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center'>
                                    <h3 className='poppins-medium'>
                                        Hi <span className='text-purple-500'>!</span> Search New
                                        <span className='text-purple-500'> Contact. </span>
                                    </h3>
                                </div>
                            </div>
                        )
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default NewDM;
