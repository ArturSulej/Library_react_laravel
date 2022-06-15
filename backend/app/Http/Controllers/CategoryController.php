<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BookCategory;

class CategoryController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth:api');
    }

    public function index()
    {
        return BookCategory::with('books')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        return BookCategory::create($request->all());
    }

    public function show($id)
    {
        return BookCategory::find($id);
    }

    public function destroy($id)
    {
        return BookCategory::destroy($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = BookCategory::find($id);
        $category->update($request->all());
        return $category;
    }

    public function search($name)
    {
        return BookCategory::where('name', 'like', '%'.$name.'%')->get();
    }
}
