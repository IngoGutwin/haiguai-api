const app = document.querySelector('#app');

function apiRequest() {
  fetch('http://localhost:8080/api/users')
    .then((res) => res.json())
    .then((data) => {
      const result = data[0];

      app?.insertAdjacentHTML(
        'afterbegin',
        `<h1>
            Welcome ${result.firstName} to the haiguai blog
        </h1>`,
      );
    });
}

apiRequest();
