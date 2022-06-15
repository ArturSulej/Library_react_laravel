import AuthUser from '../AuthUser'
import CategoryForm from './CategoryForm'
import {  useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'
import Button from '@mui/material/Button'

export default function EditCategory() {
    const navigate = useNavigate()
    const user = AuthUser()

    const category = useParams()

    const swr = useSwr('/category/'+category.id, user.http)

    return( 
        <>
            <h1>Edit Category</h1>
            <CategoryForm initialData={swr.data?.data} onSubmit={data=>{
                    user.http('/category/'+category.id,{method: 'put', data: data}).then(()=>{
                        navigate('/?categoryEdited')
                    })
            }}>

            <Button variant='contained' sx={{ bgcolor: 'green' , mr: '20px', mb: '10px' }} type="submit">Edit Category</Button>
            </CategoryForm>
        </>
    )
}