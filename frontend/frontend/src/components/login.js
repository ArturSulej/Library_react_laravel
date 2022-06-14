import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function Login() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const submitForm = () =>{
        // api call
        http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user,res.data.authorisation.token);
            navigate('/')
        }).catch(e=>{
            alert(JSON.stringify(e.response.data.message))
            
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
                    <button type="submit" className="btn btn-primary mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}