let qrCode = null;
let logoImage = null;

const urlInput = document.getElementById('url-input');
const logoInput = document.getElementById('logo-input');
const dotsColor = document.getElementById('dots-color');
const bgColor = document.getElementById('bg-color');
const dotsStyle = document.getElementById('dots-style');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');
const downloadSvgBtn = document.getElementById('download-svg-btn');
const canvas = document.getElementById('qr-canvas');

// Gestion du logo
logoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert('Le fichier est trop volumineux (max 2MB)');
            logoInput.value = '';
            logoImage = null;
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            logoImage = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Génération du QR code
function generateQRCode() {
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Veuillez entrer une URL ou du texte');
        return;
    }

    canvas.innerHTML = '';

    const options = {
        width: 350,
        height: 350,
        type: 'canvas',
        data: url,
        dotsOptions: {
            color: dotsColor.value,
            type: dotsStyle.value
        },
        backgroundOptions: {
            color: bgColor.value
        },
        cornersSquareOptions: {
            type: 'extra-rounded',
            color: dotsColor.value
        },
        cornersDotOptions: {
            type: 'dot',
            color: dotsColor.value
        },
        qrOptions: {
            errorCorrectionLevel: 'H'
        }
    };

    if (logoImage) {
        options.image = logoImage;
        options.imageOptions = {
            crossOrigin: 'anonymous',
            margin: 10,
            imageSize: 0.3
        };
    }

    qrCode = new QRCodeStyling(options);
    qrCode.append(canvas);

    downloadBtn.style.display = 'block';
    downloadSvgBtn.style.display = 'block';
}

downloadBtn.addEventListener('click', () => {
    if (qrCode) {
        qrCode.download({ name: 'qrcode-nakile', extension: 'png' });
    }
});

downloadSvgBtn.addEventListener('click', () => {
    if (qrCode) {
        qrCode.download({ name: 'qrcode-nakile', extension: 'svg' });
    }
});

generateBtn.addEventListener('click', generateQRCode);

generateQRCode();
