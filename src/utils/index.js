import Compress from 'compress.js';

export async function compressFile(files) {
    const compress = new Compress();
    const compressedFile = await compress.compress(files, {
        size: 1,
        quality: .75,
        maxWidth: 1280,
        maxHeight: 1280,
        resize: true,
    }).then((results) => {
        const img = results[0]
        const base64str = img.data;
        const imgExt = img.ext;
        const blob = Compress.convertBase64ToFile(base64str, imgExt);
        return new File([blob], img.alt, { type: imgExt });
    })

    return [compressedFile];
}

export async function postData(url, data) {
    const respon = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(_ => _.ok ? _.json() : null);

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