import { rtdb, timestamp } from "../firebase";


// // read post
function readPost(userId) {
    var readStatus = rtdb.ref('user-posts/' + userId);
    readStatus.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        return data
    });
}

function writeNewComment(userId,displayName,picture,body) {
    var postData = {
        author: displayName,
        userId: userId,
        body: body,
        picture: picture,
        createdAt: timestamp()
    }
    //get key from post to comment on 
    var post = rtdb.ref('posts').orderByKey();
    post.on('child_added', (snapshot) => {
        var key = snapshot.key;
        console.log(key)
    var updates = {};
    updates['/posts/' + key + '/comment'] = postData

    return rtdb.ref().update(updates);
})
}

// write new post
function writeNewPost(userId, displayName, picture, body, ) {

    var postData = {
        author: displayName,
        userId: userId,
        body: body,
        picture: picture,
        createdAt: timestamp()
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
    return { writeNewPost, readPost, writeNewComment }
}


export default useRest