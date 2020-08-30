let url = window.location.toString();
console.log(url);
//let str = "https://github.com/?username=6thSence";
let nickName = (link) => {
  let arr = link.split('=');
  let nick = arr[arr.length-1];
  if(nick==undefined) {
    nick = "x1nax";
  }
  return nick
}
nickName(url);
console.log(nickName(url));
let info = (user) => {
  fetch('https://api.github.com/users/'+ user)
    .then(res => res.json())
      .then(res => {
        let newImg = document.createElement("IMG");
        let newh1 = document.createElement("h1");
        let newp = document.createElement("p");
        let newA = document.createElement("a");
        newImg.src = res.avatar_url;
        newh1.innerHTML = res.name;
        newp.innerHTML = res.bio;
        newA.href = res.html_url;
        document.body.appendChild(newA);
        newA.appendChild(newh1);
        document.body.appendChild(newp);
        document.body.appendChild(newImg);
        }
      )
      .catch(err => document.body.innerHTML = 'Ты написал ерунду');
}

info(nickName(url));