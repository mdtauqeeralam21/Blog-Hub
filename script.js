const loginForm = document.getElementById('login');
      loginForm.addEventListener('submit', handleLogin);

      function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const url = 'http://localhost:3000/users'; // Replace with your JSON server endpoint

        fetch(url)
          .then(response => response.json())
          .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
              console.log('Login successful');
              // Perform any necessary actions for a successful login
            } else {
              console.log('Login failed');
              // Perform any necessary actions for a failed login
            }
          })
          .catch(error => {
            console.log('An error occurred:', error);
            // Perform any necessary error handling
          });
      }