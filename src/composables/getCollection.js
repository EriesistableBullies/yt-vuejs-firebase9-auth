import { ref, watchEffect } from 'vue'
import { database } from '../firebase/index'


const getCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = database.collection(collection)
        .orderBy('createdAt')

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({
                ...doc.data(), id: doc.id
            })
            documents.value = results
            error.value = null
        }, (err) => {
            console.log(err.message)
            documents.value = null
            error.value = 'could not fetch data'
        })

        watchEffect((onInvalidate) => {
            onInvalidate(() => unsub())
        })
    })
    return { documents, error }
}


export default getCollection