import AuthUser from '../AuthUser'
import { Link } from 'react-router-dom'
import useSwr from 'swr'

export default function InfoBook() {
    const user = AuthUser()

    const swr2 = useSwr('/category',user.http)
    const category = swr2.data?.data || []

    return( 
        <>
            <h1>List of books</h1>
            <div>
            <ol class='list-group list-group-numbered'>
                {category.map((cat)=> 
                <li class="list-group-item list-group-item-dark" key={cat.id}><b>{cat.name}</b>
                    <ul class="list-group list-group-flush">
                        {cat.books.map((book)=>
                        <Link style={{ textDecoration: 'none' }} class="link-dark" to={`/infoBook/${book.id}`}>
                            <li class="list-group-item list-group-item-secondary" key={book.id}>
                                {book.title}
                            </li>
                        </Link>)}
                    </ul>
                </li>)}
            </ol>

            </div>
        </>
    )
}