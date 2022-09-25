import React from "react";
import { render , fireEvent } from "@testing-library/react";
import FormNewBlog from "./FormNewBlog";
import '@testing-library/jest-dom/extend-expect'


test('form test',()=>{
    const mockHandle = jest.fn()
    const component = render(<FormNewBlog addBlogs={mockHandle}/>)
    const input =component.container.querySelector('input')
    const form =component.container.querySelector('form')
    
    fireEvent.change(input,{
        target:{value:'testing'}
    })

    fireEvent.submit(form)
    expect(mockHandle.mock.calls).toHaveLength(1)
    expect(mockHandle.mock.calls[0][0].title).toBe('testing')
   // expect(t).toHaveTextContent('www')


})
