import AuthUser from '../AuthUser'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

export default function CategoryForm(props) {

    return( 
        <>
            <div className="row justify-content-center pt-5">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <h1 className="text-center mb-3">Category Form </h1>
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
                            <div className="form-group">
                                <label>Name: </label>
                                <input type="text" name="name" className="form-control" placeholder={props.initialData?.name || "Name"} required min='2' max='255'></input>
                            </div>
                            <div className="form-group mt-3">
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