import { useEffect, useState } from "react"

const UseChat = (props) => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        fecthChats()
    }, [setChats])

    const fecthChats = () => {
        let unsubscribe;
        unsubscribe = props.firebase.mensajes().orderBy('FechaRegistro', 'asc').onSnapshot(querySnapshot => {
            const items = []
            querySnapshot.forEach(doc => {
                const item = doc.data();
                items.push(item)
            })
            setChats(items)
        }, error => {
            console.log(error)
            setChats([])
        })
        return unsubscribe
    }

    return { chats }
}


export default UseChat