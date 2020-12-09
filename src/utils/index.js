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