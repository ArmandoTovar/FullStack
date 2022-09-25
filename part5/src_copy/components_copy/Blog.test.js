import React from "react";
import { render , fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import '@testing-library/jest-dom/extend-expect'


test('Show default title and autor, but no show url and like',()=>{
    const blog={
        title:'titulo',
        author:'autor',
        url:'www',
        likes:3
    }
    const component = render(<Blog blog={blog}></Blog>)
    const p =component.container.querySelector('p')
    const t =component.container.querySelector('.visible')
    expect(p).toHaveTextContent('titulo')
    expect(p).toHaveTextContent('autor')
   // expect(t).toHaveTextContent('www')
    expect(t).toHaveStyle('display:none')

})


test('Show url and like',()=>{
    const blog={
        title:'titulo',
        author:'autor',
        url:'www',
        likes:3
    }
    const component = render(<Blog blog={blog}></Blog>)
    const p =component.getByText('view')
     fireEvent.click(p)
     const t =component.container.querySelector('.visible')
    expect(t).not.toHaveStyle('display:none')

})

// test('2 click',()=>{
//     const blog={
//         title:'titulo',
//         author:'autor',
//         url:'www',
//         likes:3
//     }
//     const mockHandler = jest.fn()
//     const component = render(<Blog blog={blog} updateBlog={mockHandler}></Blog>)
//     const p =component.getByText('likes')
//      fireEvent.click(p)
//      fireEvent.click(p)
    
    
//      expect(mockHandler.mock.calls).toHaveLength(2)

// })

