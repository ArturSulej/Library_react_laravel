import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser.js';



export default function Register() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    //const[error, setError] = useState();

    const submitForm = (form) =>{
        // api call
        http.post('/register',{email:email,password:password,name:name}).then((res)=>{
            setToken(res.data.user,res.data.authorisation.token)
            navigate('/')
        }).catch(e=>{
            // Zwraca pary klucz-wartość w danym obiekcie
            Object.entries(e.response.data.errors)
            .forEach(([key,element]) => {
                // Wyświetlanie błędu
                form[key].setCustomValidity(JSON.stringify(element))
                form[key].reportValidity()
            });
            
        })
    }

    return(
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Register </h1>
                    <form onSubmit={e=>{
                        if(e.currentTarget.checkValidity()){
                            e.preventDefault()
                            submitForm(e.currentTarget)
                        }
                    }}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" className="form-control" placeholder="Enter name" required minLength='5' maxLength='25'
                            onChange={e=>setName(e.target.value)}
                        id="name" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter email" required minLength='5' maxLength='50'
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>

                    <div className="form-group mt-3">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" required minLength='8' maxLength='30'
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
