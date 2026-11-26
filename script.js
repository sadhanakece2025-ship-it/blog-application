const API_URL = "http://localhost:3001";

// LOGIN FORM
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            document.getElementById("loginMessage").innerText = data.message;
        } catch (error) {
            document.getElementById("loginMessage").innerText =
                "Server connection failed.";
        }
    });
}

// REGISTER FORM
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            document.getElementById("registerMessage").innerText = data.message;
        } catch (error) {
            document.getElementById("registerMessage").innerText =
                "Server connection failed.";
        }
    });
}

// CREATE BLOG FORM
const blogForm = document.getElementById("blogForm");

if (blogForm) {
    blogForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const title = document.getElementById("blogTitle").value;
        const content = document.getElementById("blogContent").value;

        try {
            const response = await fetch(`${API_URL}/api/blogs/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    content,
                    author: "User"
                })
            });

            const data = await response.json();
            document.getElementById("blogMessage").innerText = data.message;

            if (response.ok) {
                blogForm.reset();
            }
        } catch (error) {
            document.getElementById("blogMessage").innerText =
                "Server connection failed.";
        }
    });
}

// DISPLAY BLOG POSTS ON DASHBOARD
const postsContainer = document.getElementById("postsContainer");

if (postsContainer) {
    fetch(`${API_URL}/api/blogs`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load blogs");
            }
            return response.json();
        })
        .then(data => {
            postsContainer.innerHTML = "";

            if (!data.blogs || data.blogs.length === 0) {
                postsContainer.innerHTML = "<p>No blog posts yet.</p>";
                return;
            }

            data.blogs.forEach(post => {
                const article = document.createElement("article");

                const heading = document.createElement("h3");
                heading.textContent = post.title;

                const paragraph = document.createElement("p");
                paragraph.textContent = post.content;

                const link = document.createElement("a");
                link.href = `blog-details.html?id=${encodeURIComponent(post._id)}`;
                link.textContent = "View Details";

                article.appendChild(heading);
                article.appendChild(paragraph);
                article.appendChild(link);

                postsContainer.appendChild(article);
            });
        })
        .catch(error => {
            console.error(error);
            postsContainer.innerText = "Could not load blogs.";
        });
}