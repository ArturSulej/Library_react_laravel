import AuthUser from '../AuthUser'
import BookForm from './BookForm'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

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

            <Button variant='contained' sx={{ bgcolor: 'green', mr: '20px', mb: '10px' }} type="submit">Add Book</Button>
            </BookForm>
        </>
    )
}