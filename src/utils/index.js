import imageCompression from 'browser-image-compression';

export async function compressImage(files) {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1280,
        useWebWorker: false
    }
    try {
        const blob = await imageCompression(files, options);
        const compressedFile = new File([blob], blob.name, { type: blob.type });
        return [compressedFile];
    } catch (error) {
        console.log(error);
    }
}

export async function postData(url, data) {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.json());

    return respon;
}

export async function putData(url, data) {
    const respon = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.ok ? _.json() : null);

    return respon;
}

export async function getData(url) {
    const respon = await fetch(url)
        .then(_ => _.ok ? _.json() : null);

    return respon;
}

export async function postFile(url, data) {
    const respon = await fetch(url, {
        method: 'POST',
        body: data
    }).then(_ => _.ok ? _.json() : null);

    return respon;
}