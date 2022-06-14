<?php
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::resource('books',BookController::class);

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/


//Public routes
Route::get('/books/search/{title}', [BookController::class, 'search']);
Route::get('/books', [BookController::class, 'index']);
Route::get('/books/{id}', [BookController::class, 'show']);
Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

// Protected routes
/*
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/books',[BookController::class, 'store']);
    Route::put('/books/{id}',[BookController::class, 'update']);
    Route::delete('/books/{id}',[BookController::class, 'destroy']);
    Route::post('/logout',[AuthController::class, 'logout']);
});
*/

Route::group(['middleware' => ['auth:api']], function () {
    Route::post('/books',[BookController::class, 'store']);
    Route::put('/books/{id}',[BookController::class, 'update']);
    Route::delete('/books/{id}',[BookController::class, 'destroy']);
    Route::post('/logout',[AuthController::class, 'logout']);
});
/*
Route::controller(AuthController::class)->group(function(){
    Route::post('/books',[BookController::class, 'store']);
    Route::put('/books/{id}',[BookController::class, 'update']);
    Route::delete('/books/{id}',[BookController::class, 'destroy']);
    Route::post('/logout',[AuthController::class, 'logout']);
});*/