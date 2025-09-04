document.getElementById('globcover-toggle').addEventListener('change', function() {
    document.getElementById('globcover-img').style.display = this.checked ? 'block' : 'none';
});
document.getElementById('glwd-toggle').addEventListener('change', function() {
    document.getElementById('glwd-img').style.display = this.checked ? 'block' : 'none';
});
document.getElementById('swamp-toggle').addEventListener('change', function() {
    document.getElementById('swamp-img').style.display = this.checked ? 'block' : 'none';
});

// Info box logic
const infoBox = document.getElementById('info-box');
const infoTitle = document.getElementById('info-title');
const infoContent = document.getElementById('info-content');

const infoData = {
    swamp: {
        title: 'SWAMP (231m)',
        content: `<strong>SWAMP (Sustainable Wetlands Adaptation and Mitigation Program)</strong><br>
        The global wetlands map developed under the Sustainable Wetlands Adaptation and Mitigation Program (SWAMP) is the result of a partnership between the Center for International Forestry Research (CIFOR) and the United States Forest Service, with support from USAID and the CGIAR Research Program on Forests, Trees and Agroforestry (FTA).<br>
        The SWAMP Global Wetlands Map focuses on tropical and subtropical regions, and is created using a hydro-geomorphological modeling approach based on an Expert System, which estimates wetland areas by integrating three key biophysical indicators: long term water availability exceeding atmospheric demand, soils that are waterlogged either seasonally or year-round, and geomorphological settings that promote water accumulation and retention (Gumbricht et al.,2017).`
    },
    globcover: {
        title: 'GlobCover (30m)',
        content: `<strong>GlobCover</strong><br>
        The GlobCover dataset was developed by European Space Agency and partners, providing global land cover classification at 300m resolution using MERIS imagery from 2005–2006. It includes a wetland class and is often used as a static baseline for environmental and land use studies. Though it’s been 15 years since it was published, it remains relevant for historical assessments and inter-dataset comparisons.`
    },
    glwd: {
        title: 'GLWD (1km)',
        content: `<strong>Global Lakes and Wetlands Database (GLWD)</strong><br>
        The Global Lakes and Wetlands Database (GLWD) was developed by World Wildlife Fund (WWF) and the Center for Environmental Systems Research, University of Kassel, Germany by using different existing maps, data and information. It offers a globally consistent representation of surface water bodies and wetlands and provides both vector and raster data, with the raster dataset (GLWD-3) offering ∼1 km spatial resolution and classifying each grid cell into 1 of 12 wetland types. The data, primarily compiled from the 1990s to early 2000s, supports large-scale hydrological and ecological studies and remains a foundational dataset for global wetland analysis.`
    }
};

function showInfo(layer) {
    infoTitle.textContent = infoData[layer].title;
    infoContent.innerHTML = infoData[layer].content;
}

document.getElementById('swamp-toggle').addEventListener('change', function() {
    document.getElementById('swamp-img').style.display = this.checked ? 'block' : 'none';
    if (this.checked) showInfo('swamp');
});
document.getElementById('globcover-toggle').addEventListener('change', function() {
    document.getElementById('globcover-img').style.display = this.checked ? 'block' : 'none';
    if (this.checked) showInfo('globcover');
});
document.getElementById('glwd-toggle').addEventListener('change', function() {
    document.getElementById('glwd-img').style.display = this.checked ? 'block' : 'none';
    if (this.checked) showInfo('glwd');
});

let scale = 1;
const overlayImgs = document.querySelectorAll('.overlay-img');
const boundingBox = document.querySelector('.map-bounding-box');
let panX = 0;
let panY = 0;
let isDragging = false;
let startX, startY;

function setScale(newScale) {
    scale = Math.max(0.2, Math.min(newScale, 5)); // Clamp scale between 0.2 and 5
    updateTransform();
}

function updateTransform() {
    overlayImgs.forEach(img => {
        img.style.transform = `scale(${scale}) translate(${panX}px, ${panY}px)`;
    });
}

document.getElementById('zoom-in').addEventListener('click', function() {
    setScale(scale + 0.2);
});
document.getElementById('zoom-out').addEventListener('click', function() {
    setScale(scale - 0.2);
});

boundingBox.addEventListener('mousedown', function(e) {
    isDragging = true;
    boundingBox.style.cursor = 'grabbing';
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    panX += (e.clientX - startX);
    panY += (e.clientY - startY);
    startX = e.clientX;
    startY = e.clientY;
    updateTransform();
});

window.addEventListener('mouseup', function() {
    isDragging = false;
    boundingBox.style.cursor = 'grab';
});
