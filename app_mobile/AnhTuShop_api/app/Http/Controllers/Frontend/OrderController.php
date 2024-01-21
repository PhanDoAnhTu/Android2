<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Mail\MailAlertRegister;
use App\Models\Order;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Mail;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $order = DB::table('order')->insertGetId([
            "user_id" => $request->user_id,
            "name" => $request->name,
            "phone" => $request->phone,
            "email" => $request->email,
            "address" => $request->address,
            "note" => $request->note,
        ]);
        foreach ($request->order_detail as $_detail) {

            $order_detail = DB::table('orderdetail')->insert([
                "order_id" => $order,
                "product_id" => $_detail["_product_id"],
                "price" => $_detail["_price"],
                "qty" => $_detail["_quantity"],
                "amount" => $_detail["_price"] * $_detail["_quantity"]
            ]);

        }
        return response()->json(

            ['success' => true, 'message' => 'Thêm thành công',],

            200

        );
    }

    public function getOrder_ByCustomer($user_id)
    {

        $Order = DB::table('order')->where([['user_id', '=', $user_id]])->orderBy('created_at', 'DESC')->get();
        $productcategory = DB::table("product")->where([["product.status", 1], ["category.status", '=', 1]])->join("category", "product.category_id", '=', 'category.id')
            ->select("product.id as product_id", "product.name as product_name", 'category.name as category_name', 'brand_id', 'product.short_description as short_description', 'product.detail as detail', "product.image as product_image")->orderByDesc('product.created_at');

        $products = DB::table('brand')
            ->JoinSub($productcategory, 'productcategory', function (JoinClause $join) {
                $join->on('productcategory.brand_id', '=', 'brand.id')
                    ->where('brand.status', 1);
            })
            ->select("productcategory.*", 'brand.name as brand_name');

        $order_detail = DB::table('orderdetail')
            ->JoinSub($products, 'products', function (JoinClause $join) {
                $join->on('products.product_id', '=', 'orderdetail.product_id');
            })
            ->get();
        $Rating = DB::table('product_reviews')->where([['customer_id', '=', $user_id]])->get();
        $listRating = array();
        $listOrderTotal = array();
        $listOrder = array();
        if (count($Order) > 0) {
            foreach ($Order as $o) {
                $Total = 0;
                foreach ($order_detail as $od) {
                    if ($od->order_id == $o->id) {
                        $Total += $od->price * $od->qty;
                        array_push($listOrder, $od);
                    }
                }
                $object = (object) [
                    'order_id' => $o->id,
                    'total' => $Total,
                ];

                array_push($listOrderTotal, $object);
            }
        }

        return response()->json(

            ['success' => true, 'message' => 'Tai du lieu thanh cong', 'order_data' => $Order, "order_detail" => $listOrder, "total_ByOrder" => $listOrderTotal, "Rating" => $Rating],
            200

        );
    }


    public function updateStatusOrder($order_id)
    {

        $Order = DB::table('order')->where([['id', '=', $order_id]]);

        if ($Order->count() > 0) {
            $Order->update([
                'status' => 3,
            ]);
        }
        return response()->json(

            ['success' => true, 'message' => 'Tai du lieu thanh cong', 'order_data' => $Order->get()],
            200

        );
    }
}