let uri = window.location.search.substring(1);
let params = new URLSearchParams(uri);
let postId = (params.get('postId'));
let userId = (params.get('userId'));

if (postId) {
    const users = [];
    fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
        .then(response => response.json())
        .then(data => {
            showPost(data);
            fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
                .then(response => response.json())
                .then(data => showComments(data));
        });

    function showComments(data) {
        console.log(data);
        let html = '';
        const commentsForPost = data.forEach(oneComment => {
            html += `
                <li class="posts" style="background-color: lightgray">
                    <span>Post ID: ${oneComment.postId}</span>
                    <p><b>${oneComment.name}</b></p>
                    <p>e-mail: ${oneComment.email}</p>
                    <p>${oneComment.body}</p>
                </li>
            `;
        });
        console.log(html);
        document.getElementById("app").insertAdjacentHTML('beforeend', html);
    }

    function showPost(post) {
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
        document.getElementById("app").innerHTML = htmlPost;
    }

} else if(userId) {
    fetch('https://jsonplaceholder.typicode.com/users/' + userId)
        .then(response => response.json())
        .then(data => showUser(data));

    function showUser(user) {
        let html = `
            <li class="posts user">
                <p>ID: ${user.id}<p>
                <p>${user.name}</p>
                <p>${user.email}</p>
                <p>Address: ${user.address.street}</p>
                <p>         ${user.address.suite}</p>
                <p>         ${user.address.city}</p>
                <p>         ${user.address.zipcode}</p>
            </li>
            `;

        document.getElementById("app").innerHTML = html;
    }
} else {
    const posts = [];
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            posts.push(...data);
            showPosts(posts);
        });

    function showPosts(post) {
        const html = post.map(user => {
            return `
            <li class="posts">
                <a href="?postId=${user.id}">
                <span><b>ID:</b> ${user.id},</span></a>
                <span><b>User ID:</b> ${user.userId}</span>
                <p>Title:${user.title}</p>
                <p>${user.body}</p>
            </li>
        `;
        }).join('');
        document.getElementById("app").innerHTML = html;
    }
}

