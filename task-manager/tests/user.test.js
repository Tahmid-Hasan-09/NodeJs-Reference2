//Setup Test environment by supertest package(express http route testing)
const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const {
    userOneId,
    userOne,
    setupDatabase
} = require('./fixtures/db')


//Setup teardown,before testing it runs
beforeEach(setupDatabase)

/********* Sign Up Testing *************/
//test() function comes from jest package
test('Should signup a new user', async () => {
    //request() comes from supertest package
    const response = await request(app).post('/users').send({
        name: 'Mredul Jaman',
        email: 'mredul123@gmail.com',
        password: 'mredul123!'
    }).expect(201)
    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Mredul Jaman',
            email: 'mredul123@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mredul123!')
})

/********* Test Login Success *************/
test('should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    //Advanced assertion
    const user = await User.findById(userOne._id)
    expect(response.body.token).toBe(user.tokens[1].token)
})

/********* Test Login Failure *************/
test('should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'thisisnotmypass'
    }).expect(400)
})

/***** Test getting profile with authentication token ****/
test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

/***** Test not getting profile with authentication token ****/
test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

/***** Test deleting account with authentication token ****/
test('should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOne._id)
    expect(user).toBeNull()
})

/***** Test not deleting account without authentication token ****/
test('should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})
/***** Test upload avatar files route ****/
test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOne._id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

/***** Test upload avatar files route ****/
test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Tahmid Hasan Munna'
        })
        .expect(200)
    const user = await User.findById(userOne._id)
    expect(user.name).not.toEqual(userOne.name)
})

test('should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Dhaka'
        })
        .expect(400)
})