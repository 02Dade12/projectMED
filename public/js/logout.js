const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert("Please use 8 characters!");
  }
};

$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
});


document.querySelector('#logout').addEventListener('click', logout);
