import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import BookForm from './BookForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'

export default function InfoBook() {
    const navigate = useNavigate()
    const user = AuthUser()

    const params = useParams()

    const swr = useSwr('/books', user.http)
    const book = swr.data?.data || []

    const swr2 = useSwr('/category',user.http)
    const category = swr2.data?.data || []

    return( 
        <>
            <h1>List of books</h1>
            <div>
            <ol>
                {category.map((category)=> 
                <li  key={category.id}>{category.name}
                    <ul>
                        {book.filter(book=>book.category === category.id).map((book)=><li key={book.id}>
                        <Link to={`/infoBook/${book.id}`}>{book.title}</Link>
                            </li>)}
                    </ul>
                </li>)}
            </ol>

            </div>
        </>
    )
}