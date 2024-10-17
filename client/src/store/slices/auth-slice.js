

export const createAuthSlice = (set)=>({
    userInfo:undefined,
    setUserInfo: (userInfo)=>set({userInfo})
    // isLogin:undefined,
    // setIsLogin: (isLogin)=>set({isLogin}),
});

// export const createLoginSlice = (set)=>({
//     isLogin:undefined,
//     setIsLogin: (isLogin)=>set({isLogin}),
// });