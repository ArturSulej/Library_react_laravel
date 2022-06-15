import AuthUser from '../AuthUser'
import BookForm from './BookForm'
import { useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'
import Button from '@mui/material/Button'

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

            <Button variant='contained' sx={{ bgcolor: 'green' , mr: '20px', mb: '10px' }} type="submit">Edit Book</Button>
            </BookForm>
        </>
    )
}