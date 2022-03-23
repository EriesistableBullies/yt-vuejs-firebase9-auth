import { ref } from 'vue'
import { database } from '../firebase/index'

const useCollection = (collection) => {
    const error = ref(null)

    const addDoc = async (doc) => {
        //reset error at start of every request
        error.value = null

        try {
            await database.collection(collection).add(doc)
        } catch (err) {
            console.log(err.message)
            error.value = 'could not send message'
        }
    }
    return { error, addDoc }
}

export default useCollection