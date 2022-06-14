import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import BookForm from './BookForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'

export default function EditBook() {
    const navigate = useNavigate()
    const user = AuthUser()

    const book = useParams()

    const swr = useSwr('/books/'+book.id, user.http)

    return( 
        <>
            <h1>Edit Book</h1>
            <BookForm initialData={swr.data?.data} onSubmit={data=>{
                    user.http('/books/'+book.id,{method: 'put', data: data}).then(()=>{
                        navigate('/?bookEdited')
                    })
            }}>

                <button type="submit">Edit Book</button>
            </BookForm>
        </>
    )
}