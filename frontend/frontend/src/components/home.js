import {Fragment, useEffect, useState} from 'react'
import * as React from 'react'
import AuthUser from './AuthUser'
import { Link, Navigate, useSearchParams, useNavigate } from 'react-router-dom'
import useSwr, {useSWRConfig} from 'swr'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
//import Paper from '@mui/material/Paper';

export default function Home() {
    // Dostęp do axiosa
    const user = AuthUser()
    // Biblioteka do cache'owania rezultatów zapytania
    const swr = useSwr('/books',user.http)
    // Tablica danych książek
    const books = swr.data?.data || []
    const swr2 = useSwr('/category',user.http)
    const category = swr2.data?.data || []
    // Używany do modyfikacji cache'owania
    const config = useSWRConfig()

    // Utworzenie dla każdej z książek wpisu w cache, dzięki temu, po odwiedzeniu strony, nie trzeba wykonywać kolejnego zapytania
    useEffect(()=>{
        books.forEach(element => {
            config.mutate('/books/'+element.id,{data:element},{revalidate: false})
        });
    },[books])


    // Część adresu url po znaku ?
    let [searchParams,setSearchParams] = useSearchParams()

    // Sprawdzamy część znaku
    useEffect(()=>{
        if(searchParams.has('bookAdded')){
            alert("Book Added!")
        }
        if(searchParams.has('categoryAdded')){
            alert('Category Added!')
        }
        // Czyszczenie adresu url
        setSearchParams({},{replace: true})
    },[searchParams])

    return( 
        <>
            <h1>Home page</h1>
            <br></br>

            {/* Wyświetlenie elementu jeżeli użytkownik jest zalogowany */}
            {user.user && <Link to={'/addBook'}><Button variant='contained' sx={{ bgcolor: 'green' }}>Dodaj książkę</Button></Link>}
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            {user.user && <>
                                <TableCell>Edit Book</TableCell>
                                <TableCell>Delete Book</TableCell>
                            </>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Stworzenie wiersza tabeli dla każdej z książek */}
                        {books.map((book)=><TableRow key={book.id}>
                            <TableCell component="th" scope="row"><Link to={`/infoBook/${book.id}`}>{book.title}</Link></TableCell>
                            <TableCell>{book.book_category.name}</TableCell>
                            {/* 
                                Link - przekierowanie do innej strony
                                Http - wysyła żądanie do backendu
                                mutate - usuwa książkę z cache
                                filter - usuwa wszystkie książki o podanym id
                            */}
                            {user.user && <>
                            <TableCell><Button variant='outlined' color='info'><Link color="primary" to={'/editBook/'+book.id}>Edytuj</Link></Button></TableCell>
                            <TableCell><Button variant='contained' color="error" onClick={()=>{user.http('/books/'+book.id,{method: 'delete'})
                                config.mutate('/books', (data)=>({data:data.data?.filter(book2=>book2.id !== book.id)}), {revalidate: false})
                            }}>Usuń</Button></TableCell>
                        </>}
                    </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            {user.user && <Link to={'/addBook'}><Button variant='contained' sx={{ bgcolor: 'green' }}>Dodaj książkę</Button></Link>}
            <br></br><br></br>

            
            {user.user && <Link to={'/addCategory'}><Button variant='contained' sx={{ bgcolor: 'green' }}>Dodaj kategorię</Button></Link>}            
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            {user.user && <>
                                <TableCell>Edit Category</TableCell>
                                <TableCell>Delete Category</TableCell>
                            </>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category.map((category)=><TableRow key={category.id}>
                        <TableCell component="th" scope="row">{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        {user.user && <>
                        <TableCell><Button variant='outlined' color='info'><Link color="primary" to={'/editCategory/'+category.id}>Edytuj</Link></Button></TableCell>
                        <TableCell><Button variant='contained' color="error" onClick={()=>{user.http('/category/'+category.id,{method: 'delete'})
                            config.mutate('/category', (data)=>({data:data.data?.filter(category2=>category2.id !== category.id)}), {revalidate: false})
                        }}>Usuń</Button></TableCell>
                        </>}
                    </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
            {user.user && <Link to={'/addCategory'}><Button variant='contained' sx={{ bgcolor: 'green' }}>Dodaj kategorię</Button></Link>}           
        </>
    )
}