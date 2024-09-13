// script.js

let filesData = [];

document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('sort').addEventListener('change', sortFiles);

function handleFileSelect(event) {
    const files = event.target.files;
    const fileGrid = document.getElementById('fileGrid');

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileData = {
            name: file.name,
            date: new Date().toLocaleDateString(),
            type: file.type,
            url: URL.createObjectURL(file)
        };
        filesData.push(fileData);
    }

    renderFiles();
}

function renderFiles() {
    const fileGrid = document.getElementById('fileGrid');
    fileGrid.innerHTML = '';

    filesData.forEach(fileData => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.onclick = () => openPreview(fileData);

        if (fileData.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = fileData.url;
            fileItem.appendChild(img);
        } else if (fileData.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.controls = true;
            video.src = fileData.url;
            fileItem.appendChild(video);
        }

        const fileName = document.createElement('p');
        fileName.textContent = fileData.name;
        fileItem.appendChild(fileName);

        const fileDate = document.createElement('p');
        fileDate.textContent = fileData.date;
        fileItem.appendChild(fileDate);

        fileGrid.appendChild(fileItem);
    });
}

function openPreview(fileData) {
    const modal = document.getElementById('previewModal');
    const previewImage = document.getElementById('previewImage');
    const previewVideo = document.getElementById('previewVideo');

    if (fileData.type.startsWith('image/')) {
        previewImage.src = fileData.url;
        previewImage.style.display = 'block';
        previewVideo.style.display = 'none';
    } else if (fileData.type.startsWith('video/')) {
        previewVideo.src = fileData.url;
        previewVideo.style.display = 'block';
        previewImage.style.display = 'none';
    }

    modal.style.display = 'block';
}

document.querySelector('.modal .close').onclick = function() {
    document.getElementById('previewModal').style.display = 'none';
};

window.onclick = function(event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

function sortFiles() {
    const sortBy = document.getElementById('sort').value;

    if (sortBy === 'name') {
        filesData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
        filesData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderFiles();
}
