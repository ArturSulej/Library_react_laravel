import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import BookForm from './BookForm'
import { Link, useNavigate } from 'react-router-dom'

export default function AddBook() {
    // Pozwala na zmianę adresu URL
    const navigate = useNavigate()
    const user = AuthUser()

    return( 
        <>
            <h1>Add Book</h1>
            <BookForm onSubmit={data=>{
                    user.http('/books',{method: 'post', data: data}).then(()=>{
                        navigate('/?bookAdded')
                    })
            }}>

                <button type="submit">Add Book</button>
            </BookForm>
        </>
    )
}