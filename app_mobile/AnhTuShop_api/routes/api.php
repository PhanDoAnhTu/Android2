<?php
use App\Http\Controllers\Backend\BrandController_Backend;
use App\Http\Controllers\Backend\CategoryController_Backend;
use App\Http\Controllers\Backend\ContactController_Backend;
use App\Http\Controllers\Backend\ExportProductController_Backend;
use App\Http\Controllers\Backend\InfoController_Backend;
use App\Http\Controllers\Backend\MenuController_Backend;
use App\Http\Controllers\Backend\OrderController_Backend;
use App\Http\Controllers\Backend\OrderdetailController_Backend;
use App\Http\Controllers\Backend\PageUsController_Backend;
use App\Http\Controllers\Backend\PostController_Backend;
use App\Http\Controllers\Backend\ProductController_Backend;
use App\Http\Controllers\Backend\SaleProductController_Backend;
use App\Http\Controllers\Backend\SliderController_Backend;
use App\Http\Controllers\Backend\StoreProductsController_Backend;
use App\Http\Controllers\Backend\TopicController_Backend;
use App\Http\Controllers\Backend\UserController_Backend;
use App\Http\Controllers\Frontend\Product_ReviewsController;
use App\Http\Controllers\Frontend\SaleProductsController;
use App\Http\Controllers\Frontend\StoreProductsController;
use App\Http\Controllers\MailController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Frontend\InfoController;
use App\Http\Controllers\Frontend\PageUsController;
use App\Http\Controllers\Frontend\BrandController;
use App\Http\Controllers\Frontend\CategoryController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\MenuController;
use App\Http\Controllers\Frontend\OrderController;
use App\Http\Controllers\Frontend\OrderdetailController;
use App\Http\Controllers\Frontend\PostController;
use App\Http\Controllers\Frontend\ProductController;
use App\Http\Controllers\Frontend\SliderController;
use App\Http\Controllers\Frontend\TopicController;
use App\Http\Controllers\Frontend\UserController;






////////////////////FRONTEND////////////////


Route::prefix('user')->group(function () {
    Route::post('register_customer', [UserController::class, 'register_customer']);
    Route::post('login_customer', [UserController::class, 'login_customer']);
    Route::post('check_email', [UserController::class, 'check_email']);
    Route::put('reset_password', [UserController::class, 'reset_password']);
    Route::get('get_CustomerById/{user_id}', [UserController::class, 'get_CustomerById']);

});
Route::post('send_mail', [MailController::class, 'send_mail']);
Route::post('mail_alert_register', [MailController::class, 'mail_alert_register']);

Route::prefix('category')->group(function () {
    Route::get('getAllCategory', [CategoryController::class, 'getAllCategory']);
    Route::get('category_list/{parent_id?}', [CategoryController::class, 'category_list']);
    Route::get('getBySlug/{slug}', [CategoryController::class, 'getBySlug']);
    Route::get('GetCategorieByParent', [CategoryController::class, 'GetCategorieByParent']);

});
Route::prefix('order')->group(function () {
    Route::post('checkout', [OrderController::class, 'checkout']);
    Route::get('getOrder_ByCustomer/{user_id}', [OrderController::class, 'getOrder_ByCustomer']);
    Route::get('updateStatusOrder/{order_id}', [OrderController::class, 'updateStatusOrder']);
});

Route::prefix('brand')->group(function () {
    Route::get('showById/{id}', [BrandController::class, 'showById']);
    Route::get('brand_all', [BrandController::class, 'brand_all']);
});

Route::prefix('menu')->group(function () {
    Route::get('menu_list/{position}/{parent_id?}', [MenuController::class, 'menu_list']);
});


Route::prefix('slider')->group(function () {
    Route::get('slider_list/{position}', [SliderController::class, 'slider_list']);
});


Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']);
});


Route::prefix('store_products')->group(function () {
    Route::get('getBestsallerProductAll/{limit}/{page?}', [StoreProductsController::class, 'getBestsallerProductAll']);
    Route::get('getNewProductAll/{limit}/{page?}', [StoreProductsController::class, 'getNewProductAll']);
    Route::get('getProductByCategory/{limit}/{page?}/{category_id}', [StoreProductsController::class, 'getProductByCategory']);
    Route::get('product_detail/{slug}/{other_product_limit}/{comment_limit}', [StoreProductsController::class, 'product_detail']);
    Route::post('ProductByCategory_filter/{limit}/{page?}/{slug}/{filter?}', [StoreProductsController::class, 'ProductByCategory_filter']);
    Route::post('NewProductAll_filter/{limit}/{page?}', [StoreProductsController::class, 'NewProductAll_filter']);
    Route::post('BestSallersProductAll_filter/{limit}/{page?}', [StoreProductsController::class, 'BestSallersProductAll_filter']);

});

Route::prefix('sale_products')->group(function () {
    Route::get('getSaleProductAll/{limit}/{page?}', [SaleProductsController::class, 'getSaleProductAll']);
    Route::post('SaleProductAll_filter/{limit}/{page?}', [SaleProductsController::class, 'SaleProductAll_filter']);

});
Route::prefix('product_reviews')->group(function () {
    Route::post('add_Rating', [Product_ReviewsController::class, 'add_Rating']);

});

////////////////////BACKEND////////////////
Route::prefix('export')->group(function () {
    Route::post('add_order_export', [ExportProductController_Backend::class, 'add_order_export']);
});

Route::prefix('user')->group(function () {
    Route::post('login_admin', [UserController_Backend::class, 'login_admin']);
    Route::post('check_email_admin', [UserController_Backend::class, 'check_email_admin']);
    Route::put('reset_password_admin', [UserController_Backend::class, 'reset_password_admin']);

    Route::get('index', [UserController_Backend::class, 'index']);
    Route::get('get_customer', [UserController_Backend::class, 'get_customer']);
    Route::get('show/{id}', [UserController_Backend::class, 'show']);
    Route::post('store', [UserController_Backend::class, 'store']);
    Route::post('update/{id}', [UserController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [UserController_Backend::class, 'destroy']);
});

Route::prefix('store_products_admin')->group(function () {
    Route::get('getProductAndStoreProduct', [StoreProductsController_Backend::class, 'getProductAndStoreProduct']);
    Route::post('add_store_product', [StoreProductsController_Backend::class, 'add_store_product']);
    Route::post('remove_store_product', [StoreProductsController_Backend::class, 'remove_store_product']);
});

Route::prefix('sale_products_admin')->group(function () {
    Route::get('getAllSaleProduct', [SaleProductController_Backend::class, 'getAllSaleProduct']);
    Route::post('add_SaleProduct', [SaleProductController_Backend::class, 'add_SaleProduct']);
    Route::get('remove_sale_product/{id}', [SaleProductController_Backend::class, 'remove_sale_product']);
    Route::get('getAll_SaleId', [SaleProductController_Backend::class, 'getAll_SaleId']);
    Route::get('restore_sale_product/{id}', [SaleProductController_Backend::class, 'restore_sale_product']);

});
Route::prefix('brand')->group(function () {
    Route::get('getAllBrand', [BrandController_Backend::class, 'getAllBrand']);
    Route::get('getAllBrand_InTrash', [BrandController_Backend::class, 'getAllBrand_InTrash']);
    Route::get('getBrandById/{id}', [BrandController_Backend::class, 'getBrandById']);
    Route::get('getBrandBySlug/{slug}', [BrandController_Backend::class, 'getBrandBySlug']);
    Route::post('add_brand', [BrandController_Backend::class, 'add_brand']);
    Route::post('update_brand/{id}', [BrandController_Backend::class, 'update_brand']);
    Route::get('destroy_brand/{id}', [BrandController_Backend::class, 'destroy_brand']);
});

/////////////

Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController_Backend::class, 'index']);
    Route::get('show/{id}', [CategoryController_Backend::class, 'show']);
    Route::post('store', [CategoryController_Backend::class, 'store']);
    Route::post('update/{id}', [CategoryController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [CategoryController_Backend::class, 'destroy']);
    Route::get('category_list/{parent_id}', [CategoryController_Backend::class, 'category_list']);
    Route::get('getBySlug/{slug}', [CategoryController_Backend::class, 'getBySlug']);
    });
    Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController_Backend::class, 'index']);
    Route::get('show/{id}', [ContactController_Backend::class, 'show']);
    Route::post('store', [ContactController_Backend::class, 'store']);
    Route::post('update/{id}', [ContactController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [ContactController_Backend::class, 'destroy']);
    });
    Route::prefix('menu')->group(function () {
    Route::get('index', [MenuController_Backend::class, 'index']);
    Route::get('show/{id}', [MenuController_Backend::class, 'show']);
    Route::post('store', [MenuController_Backend::class, 'store']);
    Route::post('update/{id}', [MenuController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [MenuController_Backend::class, 'destroy']);
    Route::get('menu_list/{position}/{parent_id?}', [MenuController_Backend::class, 'menu_list']);


    });
    Route::prefix('order')->group(function () {
    Route::get('index', [OrderController_Backend::class, 'index']);
    Route::get('show/{id}', [OrderController_Backend::class, 'show']);
    Route::get('getOrderId_New/{user_id}', [OrderController_Backend::class, 'getOrderId_New']);
    Route::post('store', [OrderController_Backend::class, 'store']);
    Route::post('update/{id}', [OrderController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [OrderController_Backend::class, 'destroy']);
    });
    Route::prefix('post')->group(function () {
    Route::get('index', [PostController_Backend::class, 'index']);
    Route::get('show/{id}', [PostController_Backend::class, 'show']);
    Route::post('store', [PostController_Backend::class, 'store']);
    Route::post('update/{id}', [PostController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [PostController_Backend::class, 'destroy']);
    Route::get('post_byType/{limit}/{type}', [PostController_Backend::class, 'post_byType']);
    Route::get('post_byTopic/{limit}/{topic_id}', [PostController_Backend::class, 'post_byTopic']);
    Route::get('post_detail/{slug}', [PostController_Backend::class, 'post_detail']);
    
    });
    Route::prefix('product')->group(function () {
    Route::get('index', [ProductController_Backend::class, 'index']);
    Route::get('show/{id}', [ProductController_Backend::class, 'show']);
    Route::post('store', [ProductController_Backend::class, 'store']);
    Route::post('update/{id}', [ProductController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [ProductController_Backend::class, 'destroy']);
    Route::get('product_home/{limit}/{category_id?}', [ProductController_Backend::class, 'product_home']);
    Route::get('product_list/{limit}/{category_id?}', [ProductController_Backend::class, 'product_list']);
    Route::get('product_all/{limit}/{page?}', [ProductController_Backend::class, 'product_all']);
    Route::get('product_category/{limit}/{category_id}/{page?}', [ProductController_Backend::class, 'product_category']);
    Route::get('product_brand/{limit}/{brand_id}/{page?}', [ProductController_Backend::class, 'product_brand']);
    Route::get('product_detail/{id}', [ProductController_Backend::class, 'product_detail']);
    Route::get('product_other/{id}/{limit}', [ProductController_Backend::class, 'product_other']);
    });
    Route::prefix('slider')->group(function () {
    Route::get('index', [SliderController_Backend::class, 'index']);
    Route::get('show/{id}', [SliderController_Backend::class, 'show']);
    Route::get('slider_list/{position}', [SliderController_Backend::class, 'slider_list']);
    Route::post('store', [SliderController_Backend::class, 'store']);
    Route::post('update/{id}', [SliderController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [SliderController_Backend::class, 'destroy']);
    });
    Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController_Backend::class, 'index']);
    Route::get('show/{id}', [TopicController_Backend::class, 'show']);
    Route::get('get_byPage/{page}/{limit}', [TopicController_Backend::class, 'get_byPage']);
    Route::post('store', [TopicController_Backend::class, 'store']);
    Route::post('update/{id}', [TopicController_Backend::class, 'update']);
    Route::delete('destroy/{id}', [TopicController_Backend::class, 'destroy']);
    Route::get('getBySlug/{slug}', [TopicController_Backend::class, 'getBySlug']);
    });
    
    
    Route::prefix('orderdetail')->group(function(){
        Route::get('index',[OrderdetailController_Backend::class,'index']);
        Route::get('get_ByOrder/{order_id}',[OrderdetailController_Backend::class,'get_ByOrder']);
        Route::get('show/{id}',[OrderdetailController_Backend::class,'show']);
        Route::post('store',[OrderdetailController_Backend::class,'store']);
        Route::post('update/{id}',[OrderdetailController_Backend::class,'update']);
        Route::delete('destroy/{id}', [OrderdetailController_Backend::class, 'destroy']);
    });
    
    Route::prefix('page_us')->group(function(){
        Route::get('index',[PageUsController_Backend::class,'index']);
        Route::get('show/{id}',[PageUsController_Backend::class,'show']);
        Route::post('store',[PageUsController_Backend::class,'store']);
        Route::post('update/{id}',[PageUsController_Backend::class,'update']);
        Route::delete('destroy/{id}', [PageUsController_Backend::class, 'destroy']);
        Route::get('get_BySlug/{slug}',[PageUsController_Backend::class,'get_BySlug']);
    
    });
    Route::prefix('info')->group(function(){
    
        Route::get('company_info/{id}',[InfoController_Backend::class,'company_info']);
        Route::post('update/{id}',[InfoController_Backend::class,'update']);
    
    });

?>