import { SetStateAction, createContext, useEffect, useState } from "react";


export interface User {
  id: number | undefined
  username: string | undefined
}

interface UserContext {
    activeUser: User | undefined
    setActiveUser<SetStateAction> (user: User):void
    // add here types of methods of the contextProvider
}

const defaultUserContext: UserContext = {
  activeUser: undefined,
  setActiveUser: () => {},
    // add here more methods to the contextProvider
} 

export const ActiveUserContext = createContext<UserContext>(defaultUserContext) 

type UserContextProviderProps = { children: React.ReactNode }

export const ActiveUserContextProvider:React.FC<UserContextProviderProps> = ({children}) => {

  const [activeUser, setActiveUser] = useState<User | undefined>()

  useEffect((): void => {
   
    selectUser()
    //1 foundUser => loadFromLocalStorage (key: string)
    //2 look if foundUser is part of groupUrl )
    //3 setActiveUser(foundUser)
  }, [])

  function selectUser() {
    try {
      setActiveUser(undefined)
        
    } catch (e) {
      throw new Error("selecting user failed")
    }
  }

  return (
    <ActiveUserContext.Provider value={{activeUser, setActiveUser }}>
    {children}
    </ActiveUserContext.Provider>
  )
}