import AuthUser from '../AuthUser'
import { Link, useNavigate } from 'react-router-dom'
import useSwr from 'swr'
import Button from '@mui/material/Button'

export default function BookForm(props) {
    const user = AuthUser()
    const swr2 = useSwr('/category',user.http)
    const category = swr2.data?.data || []

    return( 
        <>
            <div className="row justify-content-center pt-5">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h1 className="text-center mb-3">Book Form </h1>
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
                            <div className="form-group">
                                <label>Title: </label>
                                <input type="text" name="title" className="form-control" placeholder={props.initialData?.title || "Title"} required min='2' max='255'></input>
                            </div>
                            <div className="form-group mt-3">
                                <label>Description: </label>
                                <input type="text" name="description" className="form-control" placeholder={props.initialData?.description || "Description"} min='2' max='255'></input>
                            </div>
                            <div className="form-group mt-3">
                                <label>Author: </label>
                                <input type="text" name="author" className="form-control" placeholder={props.initialData?.author || "Author"} required min='2' max='255'></input>
                            </div>
                            <div className="form-group mt-3">
                                <label>Slug: </label>
                                <input type="text" name="slug" className="form-control" placeholder={props.initialData?.slug || "slug-text"} required min='2' max='255'></input>
                            </div>
                            <div className="form-group mt-3">
                                <label>Category: </label>
                                <select name="category" className="form-control">
                                    {/* Przypisanie nazwy kategorii do klucza obcego w tabeli book */}
                                    <option disabled defaultValue={0}>{category.find((category)=>category.id === props.initialData?.category)?.name}</option>
                                    {category.map((category)=><option value={category.id} key={category.id}>{category.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group mt-3">
                                {/* Wyświetla wszystkie elementy dziecka */}
                                {props.children}
                                <Button variant='outlined' color='secondary' sx={{ mr: '20px', mb: '10px' }} type="reset">Clear</Button>
                                <Button variant="contained" color="error" sx={{ mb: '10px' }}><Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>Cancel</Link></Button>
                            </div>
                                
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
}