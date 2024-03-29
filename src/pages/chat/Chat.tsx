import { Collapse, Skeleton } from "components"
import { IUser, useAuth, useChats, useUsers } from "hooks"
import React from "react"
import { OnlineUsers } from "./OnlineUsers"
import { Conversation } from "./Conversation"


const Chat: React.FC = () => {

    const { userInfo } = useAuth()
    const { chats, loading } = useChats({
        uid: userInfo?.uid
    })

    const { users, loading: loadingUser } = useUsers()

    const targetScroll = React.useRef<HTMLDivElement>(null)
    const [isBottom, setIsBottom] = React.useState<boolean>(false)
    const [user, setUser] = React.useState<IUser | null>(null)

    React.useEffect(() => {
        if (targetScroll.current) {
            targetScroll.current.scrollTop = targetScroll.current.scrollHeight
            targetScroll.current.scrollIntoView({ behavior: 'smooth' })
            targetScroll.current.addEventListener('scroll', () => {
                if (targetScroll.current) {
                    if (targetScroll.current.scrollTop === 0) {
                        setIsBottom(true)
                    } else {
                        setIsBottom(false)
                    }
                }
            })
        }
    }, [])

    const handleOnOnlineUserClick = (user: IUser) => {
        setUser(user)
    }

    return (
        <main
            className={'w-full 2xl:w-9/12 2xl:mx-auto'}>
            <div
                className={'grid grid-cols-3 gap-2'}>
                <section
                    className={'col-span-1'}>
                    <div
                        className={'flex flex-col min-h-screen'}>
                        <div
                            className={'flex flex-col w-full p-3'}>
                            <div
                                className={'bg-gray-100 flex-1 rounded-lg p-2 flex flex-row gap-2'}>
                                <input
                                    type="text"
                                    className={'flex-1 input-search'}
                                    placeholder={'Search'} />
                                <button
                                    className={'bg-spanishViolet-400 text-white rounded-md p-2'}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            className={'flex-1 flex flex-col gap-2 overflow-y-auto p-3'}>
                            <Collapse
                                label={'Online Now'}>
                                <div
                                    className={'flex flex-col gap-2 overflow-auto'} id={'online'}>
                                    {
                                        loadingUser ? (
                                            <Skeleton />
                                        ) : (
                                            <OnlineUsers
                                                onClick={handleOnOnlineUserClick}
                                                users={
                                                    users.filter(user => {
                                                        // filter if chats contain an userUid
                                                        if (chats?.length === 0) {
                                                            return user
                                                        }
                                                        return chats?.find(chat => {
                                                            return chat?.id.includes(user?.uid)
                                                        })
                                                    })
                                                } />
                                        )
                                    }
                                </div>
                            </Collapse>
                            <h2
                                className={'text-2xl font-bold text-black'}>
                                My Chats
                            </h2>
                            <div
                                className={'flex flex-col gap-2'}>

                            </div>
                        </div>

                    </div>
                </section>
                <section
                    className={'col-span-2'}>
                    {
                        user ? (
                            <Conversation
                                user={user} />
                        ) : null
                    }
                </section>
            </div>
        </main>
    )
}

export { Chat }
