import { ref } from "vue";
import { storage } from "../firebase";
import getUser from './getUser';


const { user } = getUser()


const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filepath = ref(null)

    const uploadImage = async (file) => {
        filepath.value = `photos/${user.value.uid}/${file}`
        const storageRef = storage.ref(filepath.value)

        try {
            const res = await storageRef.put(file)
            url.value = res.ref.getDownloadURL();
        } catch (err) {
            error.value = err.message
        }
    }
    return { url, filepath, error, uploadImage }
}

export default useStorage