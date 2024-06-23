import config from './config.js';

const API_KEY = config.API_KEY;
const inputElement = document.querySelector('#name');
const submitButton = document.getElementById('submit');

// Request image when button is clicked
async function getImages(prompt) {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "prompt": prompt,
            "model": "dall-e-2",
            "n": 1,
            "quality": "hd",
            "size": "512x512",
        })
    }

    try{
        const response = await fetch('https://api.openai.com/v1/images/generations', options);
        if (!response.ok) {
            console.error("Response Error:", response.status, await response.text());
            return;
        }
        const data = await response.json();
        if (data?.data?.length) {
            var imageObject = data.data[0];
            var imgContainer = document.getElementById('imageContainer');
            let img = imgContainer.querySelector('img'); // Try to find an existing img element
            if (img) {
                // If img exists, just update the src attribute
                img.src = imageObject.url;
            }
            else {
                // If no img exists, create a new one and append it
                const img = document.createElement('img');
                img.src = imageObject.url
                imgContainer.appendChild(img);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

submitButton.addEventListener("click", () => getImages(inputElement.value));

document.getElementById('gallery').addEventListener('click', function() {
    console.log("1")
    window.location.href = 'gallery.html'; // Redirects to the gallery page
});

localStorage.clear();