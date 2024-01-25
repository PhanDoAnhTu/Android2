<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class StoreProductsController_Backend extends Controller
{

    public function add_store_product(Request $request)
    {
        $store_products = DB::table("store_products")->where('product_id', $request->product_id);
        $products = DB::table("product")->where([['id', $request->product_id], ['status', '=', 1]]);
        if ($store_products->count() > 0) {
            $update_qty = $request->product_qty + $store_products->first()->qty;
            $addPro = $store_products
                ->update(['qty' => $update_qty, 'price' => $request->product_price]);
            return response()->json(

                ['success' => true, 'message' => "Cập nhật dữ liệu thành công", "addPro" => $addPro],
                200

            );
        } else if ($products->count() > 0) {
            $addPro = DB::table('store_products')->insert([
                'product_id' => $request->product_id,
                'qty' => $request->product_qty,
                'price' => $request->product_price,
            ]);
            return response()->json(

                ['success' => true, 'message' => "Thêm dữ liệu thành công", "addPro" => $addPro],
                200

            );
        } else {
            return response()->json(

                ['success' => false, 'message' => "Thêm dữ liệu không thành công, không tồn tại id này trong bảng product"],
                200

            );
        }
    }

    public function remove_store_product(Request $request)
    {
        $store_products = DB::table("store_products")->where('product_id', $request->product_id);
        $sale_product = DB::table("sale_products")->where([['product_id', "=", $store_products->first()->product_id],['status',1]]);
        if($sale_product->count()>0){
            return response()->json(

                ['success' => false, 'message' => "Xóa dữ liệu không thành công, sản phẩm đang có ở mục giảm giá"],
                200

            );
        }

        if ($store_products->count() > 0) {
            if ($store_products->first()->status === 1 && $request->rm==[]) {
                $store_products
                    ->update(['status' => 0]);
                return response()->json(

                    ['success' => true, 'message' => "Xóa dữ liệu thành công"],
                    200

                );
            } else if ($store_products->first()->status === 0 && $request->rm ==[]) {
                $store_products
                    ->update(['status' => 1]);
                return response()->json(

                    ['success' => true, 'message' => "Khôi phục dữ liệu thành công"],
                    200
                );
            }else if($request->rm!=[]){
                $store_products->delete();

                return response()->json(

                    ['success' => true, 'message' => "Xóa vĩnh viễn dữ liệu thành công"],
                    200

                );
            }

        } else {
            return response()->json(

                ['success' => false, 'message' => "Xóa dữ liệu không thành công, không tồn tại sản phẩm này trong cửa hàng"],
                200

            );
        }


    }
    public function getProductAndStoreProduct()
    {

        $productcategory = DB::table("product")->where([["product.status", 1], ["category.status", '=', 1]])->join("category", "product.category_id", '=', 'category.id')->select("product.id as id","product.image as product_image", "product.name as product_name", 'category.name as category', 'brand_id', 'product.price as price', 'product.short_description as short_description', 'product.detail as detail')->orderByDesc('product.created_at');

        $products = DB::table('brand')
            ->JoinSub($productcategory, 'productcategory', function (JoinClause $join) {
                $join->on('productcategory.brand_id', '=', 'brand.id')
                    ->where('brand.status', 1);
            })
            ->select("productcategory.*", 'brand.name as brand');
            
        $store_products_all= DB::table('store_products')
        ->JoinSub($products, 'products', function (JoinClause $join) {
            $join->on('products.id', '=', 'store_products.product_id')
                ->where('store_products.status', 1);
        })
        ->select("products.*",'store_products.price as price_in_store', 'store_products.qty as quantity','store_products.qty_sold as quantity_sold')
        ->get();


        $store_products = DB::table("store_products")->join("product", 'store_products.product_id', '=', 'product.id')->where('store_products.status', 1)->select('product.id as id', 'product.name as product_name', 'store_products.price as price_in_store', 'store_products.qty as quantity', 'store_products.qty_sold as quantity_sold')->orderByDesc('store_products.created_at')->get();
        $store_products_trash = DB::table("store_products")->join("product", 'store_products.product_id', '=', 'product.id')->where('store_products.status', 0)->select('product.id as id', 'product.name as product_name', 'store_products.price as price_in_store', 'store_products.qty as quantity', 'store_products.qty_sold as quantity_sold')->orderByDesc('store_products.created_at')->get();

        return response()->json(

            ['success' => true, 'message' => "Thêm dữ lieu thanh cong", "products" => $products->get(), "store_products" => $store_products,'store_products_trash'=>$store_products_trash,'store_products_all'=>$store_products_all],
            200

        );
    }

}


