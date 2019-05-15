const config = require('config.json');
const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
{ id: 2, username: 'sergio', password: 'test', firstName: 'Sergio', lastName: 'User' }];

module.exports = {
    authenticate,
    getAuthenticate,
    getAll,
    getTest
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        console.log('AAAAA');
        return {
            ...userWithoutPassword,
            token
        };
    }
}

async function getAuthenticate(){
    console.log('getTest');
    const message = 'curl --request POST --header "Content-Type: application/json" --data \'{ "username":"test", "password":"test" }\' http://127.0.0.1:4000/users/authenticate';
    return {'message':message};
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getTest(req, res,next) {
    console.log('getTest');
    return 'test';
}
