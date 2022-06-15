import { useEffect, useState} from 'react'
import AuthUser from '../AuthUser'
import { Link, useNavigate } from 'react-router-dom'
import useSwr from 'swr'

export default function BookForm(props) {
    const navigate = useNavigate()
    const user = AuthUser()
    const swr2 = useSwr('/category',user.http)
    const category = swr2.data?.data || []

    return( 
        <>
            <form onSubmit={e=>{
                // Sprawdzanie poprawności danych
                if(e.currentTarget.checkValidity()){
                    // Zapobiegnięcie odświeżeniu strony
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    let data = {
                        'title' : formData.get('title'),
                        'description' : formData.get('description'),
                        'author' : formData.get('author'),
                        'slug' : formData.get('slug'),
                        'category' : Number(formData.get('category')),
                    }
                    props.onSubmit(data)
                    
                }
            }}>
                {/* Wyświetlenie pobranych z bazy wartości lub statycznie przypisanych */}
                <input type="text" name="title" placeholder={props.initialData?.title || "Title"} required min='2' max='255'></input>
                <input type="text" name="description" placeholder={props.initialData?.description || "Description"} min='2' max='255'></input>
                <input type="text" name="author" placeholder={props.initialData?.author || "Author"} required min='2' max='255'></input>
                <input type="text" name="slug" placeholder={props.initialData?.slug || "Slug"} required min='2' max='255'></input>
                <select name="category">
                    {/* Przypisanie nazwy kategorii do klucza obcego w tabeli book */}
                    <option disabled defaultValue={0}>{category.find((category)=>category.id === props.initialData?.category)?.name}</option>
                    {category.map((category)=><option value={category.id} key={category.id}>{category.name}</option>)}
                </select>

                {/* Wyświetla wszystkie elementy dziecka */}
                {props.children}
                <button type="reset">Clear</button>
                <Link to={'/'}>Back</Link>
            </form>
        </>
    )
}