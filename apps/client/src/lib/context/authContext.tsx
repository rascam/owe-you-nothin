/* import { createContext, useState, useEffect } from "react"

interface User {
  username: string,
  id: string
}

interface AuthCtx {
  loginUser?: User,
  incognito: boolean,
  login: (email: string, password: string) => Promise<void>,
  signIn: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>
  toggleIncognito: () => void
}

const defaultAuthState: AuthCtx = {
  loginUser: undefined,
  incognito: false,
  login: () => {
    throw new Error("login method not implemented")
  },
  signIn: () => {
    throw new Error("sigin method not implemented")
  },
  logout: () => {
    throw new Error("sigin method not implemented")
  },
  toggleIncognito: () => {
    throw new Error("sigin method not implemented")
  }
}


export const authCtx = createContext<AuthCtx>(defaultAuthState)

interface AuthContextProviderProps {
  children: React.ReactNode
}
 
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {

  const [user, setUser] = useState<User | undefined>()
  const [incognito, setIncognito] = useState<boolean>(false)

  const toggleIncognito = () => {
    setIncognito(prev => !prev)
  }

  //userSession in the local storage 
  //1 => saveToLocalStorage ( key: string, value: string)
  //2  => loadFromLocalStorage (key: string)
  //3 => removeFromLocalStorage

  useEffect(() => {
    //2 foundedID => loadFromLocalStorage (key: string)
    //fetch(/me, {foundedID})
    //setUserID(founderID)
    console.log('helo')
  }, [])

  const login = async (email: string, password: string) => {
    //fetch('/login') get the cookie with the auth and the user id
    console.log(email, password)
    const id = 'id'
    setUser({
      username: 'pepe',
      id
    })
  }

  const signIn = async (email: string, password: string) => {
    //fetch('/createUser') get the cookie with the auth and the user id
    console.log(email, password)
    const id = 'id'
    setUser({
      username: 'pepe',
      id
    })
  }

  const logout = async () => {
    setUser(undefined)
    //3 => removeFromLocalStorage
  }

  return (
    <authCtx.Provider value={{
      loginUser: user,
      login,
      signIn,
      logout,
      incognito,
      toggleIncognito
    }} >
      {children}
    </authCtx.Provider>
  )
  
} */