import { create } from "zustand";
import { createAuthSlice} from "./slices/auth-slice";

// , createLoginSlice 


export const useAppStore = create()((...a)=>({
    ...createAuthSlice(...a),
}));

