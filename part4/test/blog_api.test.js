const mongoose= require('mongoose')
const Blog = require('../models/blog')
const app = require ('../app')
const supertest = require('supertest')
const helper = require('./test_helper')
const user = require('../models/user')
const api=supertest(app)
jest.setTimeout(10000)

beforeEach( async ()=>{
    await Blog.deleteMany({})
    await user.deleteMany({})
  
//     const all =  helper.blogs.map(blog=>new Blog(blog))
//      const blogs = await all.map(blog=>blog.save())
//    await Promise.all(blogs)

} )


    test('add new user', async ()=>{
    const prevDb = await helper.getAllDbUserTest()
    await api.post('/api/users').send({user:'roots',password:'12345'}).
    expect(200).
    expect('Content-type',/application\/json/)
    
    const newDb = await helper.getAllDbUserTest()
   expect(newDb.length).toBe(prevDb.length+1)
   
})
test('add new user without password', async ()=>{

    await api.post('/api/users').send({user:'roots'}).
    expect(400)
    
})

test('add new user with min length', async ()=>{

    await api.post('/api/users').send({user:'ro',password:'12'}).
    expect(400)
}) 



test('add new user duplicate', async ()=>{
    await api.post('/api/user').send({user:'roots',password:'12345'})
    await api.post('/api/user').send({user:'roots',password:'12345'}).
    expect(404)
    
})
test('get all data of db',async ()=>{

    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-type',/application\/json/)

})

test('get id uniqued',async ()=>{
    const response =await api.get('/api/blogs')
  response.body.forEach(blog=>{
    expect(blog.id).toBeDefined();
})

})

test('add new Blog', async ()=>{
    
    
   const user=  await api.post('/api/users').send({user:'roots',password:'12345'})
   const login =  await api.post('/api/login').send({user:'roots',password:'12345'})
   
   const token = 'bearer '+ login.body.token
   console.log(user.body.id)

   const tempBlog = {  
    title: 'String',
    author:'String',
    url: 'String',
    user: [user.body.id]
    }
    await api.post('/api/blogs').send(tempBlog).set({ Authorization: token })
    .expect(201)
    .expect('Content-type',/application\/json/)

    const allTempBlog =await helper.getAllDbTest()
    expect(allTempBlog).toHaveLength(1)
    const content = allTempBlog.map(ele=>ele.title)
    expect(content).toContain('String')

})

// test('default likes', async ()=>{
//     const tempBlog = {  
//     title: 'String',
//     author:'String',
//     url: 'String',
//     }
//     const temp = await api.post('/api/blogs').send(tempBlog)
  

//     const response = temp.body;
//     expect(response.likes).toBe(0);

// })

// test('title and url required', async ()=>{
//     const tempBlog = {  
//     author:'String',
//     }
//     await api.post('/api/blogs').send(tempBlog)
//     .expect(400)
    

// })

// test('Delete item', async ()=>{
//     const temp = await helper.getAllDbTest()
//     const blogToDelete = temp[0]
//     console.log(blogToDelete.id)
//    await api.delete(`/api/blogs/${blogToDelete.id}`)
//    .expect(204)
    
//    const newTemp = await helper.getAllDbTest()
//    expect(newTemp).toHaveLength(temp.length-1)


//     expect(newTemp).not.toContain(blogToDelete.title)
// })

// test('Delete false item', async ()=>{
//     const id = await helper.nonExistingId

//    await api.delete(`/api/blogs/${id}`)
//    .expect(400)
   
// })

// test('Edit a blog ',async ()=>{
//     const temp = await helper.getAllDbTest()
//     const blogToEditID = temp[0].id
//     const edit = {
//         title:'new title edit test'
//     }
   
//    const ready= await api.put(`/api/blogs/${blogToEditID}`).send(edit).expect('Content-type',/application\/json/)
//    console.log(ready.body)
//     const newTemp = await helper.getAllDbTest()
//     const title = newTemp.map((r) => r.title)
//     expect(title).toContain('new title edit test')
// })

afterAll(() => {
    mongoose.connection.close()
  })
  