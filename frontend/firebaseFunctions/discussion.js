import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig.js";

export class Comment {
  constructor(text, emailId, username) {
    this.text = text;
    this.votes = 0;
    this.emailId = emailId;
    this.username = username;
  }

  async upvote(postId, commentId) {
    this.votes += 1;
    await this.updateInDatabase(postId, commentId);
  }

  async downvote(postId, commentId) {
    this.votes -= 1;
    await this.updateInDatabase(postId, commentId);
  }

  async updateInDatabase(postId, commentId) {
    const commentRef = doc(db, "Posts", postId, "comments", commentId);
    await updateDoc(commentRef, { votes: this.votes });
  }

  async deleteFromDatabase(postId, commentId) {
    const commentRef = doc(db, "Posts", postId, "comments", commentId);
    await deleteDoc(commentRef);
  }

  toJSON() {
    return {
      text: this.text,
      votes: this.votes,
      emailId: this.emailId,
      username: this.username,
    };
  }
}

export class Post {
  constructor(title, text, emailId, username, id = null, votes = 0) {
    this.title = title;
    this.text = text;
    this.votes = votes;
    this.emailId = emailId;
    this.username = username;
    this.id = id || this.generateId();
  }

  async upvote() {
    this.votes += 1;
    await this.updateInDatabase();
  }

  async downvote() {
    this.votes -= 1;
    await this.updateInDatabase();
  }

  async addComment(newComment) {
    const commentsRef = collection(db, "Posts", this.id, "comments");
    const commentDocRef = await addDoc(commentsRef, newComment.toJSON());
  }

  async updateInDatabase() {
    const postRef = doc(db, "Posts", this.id);
    await setDoc(
      postRef,
      {
        title: this.title,
        text: this.text,
        votes: this.votes,
        emailId: this.emailId,
        username: this.username,
      },
      { merge: true }
    );
  }

  async deleteFromDatabase() {
    // Delete all comments associated with the post first
    const commentsRef = collection(db, "Posts", this.id, "comments");
    const commentsSnapshot = await getDocs(commentsRef);
    for (const comment of commentsSnapshot.docs) {
      await deleteDoc(doc(db, "Posts", this.id, "comments", comment.id));
      console.log(`Deleted comment ${comment.id}`);
    }

    // Delete the post itself
    const postRef = doc(db, "Posts", this.id);
    await deleteDoc(postRef);
    console.log(`Post ${this.id} deleted`);
  }

  async getComments() {
    const commentsRef = collection(db, "Posts", this.id, "comments");
    const commentsSnapshot = await getDocs(commentsRef);
    return commentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  static async getPost(postId) {
    const postRef = doc(db, "Posts", postId);
    const postSnapshot = await getDoc(postRef);

    if (!postSnapshot.exists()) {
      throw new Error("Post not found");
    }

    const postData = postSnapshot.data();
    if (!postData) {
      throw new Error("Post data is missing");
    }

    const post = new Post(
      postData.title,
      postData.text,
      postData.emailId,
      postData.username,
      postId,
      postData.votes
    );
    return post;
  }

  generateId() {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export async function getPosts() {
  const postsRef = collection(db, "Posts");
  const postsSnapshot = await getDocs(postsRef);
  return postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
