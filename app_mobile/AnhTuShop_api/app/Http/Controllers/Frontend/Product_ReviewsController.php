<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class Product_ReviewsController extends Controller
{
    public function add_Rating(Request $request)
    {
        $rating = DB::table("product_reviews")->insertGetId(
            [
                "product_id" => $request->product_id,
                "customer_id" => $request->customer_id,
                "rating_score" => $request->rating_score,
                "content" => $request->content,
                "orderdetail_id" => $request->orderdetail_id
            ]
        );
        return response()->json(

            ['success' => true, 'message' => 'Thêm đánh giá thành công',],

            200

        );
    }

}
