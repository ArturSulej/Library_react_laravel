import AuthUser from '../AuthUser'
import CategoryForm from './CategoryForm'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

export default function AddCategory() {

    const navigate = useNavigate()
    const user = AuthUser()

    return( 
        <>
            <h1>Add Category</h1>
            <CategoryForm onSubmit={data=>{
                    user.http('/category',{method: 'post', data: data}).then(()=>{
                        navigate('/?categoryAdded')
                    })
            }}>

            <Button variant='contained' sx={{ bgcolor: 'green' , mr: '20px', mb: '10px' }} type="submit">Add Category</Button>
            </CategoryForm>
        </>
    )
}