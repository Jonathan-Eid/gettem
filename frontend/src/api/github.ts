import axios from "axios"

const github = axios.create({
    baseURL: "https://api.github.com"
})

export async function getUser(user:string){


    let path = `/users/${user}`

    if (localStorage.getItem(path) != null){
        return JSON.parse(localStorage.getItem(path)!)
    }


    try{
        const response = await github.get(path)
        localStorage.setItem(path,JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getRepo(user:string, repo: string){


    let path = `/repos/${user}/${repo}`

    if (localStorage.getItem(path) != null){
        return JSON.parse(localStorage.getItem(path)!)
    }

    try{
        const response = await github.get(path)
        localStorage.setItem(path,JSON.stringify(response.data))
        return response.data
    } catch (error) {
        console.log(error)
    }
}