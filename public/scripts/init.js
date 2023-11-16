const API_URL = "/api/users/";

async function requestCRUD(method, data) {
    let result;
    switch (method) {
        case 'GET':
            let getResponse = await fetch(data ? API_URL + data.id : API_URL);
            result = getResponse.ok ? getResponse.json() : false;
            break;

        case 'DELETE':
            let deleteResponse = await fetch(API_URL + data.id, { method: method });
            result = deleteResponse.ok ? deleteResponse.json() : false;
            break;

        case 'PUT':
            let putResponse = await fetch(API_URL + data.id, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: data.name, lastname: data.lastname })
            });
            result = putResponse.ok ? putResponse.json() : false;
            break;

        case 'POST':
            let postResponse = await fetch(API_URL, {
                method: method,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            result = postResponse.ok ? postResponse.json() : false;
            break;
    }

    return result;
}

