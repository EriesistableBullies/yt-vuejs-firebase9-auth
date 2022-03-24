import { ref } from 'vue'
import { auth } from '../firebase/index'
import { database } from '../firebase/index'
// import slugify from 'slugify'

const error = ref(null)
// const slug = ref(null)

const usersCollection = database.collection('users')

const signup = async (email, password, displayName, photoURL) => {
    error.value = null
 

    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)

        if (!res) {
            throw new Error("Could not complete the signup")
        }
        await res.user.updateProfile({ displayName, photoURL }) 
        // if(displayName){
        //     slug.value = slugify(displayName, {
        //         replacement: '-',
        //         remove: /[$*_+~.()'"!\-:@]/g,
        //         lower: true
        //     })
        //     let ref = database.collection('users').doc(slug.value)
        //     ref.get().then(doc => {
        //         error.value = null
        //         if(doc.exists){
        //             error.value = ("Username not available!")
        //         }
        //     })
        // }
        error.value = null
        return res
    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const createUser = user => {
     
    return usersCollection.add(user)
}

//just return values
const useSignup = () => {
    return { error, signup, createUser }
}


export default useSignup