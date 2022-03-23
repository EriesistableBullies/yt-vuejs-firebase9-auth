import { ref } from 'vue'
import { auth } from '../firebase/index'
import { database } from '../firebase/index'

const error = ref(null)
// const file = ref(null)
const signup = async (email, password, displayName, photoURL) => {
    error.value = null

    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)

        if (!res) {
            throw new Error("Could not complete the signup")
        }
        await res.user.updateProfile({ displayName, photoURL })
        error.value = null
        return res
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}
const usersCollection = database.collection('users')
const createUser = user => {
     
    return usersCollection.add(user)
}

//just return values
const useSignup = () => {
    return { error, signup, createUser }
}


export default useSignup