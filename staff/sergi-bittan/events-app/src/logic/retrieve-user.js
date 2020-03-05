import { validate } from "events-utils" 
const API_URL = process.env.REACT_APP_API_URL

export default function (token) {
    validate.string(token, "token");

    return (async () => {
        const res = await fetch(`${API_URL}/users/`,{
            method: "GET",
            header:  {"Authorization": `Bearer ${token}`},
            body: JSON.stringify({name, surname, email}) 
        })
        debugger
        const { name, surname, email } = await res.json()

        if (res.status === 200) return { name, surname, email }
        debugger
        if (res.status === 401) {
            const error = res.json()
            throw new Error(error)
        } throw new Error("unknow error")
    })()

}