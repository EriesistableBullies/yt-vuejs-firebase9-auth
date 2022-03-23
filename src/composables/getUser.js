import { ref } from 'vue'
import { auth } from '../firebase/index'

const user = ref(auth.currentUser)

auth.onAuthStateChanged(_user => {
    console.log('User state change. Current user is:', _user.displayName)
    user.value = _user
})

const getUser = () => {
    return { user,  }
}



export default getUser