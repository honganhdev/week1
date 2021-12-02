let fetch = require("node-fetch");
const fetchApi = require("./helpers/fetchApi");

async function getUsers() {
  const users = fetchApi("/users");
  const posts = fetchApi("/posts");
  const comments = fetchApi("/comments");
  await Promise.all([users, posts, comments]);
  const userReplace = users.map((user) => {
    const { id, name, username, email } = user;
    //return { id, name, username, email };
    let postsReplace = [];
    let commentsReplace = [];
    posts.map((post) => {
      if (post.userId === id) {
        postsReplace.push(post);
        comments.map((comment) => {
          if (comment.postId === post.id) {
            commentsReplace.push(comment);
          }
        });
      }
    });
    return {
      id,
      name,
      username,
      email,
      comments: commentsReplace.length,
      posts: postsReplace.length,
    };
  });
  console.log(userReplace[7]);
  // Filter only users with more than 3 comments.
  const filterUser = userReplace.filter((user) => {
    if (user.comments.length > 3) return user;
  });
  // console.log(filterUser[2]);
  // user with the most comments/posts

  const maxComment = userReplace.reduce((a, b) => {
    if (a.comments > b.comments) {
      return a;
    } else {
      return b;
    }
  });
  const maxPost = userReplace.reduce((a, b) => {
    if (a.comments > b.comments) {
      return a;
    } else {
      return b;
    }
  });
  //console.log(maxPost);
  const fakeData = [
    {
      id: 8,
      name: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      email: "Sherwood@rosamond.me",
      comments: 49,
      posts: 11,
    },
    {
      id: 10,
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      comments: 50,
      posts: 10,
    },
  ];

  //Sort the list of users by the postsCount value descending?
  const sort = userReplace.sort(function (a, b) {
    return a.posts - b.posts;
  });
  //console.log(sort);
}

getUsers();

async function getPosts(id) {
  const post = await fetchApi(`/posts/${id}`);
  const comments = await fetchApi(`/comments?postId=${id}`);

  let mergePost = { ...post, comments: comments };
  console.log(mergePost);
}
// getPosts(5);
