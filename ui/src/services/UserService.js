export async function getAllUsers() {

    const response = await fetch('https://mern-app-stack-hw.herokuapp.com/api/users');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`https://mern-app-stack-hw.herokuapp.com/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })
    return await response.json();
}

export async function deleteUser(userId) {
    const response = await fetch(`https://mern-app-stack-hw.herokuapp.com/api/user/${userId}`, {method: 'DELETE'})
    return await response.json();
}

export async function deleteAllSelectedUser(userId) {
    const response = await fetch(`https://mern-app-stack-hw.herokuapp.com/api/users/${userId}`, {method: 'DELETE'})
    return await response.json();
}

export async function editUser(data) {
    const response = await fetch(`https://mern-app-stack-hw.herokuapp.com/api/user`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })
    return await response.json();
}

export async function fetchSettings() {

    const response = await fetch('https://mern-app-stack-hw.herokuapp.com/api/settings');
    return await response.json();
}

export async function sendData(data) {
    const response = await fetch(`https://mern-app-stack-hw.herokuapp.com/api/send-data`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    return await response.json();
}
