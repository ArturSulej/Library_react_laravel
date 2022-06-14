import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import BookForm from './BookForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'

export default function InfoBook() {
    const navigate = useNavigate()
    const user = AuthUser()

    const params = useParams()

    const swr = useSwr('/books/'+params.id, user.http)
    const book = swr.data?.data

    const swr2 = useSwr(()=>'/category/'+book.category,user.http)
    const category = swr2.data?.data

    // Ustawienie formatu czasu i daty
    const dtf = new Intl.DateTimeFormat('pl-pl',{
        'year': 'numeric',
        'month' : 'long',
        'day' : '2-digit',
        'hour': '2-digit',
        'minute' : '2-digit',
        'second' : '2-digit'
    })
    return( 
        <>
            <h1>Info</h1>
            <div>
                <h4>Title : {book?.title}</h4>
                <h6>Slug: {book?.slug}</h6>
                <p>Description: {book?.description}</p>
                <p>Author: {book?.author}</p>
                <p>Category: {category?.name}</p>
                <p>Created: {book && dtf.format(new Date(book?.created_at))}</p>
                <p>Updated: {book && dtf.format(new Date(book?.updated_at))}</p>

            </div>
        </>
    )
}