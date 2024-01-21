<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController_Backend extends Controller
{
    public function index()
    {

        $products = Product::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'products_data' => $products],

            200

        );
    }

    public function show($id)
    {

        $Product = Product::find($id);

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'product_data' => $Product],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $Product = new Product();
        $Product->brand_id = $request->brand_id;
        $Product->category_id = $request->category_id;
        $Product->name = $request->name;
        $Product->slug = Str::of($request->name)->slug('-');
        $Product->price = $request->price;

        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $Product->slug . '.' . $extension;
                $Product->image = $filename;
                $files->move(public_path('images/product'), $filename);
            }
        }

        $Product->detail = $request->detail; 
        $Product->metakey = $request->metakey; 
        $Product->metadesc = $request->metadesc; 
        $Product->short_description = $request->short_description;

        $Product->created_at = date('Y-m-d H:i:s');
        $Product->created_by = 1;
        $Product->status = $request->status; //form
        $Product->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'product_data' => $Product],
            201
        );
    }
    //Product-update
    public function update(Request $request, $id)
    {

        $Product = Product::find($id);
        $Product->brand_id = $request->brand_id;
        $Product->name = $request->name; //form
        $Product->slug = Str::of($request->name)->slug('-');
        $Product->price = $request->price;
        $Product->short_description = $request->short_description;
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $Product->slug . '.' . $extension;
                $Product->image = $filename;
                $files->move(public_path('images/product'), $filename);
            }
        }
      
        $Product->detail = $request->detail; //form
        $Product->metakey = $request->metakey; //form
        $Product->metadesc = $request->metadesc; //form
        $Product->created_at = date('Y-m-d H:i:s');
        $Product->created_by = 1;
        $Product->status = $request->status; //form
        $Product->save(); //lưu vào Csdl

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'product_data' => $Product],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $Product = Product::find($id);
        if ($Product == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'product_data' => null],
                404
            );
        }
        $Product->delete();
        return response()->json(['message' => 'Thanh cong', 'success' => true, 'product_data' => $Product], 200);

    }
    public function product_list($limit, $category_id = 0)
    {
        $listid = array();
        array_push($listid, $category_id + 0);
        $args_cat1 = [
            ['parent_id', '=', $category_id + 0],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $data = Product::where('status', '=', 1)
            ->whereIn('category_id', $listid)
            ->orderBy('created_at', 'DESC')->limit($limit)->get();
        return response()->json([
            'success' => true,
            'message' => 'Tải dữ liệu thành công',
            'products_data' => $data
        ], 200);
    }

    public function product_all($limit, $page = 1)
    {
        $offset = ($page - 1) * $limit;
        $products = Product::where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->offset($offset)
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products_data' => $products
            ],
            200
        );
    }
    public function product_home($limit, $category_id = 0)
    {
        $listid = array();
        array_push($listid, $category_id + 0);
        $args_cat1 = [
            ['parent_id', '=', $category_id + 0],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $products = Product::where('status', '=', 1)
            ->whereIn('category_id', $listid)
            ->orderBy('created_at', 'DESC')->limit($limit)->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products_data' => $products
            ],
            200
        );
    }

    public function product_detail($slug)
    {
        $product = Product::where([['status', '=', 1], ['slug', '=', $slug]])->first();
        if ($product == null) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'khong tim thay du lieu',
                    'product' => null
                ],
                404
            );
        }
        $listId = array();
        array_push($listId, $product->category_id);
        $args_cat1 = [
            ['parent_id', '=', $product->category_id],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }

        $product_other = Product::where([['status', '=', 1], ['id', '!=', $product->id]])
            ->whereIn('category_id', $listId)
            ->orderBy('created_at', 'DESC')
            ->limit(8)
            ->get();

        return response()->json(
            [
                'success' => true,
                'message' => "tai du lieu thanh cong",
                'product_data' => $product,
                'product_other_data' => $product_other
            ],
            200


        );

    }
    public function product_category($limit, $category_id, $page = 1)
    {
        $listid = array();
        array_push($listid, $category_id + 0);
        $args_cat1 = [
            ['parent_id', '=', $category_id + 0],
            ['status', '=', 1]
        ];
        $list_category1 = Category::where($args_cat1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $row1) {
                array_push($listid, $row1->id);
                $args_cat2 = [
                    ['parent_id', '=', $row1->id],
                    ['status', '=', 1]
                ];
                $list_category2 = Category::where($args_cat2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $row2) {
                        array_push($listid, $row2->id);
                    }
                }
            }
        }
        $offset = ($page - 1) * $limit;
        $products = Product::where('status', 1)
            ->whereIn('category_id', $listid)
            ->orderBy('created_at', 'DESC')
            ->offset($offset)
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products_category' => $products
            ],
            200
        );
    }

    public function product_brand($limit, $brand_id, $page = 1)
    {
        $offset = ($page - 1) * $limit;
        $products = Product::where([['brand_id', '=', $brand_id], ['status', '=', 1]])
            ->orderBy('created_at', 'DESC')
            ->offset($offset)
            ->limit($limit)
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'products_brand' => $products
            ],
            200
        );
    }

}