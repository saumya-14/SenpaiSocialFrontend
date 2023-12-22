import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {_id:"6544d83a4a9a0b0dc0415c43",
  username:"saumya",
  email:"saumya@gmail.com",
  password:"$2b$10$/bJ8xCl5gibWPmyx.0ZSyuz/Nv4LMmf9jwm0XVAsz5CMSH7K6SSzS",
  profilePicture:"person/image4.avif",
  coverPicture:"post/post3.jpg",
  followers:["6544d82c4a9a0b0dc0415c41"],
  followings:[]
},
  
  isFetching: false,
  error: false, 
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => { 
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider value={{ 
      user: state.user,
      isFetching: state.isFetching,
      error: state.error, 
      dispatch,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
