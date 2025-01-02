function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';

  // Hide notification after 3 seconds
  setTimeout(() => {
      notification.style.display = 'none';
  }, 3000);
}

document.getElementById('make-payment').addEventListener('click', (event) => {
  event.preventDefault(); // Prevents default behavior
  console.log('Processing payment...');

  // Simulate payment process
  setTimeout(() => {
      console.log('Payment successful');
      showNotification('Payment Successful!');
  }, 2000);
});
