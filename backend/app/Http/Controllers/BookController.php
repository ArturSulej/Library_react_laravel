<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Book::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:50',
            'author' => 'required|string|max:50',
            'category' => 'required'
        ]);

        return Book::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Book::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:50',
            'author' => 'required|string|max:50',
            'category' => 'required'
        ]);

        $book = Book::find($id);
       // $book->title = $request->title;
       // $book->description = $request->description;
       // $book->slug = $request->slug;
        //$book->author = $request->author;
        //$book->category = $request->category;
        //$book->save();
        $book->update($request->all());
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Book::destroy($id);
    }

    /**
     * Search for the specified resource in storage.
     *
     * @param  int  $id
     * @param str $title
     * @return \Illuminate\Http\Response
     */
    public function search($title)
    {
        return Book::where('title', 'like', '%'.$title.'%')->get();
    }
}
