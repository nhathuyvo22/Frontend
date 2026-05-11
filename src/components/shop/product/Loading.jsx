import React from 'react'

export default function Loading() {
    console.log("Loading component rendered");
    return (
        <div>
            <img src={`${process.env.NEXT_PUBLIC_IMG_STATIC_URL}Loading_2.gif`} />
        </div>
    )
}