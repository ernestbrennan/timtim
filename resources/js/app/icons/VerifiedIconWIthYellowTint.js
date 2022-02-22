import React from 'react';

export default (props) => {
  return (
    <svg width="18" height="18" fill="none">
      <mask id="a" maskUnits="userSpaceOnUse" x="10" y="3" width="7" height="15">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.305 3.86h5.716V17.1h-5.716V3.86z" fill="#fff"></path>
      </mask>
      <g mask="url(#a)">
        <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
              d="M10.756 17.1a.45.45 0 01-.266-.814c1.57-1.147 2.687-2.144 3.232-2.882.85-1.152 1.311-2.442 1.373-3.835.058-1.29 0-5.214 0-5.253a.45.45 0 01.443-.457c.22.01.454.196.457.444.002.162.058 3.989 0 5.305a7.865 7.865 0 01-1.548 4.33c-.608.822-1.76 1.857-3.427 3.076a.443.443 0 01-.264.086z"
              fill="#fff"></path>
      </g>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M13.934 3.634a15.988 15.988 0 00-10.767 0 .7.7 0 00-.467.656V8.68c.01 2.177 1.095 4.223 2.928 5.519l2.691 1.927a.401.401 0 00.462 0l2.692-1.927c1.833-1.296 2.918-3.342 2.927-5.519V4.29a.698.698 0 00-.466-.656z"
            fill="#fff"></path>
      <path opacity="0.3" fillRule="evenodd" clipRule="evenodd"
            d="M3.137 2.7a.434.434 0 01-.154-.842 14.892 14.892 0 019.299-.399.435.435 0 11-.236.838 14.012 14.012 0 00-8.756.375.431.431 0 01-.153.028z"
            fill="#fff"></path>
      <path fillRule="evenodd" clipRule="evenodd"
            d="M8.156 10.8c-.229 0-.458-.08-.65-.243l-1.91-2.086a.792.792 0 01-.012-1.028.6.6 0 01.918-.013L8.16 9.247l3.34-3.642a.601.601 0 01.918.015.793.793 0 01-.014 1.03l-3.495 3.81a1.02 1.02 0 01-.753.34z"
            fill="#FF8C27"></path>
    </svg>
  )
}