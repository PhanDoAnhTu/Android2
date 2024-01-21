<?php

namespace App\Http\Controllers\Frontend;


use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Str;


class BrandController extends Controller
{

    public function brand_all()
    {
        $brands = Brand::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'brands_data' => $brands],

            200

        );
    }
    // Get -brand/show
    public function showById($id)
    {

        $brand = Brand::find($id);

        return response()->json(

            ['success' => true, 'message' => 'Tai du lieu thanh cong', 'brand_data' => $brand],

            200

        );
    }
    //Post- them store
    

    public function getBySlug($slug)
    {
        $brands = Brand::where([['status', '=', 1], ['slug', '=', $slug]])->first();
        if ($brands == null) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'khong tim thay du lieu',
                    'product' => null
                ],
                404
            );
        }

        return response()->json(
            [
                'success' => true,
                'message' => "tai du lieu thanh cong",
                'brands_data' => $brands
               
            ],
            200


        );

    }


}