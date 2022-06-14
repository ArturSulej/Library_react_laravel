import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import { Link, useNavigate } from 'react-router-dom'

export default function CategoryForm(props) {
    const navigate = useNavigate()
    const user = AuthUser()

    return( 
        <>
            <form onSubmit={e=>{
                if(e.currentTarget.checkValidity()){
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    let data = {
                        'name' : formData.get('name'),
                    }
                    props.onSubmit(data)
                    
                }
            }}>
                <input type="text" name="name" placeholder={props.initialData?.name || "Name"} required min='2' max='255'></input>

                {props.children}
                <button type="reset">Clear</button>
                <Link to={'/'}>Back</Link>
            </form>
        </>
    )
}