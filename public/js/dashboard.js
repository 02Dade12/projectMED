var text = document.querySelector('#search').value.trim();
const newSearchHandler = async (event) => {
  // event.preventDefault();

  // const name = document.querySelector('#project-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  // const description = document.querySelector('#project-desc').value.trim();
  console.log(text);




  // if (name && needed_funding && description) {
  //   const response = await fetch(`/api/searches`, {
  //     method: 'POST',
  //     body: JSON.stringify({ name, needed_funding, description }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/dashboard');
  //   } else {
  //     alert('Failed to create searches');
  //   }
  // }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/searches/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete searches');
    }
  }
};

// document
//   .querySelector('#searchBtn')
//   .addEventListener('click', newSearchHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
