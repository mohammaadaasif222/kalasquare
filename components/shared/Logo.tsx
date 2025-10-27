
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <div className='pb-6'>
            <Link href="/" className="flex items-center gap-2" aria-label="KalaSquare Home">
                <Image src="https://kalasquare.com/public/frontend/images/KalaSquaremainlogo.png" alt="KalaSquare" width={100} height={100} className="rounded-sm" />
            </Link>
        </div>
    )
}
