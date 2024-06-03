document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();
  
  const input = document.querySelector('input');
  const inputValue = input.value.trim();

  if (inputValue) {
    try {
      const response = await fetch(`/upload/?url=${inputValue}`);
      const data = await response.json();
      const imgContainer = document.querySelector('#img1');
      
      imgContainer.innerHTML = data.img.map(imgSrc => `<img src="public/${imgSrc}">`).join('');
    } catch (error) {
      console.error('Error fetching/uploading:', error);
    }
  }
});
