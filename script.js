
async function login() {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch(`http://localhost:2222/users`)
      const data = await response.json();
      console.log(data);
      const matcheduser = data.find(user => user.username === username && user.password === password);
      if (matcheduser) {
          sessionStorage.setItem("user", JSON.stringify(matcheduser));

          sessionStorage.setItem("islogin", "true");

          window.location.href = "index.html";
      }

      else {
          alert('invalid login');
      }
  }
  catch (error) {
      console.error('error', error);

      alert("please try again");
  }

}

//==========================================================================================================

function addBlogs(){
  document.getElementById('myForm').addEventListener('submit',function(event){
    alert("Blog added");
      event.preventDefault();
      const title=document.getElementById('title').value;
      const content=document.getElementById('content').value;
      const author=document.getElementById('author').value;

      const blog={
          title:title,
          content:content,
          author:author
      };


      fetch("http://localhost:2222/blogs",{
          method:'post',
          headers:{
              'content-Type':'application/json'
          },
          body:JSON.stringify(blog)
      })
      .then(response => response.json())
      .then(responseblog =>{
          console.log('Registered successfully');
          window.location.href='index.html'
      });
  });
}
//===================================================================================
fetch('http://localhost:2222/blogs')
  .then(response=> {
    return response.json();
  })
  .then(data => {
    console.log(data);
    appendData(data);
  })
  .catch(err=> {
    console.log(err);
  });
    

  function appendData(data){
    let mainContainer = document.getElementById("table-data");
    
    for (let i=0;i<data.length; i++) {
      // let ind=i+1;
      // let index=ind.toString();
      let div = document.createElement("a");

      div.setAttribute('href','blog.html');
     div.setAttribute("id","refLink")
     // div.setAttribute('value',index);
      //div.addEventListener('click','showBlog()');
      let div2 = document.createElement("div");
      div2.setAttribute('id','authorName')
      console.log(data[i].title);
      div.innerHTML = (i+1)+'. Title: ' + data[i].title+'<br/>'; 
      mainContainer.appendChild(div);
      div2.innerHTML= data[i].author+'<br/>';;
      mainContainer.appendChild(div2);
      
    }
    
  }

  //=====================================================================
  
 // let val=document.getElementById('refLink').value;
  fetch('http://localhost:2222/blogs/1')
  .then(response=> {
    return response.json();
  })
  .then(data => {
    console.log(data);
    showBlog(data);
    
  })
  .catch(err=> {
    console.log(err);
  });

  function showBlog(data){

    let div3= document.getElementById("blogTitle");
    let div4=document.getElementById("blogBody");
    let div5=document.getElementById("blogAuthor");
    console.log(data.title);
    div3.innerHTML = data.title;
    div4.innerHTML = data.content;
    div5.innerHTML = data.author;
    

  }