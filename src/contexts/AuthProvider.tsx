import { IUser, useAuth } from "hooks"
import React, { createContext } from "react"


const AuthContext = createContext({
    userInfo: null as IUser | null,
    signIn: (_username: string): Promise<IUser> => {
        return new Promise((_resolve, reject) => {
            reject("Not implemented!")
        })
    },
    signInWithGoogle: (): Promise<boolean> => {
        return new Promise((_resolve, reject) => {
            reject("Not implemented!")
        })
    },
    signOut: () => { },
    loading: true
})

const AuthProvider = (props: {
    children?: React.ReactNode
}) => {
    const value = useAuth()
    return (
        <AuthContext.Provider value={value}>
            {props?.children}
        </AuthContext.Provider>
    )
}


export { AuthProvider }