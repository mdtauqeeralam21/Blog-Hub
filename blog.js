document.getElementById('blogTitle').innerHTML=sessionStorage.getItem('blogTitle');
document.getElementById('blogDetails').innerHTML=sessionStorage.getItem('blogContent');
document.getElementById('blogAuthor').innerHTML=sessionStorage.getItem('blogAuthor');

function deleteBlog(){
    if(sessionStorage.getItem('islogin')){
      if(sessionStorage.getItem('user')===sessionStorage.getItem('blogAuthor'))  {
    const blogId=sessionStorage.getItem('blogId');
    fetch("http://localhost:2222/blogs/"+blogId, {method:'DELETE'})
    .then(alert('Blog Deleted Successfully'));
    console.log('blog deleted');
    window.location.href = 'index.html',true;
      }else{
        alert('Only Author can delete their post');
      }
    
    }  
}