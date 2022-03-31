import { rtdb } from "../firebase";


// // read post
function readPost(userId) {
    var readStatus = rtdb.ref('user-posts/' + userId);
    readStatus.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        return data
    });
}

// write new post
function writeNewPost(userId, displayName, picture, body) {

    var postData = {
        author: displayName,
        userId: userId,
        body: body,
        picture: picture
    }

    //get new key for post 
    var newPostKey = rtdb.ref().child('posts').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + userId + '/' + newPostKey] = postData;



    return rtdb.ref().update(updates);
}

const useRest = () => {
    return { writeNewPost, readPost }
}


export default useRest