let main = document.querySelector(".main");
let preload = document.querySelector(".container");

setTimeout (() => {
	main.style.visibility = "visible";
  preload.style.display = "none";
},3000);
let url = window.location.toString();

let getNickName = (link) => {
  let arr = link.split('=');
  let nick = arr[1];
  if(!nick) {
    nick = "x1nax";
  }
  return nick;
}
let nickName = getNickName(url);

let getInfo = new Promise((resolve, reject) => {
  setTimeout(() => nickName ? resolve(nickName) : reject("ошибка"), 2000);
});

let now = new Date();
let getDate = new Promise((resolve, reject) => {
  setTimeout(() => now ? resolve(now) : reject("ошибка"), 2000);
});

Promise.all ([getDate, getInfo])
    .then(([time, nickname]) => {
      let newTime = document.createElement("p");
      newTime.innerHTML = time;
      main.appendChild(newTime);
      fetch("https://api.github.com/users/"+ nickName)
      .then(res => {
        if (res.status !== 404) {
          return res.json();
        }
        else {
          let err = new Error;
          err.res = res;
          throw err;
          }
      })
      .then(res => {
        let newImg = document.createElement("IMG");
        let newp = document.createElement("p");
        let newA = document.createElement("a");
        let newh1 = document.createElement("h1");
        newImg.src = res.avatar_url;
        newh1.innerHTML = res.name;
        newp.innerHTML = res.bio;
        newA.href = res.html_url;
        main.appendChild(newA);
        newA.appendChild(newh1);
        main.appendChild(newp);
        main.appendChild(newImg);
        })
        .catch(() => document.body.innerHTML = "Такой пользователь не существует");
    });
