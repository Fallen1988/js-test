let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);
let postId = (params.get('postId'));
let userId = (params.get('userId'));

function showPosts(post) {
    const html = post.map(user => {
        return `
            <li class="posts">
                <a href="?postId=${user.id}">
                <span><b>ID:</b> ${user.id},</span></a>
                <a href="?userId=${user.userId}"><b>User ID:</b> ${user.userId}</a>
                <p>Title:${user.title}</p>
                <p>${user.body}</p>
            </li>
        `;
    }).join('');
    document.getElementById("app").innerHTML = html;
}

function showUser(user) {
    let html = `
            <li class="posts user">
                <p>ID: ${user.id}<p>
                <p>${user.name}</p>
                <p>${user.email}</p>
                <p>Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}.</p>
                <p>Phone: ${user.phone}</p>
                <p>Web-site: ${user.website}</p>
            </li>
            `;
    document.getElementById("app").innerHTML = html;
}

function showComments(data) {
    let commentsContainer = document.createElement('div');
    document.getElementById("app").append(commentsContainer);
    let html = '';
    const commentsForPost = data.forEach(oneComment => {
        html += `
                <li class="posts" style="background-color: lightgray">
                    <span>Comments for post ${oneComment.postId}</span>
                    <p><b>Tittle: ${oneComment.name}</b></p>
                    <p>e-mail: ${oneComment.email}</p>
                    <p>${oneComment.body}</p>
                </li>
            `;
    });
    commentsContainer.innerHTML = html;
}

function showPost(post) {
    let postContainer = document.createElement('div');
    document.getElementById("app").append(postContainer);
    let htmlPost = `
            <li class="posts">
                <a href="?userId=${post.userId}">
                <span><b>User ID:</b> ${post.userId},</span></a>
                <span><b>ID:</b> ${post.id}</span>
                <p>Title:${post.title}</p>
                <p>${post.body}</p>      
            </li>
            <hr>
        `;
    postContainer.innerHTML = htmlPost;
}

if (postId) {
    const users = [];
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
        .then(response => response.json())
        .then(data => {
            showPost(data);
            fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
                .then(response => response.json())
                .then(data => showComments(data))
                .catch( () => alert('Comments not found'));
        })
        .catch( () => alert('Post is not found'));
} else if(userId) {
    fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(response => response.json())
        .then(data => showUser(data))
        .catch( () => alert('User is not Found'));
} else {
    const posts = [];
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            posts.push(...data);
            showPosts(posts);
        })
        .catch( () => alert('Posts are not found'));
}

