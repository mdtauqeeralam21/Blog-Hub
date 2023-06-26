
async function login() {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch(`http://localhost:2222/users`)
      const data = await response.json();
      console.log(data);
      const matcheduser = data.find(user => user.email === username && user.password === password);
      if (matcheduser) {
        const result = data.find( name => name.email === username );
        console.log(result);
        console.log(result.name);
          sessionStorage.setItem("user", result.name);
          sessionStorage.setItem("islogin", "true");
        alert('Login Successfull')
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
      const author=sessionStorage.getItem('user');

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
      .then( () =>{
          console.log('Added successfully');
          window.location.href='index.html',true;
      });
  });
}
//===================================================================================
function registerUser(){
  document.getElementById('login').addEventListener('submit',function(event){
      event.preventDefault();
      const name=document.getElementById('name').value;
      const email=document.getElementById('email').value;
      const pass=document.getElementById('mypassword').value;

      const user={
          name:name,
          email:email,
          password:pass
      };


      fetch("http://localhost:2222/users",{
          method:'post',
          headers:{
              'content-Type':'application/json'
          },
          body:JSON.stringify(user)
      })
      .then(response => response.json())
          console.log('Registered successfully');
          alert('Registered Successfull');
          window.location.href='login.html',true;
  });
}





  //=====================================================================

  document.addEventListener("DOMContentLoaded",function (){
    fetch('http://localhost:2222/blogs')
    .then(response=>response.json())
    .then(data=>{
      const blogList=document.getElementById('title');
      const blogAuthor=document.getElementById('author');

      if(sessionStorage.getItem('islogin')){
      const liveUser=document.getElementById('heading');

      let blogger=sessionStorage.getItem("user");
      liveUser.textContent='Hello, '+blogger;
      console.log('user is '+ sessionStorage.getItem("user"));
      }else{
        console.log('Please Login');
      }
      //create the blog list
      data.forEach(blog => {
        const listItem=document.createElement('ul');
        const listItem2=document.createElement('ul');

        listItem.textContent=blog.title;
        listItem2.textContent=blog.author;

        blogList.appendChild(listItem);
        blogAuthor.appendChild(listItem2);


        //Attach event listener
        listItem.addEventListener("click",function(){
          sessionStorage.setItem('blogId',blog.id);
          sessionStorage.setItem('blogTitle',blog.title);
          sessionStorage.setItem('blogContent',blog.content);
          sessionStorage.setItem('blogAuthor', blog.author);
          window.location.href='blog.html';
          
        });
        
      });
    });
  });

//========================================================================
function logout(){
  
  sessionStorage.clear();
  console.log('logged out');
  window.location.href=('login.html');
  
}

function addingBlog(){
  if(sessionStorage.getItem('islogin')){
      const liveUser=document.getElementById('heading');

      let blogger=sessionStorage.getItem("user").split('@');
      liveUser.textContent='Hello, '+blogger[0].slice(1);
      console.log('user is'+ sessionStorage.getItem("user"));

      }
  }