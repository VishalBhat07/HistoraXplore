import {Post, Comment, getPosts} from './discussion.js';

(async () => {

    const posts = await getPosts();
    console.log(posts);
    const post = await Post.getPost(posts[0].id);
    const comment = new Comment("Test comment", "Test email", "test username");
    post.addComment(comment);
    // const post = new Post("Post Title", "Post Content", "user@example.com", "Username");
    // await post.updateInDatabase();
    // console.log("Post created:", post);

    // const comment = new Comment("Nice post!", "commenter@example.com", "CommenterName");
    // await post.addComment(comment);
    // console.log("Comment added:", comment);

    // const comments = await post.getComments();
    // console.log("Fetched Comments:", comments);

    // await post.upvote();
    // console.log("Post upvoted:", post.votes);

    // const fetchedPost = await Post.getPost(post.id);
    // console.log("Fetched Post:", fetchedPost);
})();
