import { Area } from 'react-easy-crop';

function createImage(url: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = url;
    });
}

export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
): Promise<File | null> {
    const image = await createImage(imageSrc);
    if (!image) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.beginPath();
    ctx.arc(
        pixelCrop.width / 2,
        pixelCrop.height / 2,
        Math.min(pixelCrop.width, pixelCrop.height) / 2,
        0,
        Math.PI * 2,
    );
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
    );

    return new Promise((resolve) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                resolve(null);
                return;
            }

            const fileName = imageSrc.slice(27, -1) + '.png';
            const file = new File([blob], fileName, {
                type: 'image/png',
                lastModified: Date.now(),
            });
            resolve(file);
        }, 'image/png');
    });
}
