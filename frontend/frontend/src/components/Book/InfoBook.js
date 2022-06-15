import AuthUser from '../AuthUser'
import { useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'
import { Card, CardContent, Typography } from '@mui/material'

export default function InfoBook() {
    const user = AuthUser()

    const params = useParams()

    const swr = useSwr('/books/'+params.id, user.http)
    const book = swr.data?.data

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
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {book?.slug} 
                        </Typography>
                        <Typography variant='h5' component='div'>
                            {book?.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Category : {book?.book_category.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Author : {book?.author}
                        </Typography>
                        <Typography variant="body2">
                            {book?.description} <br/> <br/>
                            Created: {book && dtf.format(new Date(book?.created_at))} <br />
                            Updated: {book && dtf.format(new Date(book?.updated_at))}
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </>
    )
}