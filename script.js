import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutLink = document.getElementById("logoutLink");
const authSection = document.getElementById("authSection");
const postSection = document.getElementById("postSection");
const publishBtn = document.getElementById("publishBtn");
const postContent = document.getElementById("postContent");
const postsDiv = document.getElementById("posts");

// ✅ Signup
signupBtn.addEventListener("click", async () => {
  try {
    await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Signup successful! Logged in.");
  } catch (e) {
    alert(e.message);
  }
});

// ✅ Login
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    alert("Login successful!");
  } catch (e) {
    alert(e.message);
  }
});

// ✅ Logout
logoutLink.addEventListener("click", async () => {
  await signOut(auth);
});

// ✅ Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    postSection.style.display = "block";
    logoutLink.style.display = "inline";
    loadPosts();
  } else {
    authSection.style.display = "block";
    postSection.style.display = "none";
    logoutLink.style.display = "none";
    postsDiv.innerHTML = "";
  }
});

// ✅ Publish post
publishBtn.addEventListener("click", async () => {
  const content = postContent.value.trim();
  if (!content) return alert("Write something first!");

  await addDoc(collection(db, "posts"), {
    content,
    date: new Date().toLocaleString(),
    user: auth.currentUser.email
  });

  postContent.value = "";
  loadPosts();
});

// ✅ Load all posts
async function loadPosts() {
  postsDiv.innerHTML = "<p>Loading...</p>";
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);

  postsDiv.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <p>${post.content}</p>
      <small>✍️ ${post.user} | 🕒 ${post.date}</small>
    `;
    postsDiv.appendChild(div);
  });
}