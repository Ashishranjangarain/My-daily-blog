const publishBtn = document.getElementById("publishBtn");
const postContent = document.getElementById("postContent");
const postsDiv = document.getElementById("posts");

// Load saved posts from localStorage
window.onload = () => {
  const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  savedPosts.forEach(post => createPost(post));
};

publishBtn.addEventListener("click", () => {
  const content = postContent.value.trim();
  if (content === "") {
    alert("Please write something before publishing!");
    return;
  }

  const date = new Date().toLocaleString();
  const post = { content, date };
  
  createPost(post);
  savePost(post);

  postContent.value = "";
});

function createPost(post) {
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");
  postDiv.innerHTML = `
    <p>${post.content}</p>
    <small>🕒 ${post.date}</small>
  `;
  postsDiv.prepend(postDiv);
}

function savePost(post) {
  const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  savedPosts.push(post);
  localStorage.setItem("blogPosts", JSON.stringify(savedPosts));
}