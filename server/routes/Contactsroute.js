import { Router } from "express";
import { verifyToken } from "../middlewares/Authmiddleware.js";
import { getAllContacts, getContactsForDMList, SearchContacts } from "../controllers/Contactscontroller.js";

const contactsRoutes = Router();

contactsRoutes.post("/search",verifyToken,SearchContacts)
contactsRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDMList)
contactsRoutes.get("/get-all-contacts",verifyToken,getAllContacts)

export default contactsRoutes;