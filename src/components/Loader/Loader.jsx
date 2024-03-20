import React from 'react'
import { Puff } from 'react-loader-spinner'

export default function Loader() {
    return (
        <>
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#FFA500"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    )
}
