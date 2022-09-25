import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Blogs() {
  const blogs = useSelector((state) => {
    return state.blogReducer.sort((a, b) => {
      if (a.likes > b.likes) return -1
      if (a.likes === b.likes) return 0
      return 1
    })
  })
  return (
    <div className="flex-col mt-24">
      <p className="text-4xl mb-10 font-black text-gray-900 dark:text-white">
        Blogs
      </p>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link
            to={`/blogs/${blog.id}`}
            className="inline-flex justify-center items-center p-5 text-base font-medium text-gray-500 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="mr-3 w-5 h-5"
              viewBox="0 0 22 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4151_63004)">
                <path
                  d="M5.50085 30.1242C8.53625 30.1242 10.9998 27.8749 10.9998 25.1035V20.0828H5.50085C2.46546 20.0828 0.00195312 22.332 0.00195312 25.1035C0.00195312 27.8749 2.46546 30.1242 5.50085 30.1242Z"
                  fill="#0ACF83"
                />
                <path
                  d="M0.00195312 15.062C0.00195312 12.2905 2.46546 10.0413 5.50085 10.0413H10.9998V20.0827H5.50085C2.46546 20.0827 0.00195312 17.8334 0.00195312 15.062Z"
                  fill="#A259FF"
                />
                <path
                  d="M0.00195312 5.02048C0.00195312 2.24904 2.46546 -0.000244141 5.50085 -0.000244141H10.9998V10.0412H5.50085C2.46546 10.0412 0.00195312 7.79193 0.00195312 5.02048Z"
                  fill="#F24E1E"
                />
                <path
                  d="M11 -0.000244141H16.4989C19.5343 -0.000244141 21.9978 2.24904 21.9978 5.02048C21.9978 7.79193 19.5343 10.0412 16.4989 10.0412H11V-0.000244141Z"
                  fill="#FF7262"
                />
                <path
                  d="M21.9978 15.062C21.9978 17.8334 19.5343 20.0827 16.4989 20.0827C13.4635 20.0827 11 17.8334 11 15.062C11 12.2905 13.4635 10.0413 16.4989 10.0413C19.5343 10.0413 21.9978 12.2905 21.9978 15.062Z"
                  fill="#1ABCFE"
                />
              </g>
              <defs>
                <clipPath id="clip0_4151_63004">
                  <rect
                    width="22"
                    height="30.1244"
                    fill="white"
                    transform="translate(0 -0.000244141)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span className="w-full">{blog.title}</span>
            <svg
              aria-hidden="true"
              className="ml-3 w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      ))}
    </div>
  )
}
