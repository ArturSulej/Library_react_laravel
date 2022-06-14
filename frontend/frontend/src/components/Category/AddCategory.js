import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import CategoryForm from './CategoryForm'
import { Link, useNavigate } from 'react-router-dom'

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

                <button type="submit">Add Category</button>
            </CategoryForm>
        </>
    )
}