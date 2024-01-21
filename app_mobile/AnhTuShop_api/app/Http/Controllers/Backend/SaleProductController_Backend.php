<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Faker\Core\DateTime;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class SaleProductController_Backend extends Controller
{
    public function getAllSaleProduct()
    {

        $store_products = DB::table('store_products')
            ->join("product", 'store_products.product_id', '=', 'product.id')
            ->where('store_products.status', 1)
            ->select('product_id', 'product.name as product_name', 'product.slug as product_slug', 'product.image as product_image', 'product.price as listed_price',"store_products.price as price_in_store", 'product.category_id', 'product.brand_id', 'product.short_description as product_short_description', 'product.detail as product_detail', 'store_products.qty as store_qty', 'store_products.qty_sold as qty_sold_store_products', 'store_products.status as store_status', 'store_products.created_at as store_created_date');

        $store_sale_products = DB::table('sale_products')
            ->rightJoinSub($store_products, 'products', function (JoinClause $join) {
                $join->on('products.product_id', '=', 'sale_products.product_id');
            })
            ->select('products.*',"sale_products.id as id", 'sale_products.sale_id', 'sale_products.start_time', 'sale_products.end_time', 'sale_products.qty as sale_qty', 'sale_products.qty_sold as qty_sold_sale_products', 'sale_products.status as sale_status', 'sale_products.created_at as sale_created_date');

        $store_saleid_products = DB::table('sale_id')
            ->rightJoinSub($store_sale_products, 'store_sale_products', function (JoinClause $join) {
                $join->on('store_sale_products.sale_id', '=', 'sale_id.id')
                    ->where('sale_id.status', 1);
            })
            ->select('store_sale_products.*', 'sale_id.name as sale_name', 'sale_id.short_description as sale_id_short_description', 'sale_id.image as sale_id_image', 'sale_id.percent_sale', 'sale_id.price_sale');

        $store_saleid_category_products = DB::table('category')
            ->rightJoinSub($store_saleid_products, 'store_saleid_products', function (JoinClause $join) {
                $join->on('store_saleid_products.category_id', '=', 'category.id')
                    ->where('category.status', 1);
            })
            ->select('store_saleid_products.*', 'category.name as category_name', 'category.slug as category_slug', 'category.image as category_image', 'category.description as category_description');

        $store_saleid_category_brand_products = DB::table('brand')
            ->rightJoinSub($store_saleid_category_products, 'store_saleid_category_products', function (JoinClause $join) {
                $join->on('store_saleid_category_products.brand_id', '=', 'brand.id')
                    ->where('brand.status', 1);
            })
            ->select('store_saleid_category_products.*', 'brand.name as brand_name', 'brand.slug as brand_slug', 'brand.image as brand_image', 'brand.description as brand_description')
            ->where([['sale_id', '!=', null],["sale_status",1]])
            ->orderBy('store_created_date', 'DESC')
            ->get();

            
        $sale_products_trash = DB::table('brand')
        ->rightJoinSub($store_saleid_category_products, 'store_saleid_category_products', function (JoinClause $join) {
            $join->on('store_saleid_category_products.brand_id', '=', 'brand.id')
                ->where('brand.status', 1);
        })
        ->select('store_saleid_category_products.*', 'brand.name as brand_name', 'brand.slug as brand_slug', 'brand.image as brand_image', 'brand.description as brand_description')
        ->where([['sale_id', '!=', null],["sale_status",0]])
        ->orderBy('store_created_date', 'DESC')
        ->get();



        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'sale_products_all' => $store_saleid_category_brand_products,"sale_products_trash"=>$sale_products_trash],
            200

        );

    }
    public function add_SaleProduct(Request $request)
    {

        $date_start = date_create($request->date_start);
        $date_end = date_create($request->date_end);
        if (date_format($date_start, "Y/m/d H:i:s") < date('Y-m-d H:i:s') || date_format($date_start, "Y/m/d H:i:s") >= date_format($date_end, "Y/m/d H:i:s")) {
            return response()->json(

                ['success' => false, 'message' => "Ngày bắt đầu hoặc ngày kết thúc giảm giá không hợp lệ", 'add_sale_product' => null],
                200

            );
        }
        $store_product = DB::table("store_products")->where([['product_id', "=", $request->product_id], ["status", '=', 1]]);
        if ($request->product_qty==0||$store_product->first()->qty <= $request->product_qty) {

            return response()->json(

                ['success' => false, 'message' => "Nhập số lượng sản phẩm giảm giá không hợp lệ", 'add_sale_product' => null],
                200

            );
        }
        $sale_product = DB::table("sale_products")->where([['product_id', "=", $request->product_id], ["status", '=', 1], ['start_time', '<=', date_format($date_end, "Y/m/d H:i:s")], ['end_time', '>=', date_format($date_end, "Y/m/d H:i:s")]])->orWhere([['product_id', "=", $request->product_id], ["status", '=', 1], ['start_time', '<=', date_format($date_start, "Y/m/d H:i:s")], ['end_time', '>=', date_format($date_start, "Y/m/d H:i:s")]]);
        if ($sale_product->count() > 0) {
            return response()->json(

                ['success' => false, 'message' => "Trong mốc thời gian này sản phẩm đã có mã giảm giá, vui lòng chọn mốc thời gian khác.", 'add_sale_product' => null],
                200

            );
        }
        $addPro = DB::table('sale_products')->insertGetId([
            'product_id' => $request->product_id,
            'qty' => $request->product_qty,
            'sale_id' => $request->sale_id,
            "start_time" => date_format($date_start, "Y/m/d H:i:s"),
            'end_time' => date_format($date_end, "Y/m/d H:i:s"),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        $update_qty = $store_product->update([
            "qty" => $store_product->first()->qty - $request->product_qty
        ]);

        return response()->json(

            ['success' => true, 'message' => "Thêm sản phẩm giảm giá thành công", 'add_sale_product' => $addPro],
            200

        );

    }
    public function remove_sale_product($id)
    {
        $sale_product = DB::table("sale_products")->where('id', "=", $id);
        if ($sale_product->count() == 0) {
            return response()->json(

                ['success' => false, 'message' => "id này không tồn tại", 'sale_product' => null],
                200

            );
        }
        if ($sale_product->first()->status == 1) {
            $sale_product->update([
                "status" => 0

            ]);
            return response()->json(

                ['success' => true, 'message' => "Đưa dữ liệu này vào thùng rác thành công", 'sale_product' => null],
                200

            );
        }
        if ($sale_product->first()->status == 0) {
            $sale_product->delete();
            return response()->json(

                ['success' => true, 'message' => "Xóa vĩnh viễn dữ liệu này thành công", 'sale_product' => null],
                200

            );
        }

    }
    public function restore_sale_product($id)
    {
        $sale_product = DB::table("sale_products")->where('id', "=", $id);
        if ($sale_product->count() == 0) {
            return response()->json(

                ['success' => false, 'message' => "id này không tồn tại", 'sale_product' => null],
                200

            );
        }
        if ($sale_product->first()->status == 0) {
            $sale_product->update([
                "status" => 1

            ]);
            return response()->json(

                ['success' => true, 'message' => "Khôi phục dữ liệu này thành công", 'sale_product' => null],
                200

            );
        }

    }
    public function getAll_SaleId()
    {

        $saleId = DB::table('sale_id')->where('status', 1);
        if ($saleId->count() > 0) {
            return response()->json(

                ['success' => true, 'message' => "tai du lieu thanh cong", "sale_id_data" => $saleId->get()],
                200

            );
        }
        return response()->json(

            ['success' => false, 'message' => "tai du lieu khong thanh cong", "sale_id_data" => null],
            200

        );
    }

}