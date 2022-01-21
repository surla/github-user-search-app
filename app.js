const form = document.querySelector("form");

const loadUser = (user) => {
  document.getElementById(
    "avatar_url"
  ).innerHTML = `<img src=${user.avatar_url} class="rounded-full" />`;
  document.getElementById("name").innerHTML = user.name;
  document.getElementById("created_at").innerHTML = user.created_at;
  document.getElementById(
    "login"
  ).innerHTML = `<span class="text-[#0079FF]">@${user.login}</span>`;
  document.getElementById("bio").innerHTML = `${
    user.bio || "This profile has no bio"
  }`;
  document.getElementById("public_repos").innerHTML = user.public_repos;
  document.getElementById("followers").innerHTML = user.followers;
  document.getElementById("following").innerHTML = user.following;
  document.getElementById("location").innerHTML = `${
    user.location || "Not available"
  }`;
  document.getElementById("twitter_username").innerHTML = `${
    user.twitter_username || "Not available"
  }`;
  document.getElementById("website").innerHTML = `${
    user.blog || "Not available"
  }`;
  document.getElementById("company").innerHTML = `${
    user.company || "Not available"
  }`;
};

const getUserData = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response) {
        return;
      }
      return response.json();
    })
    .catch((error) => {
      console.log("Request Failed: ", error);
    });
  return response;
};

const clearResults = () => {
  document.getElementById("no-results").innerHTML = "";
};

window.addEventListener("DOMContentLoaded", async (event) => {
  let user = await getUserData("octocat");
  if (user) {
    console.log(user);
    loadUser(user);
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearResults();

  const username = document.querySelector("input").value;
  let user = await getUserData(username);
  if (user.message === "Not Found") {
    document.getElementById("no-results").innerHTML = "No results";
  } else {
    loadUser(user);
    console.log("hello");
  }
});
