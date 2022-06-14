import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import CategoryForm from './CategoryForm'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useSwr from 'swr'

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

                <button type="submit">Edit Category</button>
            </CategoryForm>
        </>
    )
}