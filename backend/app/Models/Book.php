<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table = 'books';
    protected $primaryKey = "id";
    
    protected $fillable = [
        'title',
        'description',
        'author',
        'category',
        'slug'
    ];

    protected $hidden = [
        
    ];

    public function book_category(){
        return $this->belongsTo(BookCategory::class,'category');
    }
}
