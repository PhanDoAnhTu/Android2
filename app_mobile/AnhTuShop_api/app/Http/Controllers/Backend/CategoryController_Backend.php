<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
class CategoryController_Backend extends Controller
{

    public function index()
    {

        $categories = Category::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'categories_data' => $categories],

            200

        );
    }
    // Get -brand/show
    public function show($id)
    {

        $category = Category::find($id);

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'category_data' => $category],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name; 
        $category->slug = Str::of($request->name)->slug("-");
         $category->sort_order = 0; 
        $category->description = $request->description; 
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $category->slug . '.' . $extension;
                $category->image = $filename;
                $files->move(public_path('images/category'), $filename);
            }
        }
        $category->metakey = $request->metakey; //form
        $category->metadesc = $request->metadesc; //form
        $category->parent_id = $request->parent_id;
        $category->created_at = date('Y-m-d H:i:s');
        $category->created_by = 1;
        $category->status = $request->status; //form
        $category->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thêm thành công ', 'category_data' => $category],
            201
        );
    }
    //category-update
    public function update(Request $request, $id)
    {

        $category = Category::find($id);

        $category->name = $request->name; //form
        $category->description = $request->description; 
        $category->slug = Str::of($request->name)->slug('-');

        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $category->slug . '.' . $extension;
                $category->image = $filename;
                $files->move(public_path('images/category'), $filename);
            }
        }



        $category->metakey = $request->metakey; //form

        $category->metadesc = $request->metadesc; //form
        $category->parent_id = $request->parent_id;


        $category->updated_at = date('Y-m-d H:i:s');

        $category->updated_by = 1; //takm cho =1

        $category->status = $request->status; //form

        $category->save(); //Luuu vao CSDL

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'category_data' => $category],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $brand = DB::table('category')->where('id', $id);
        if ($brand->count() > 0) {
            if($brand->where('status',1)->count() > 0) {
                $check_brand = DB::table('product')->where('category_id', $id);
                if ($check_brand->count() > 0) {
                    return response()->json(
    
                        ['success' => false, 'message' => "Xóa dữ liệu không thành công, còn sản phẩm có thuộc tính của category này. ", 'brand_data' => $id],
                        200
    
                    );
                } else {
                    $deleted_brand = DB::table('category')->where('id',"=", $id)->update([
                        'status' => 0
                    ]);
                    return response()->json(
    
                        ['success' => true, 'message' => "Chuyển dữ liệu vào thùng rác thành công", 'brand_data' => $deleted_brand],
                        200
    
                    );
                }
            }else if(DB::table('category')->where([['id',"=", $id],['status',"=",0]])->count() > 0) {
                $deleted_brand = DB::table('brand')->where([['id',"=", $id],['status',"=",0]])->delete();
                return response()->json(

                    ['success' => true, 'message' => "Xóa dữ liệu trong thùng rác thành công.", 'brand_data' => $deleted_brand],
                    200

                ); 
            }else{
                return response()->json(

                    ['success' => false, 'message' => "Xóa dữ liệu không thành công, mã category này không tồn tại.", 'brand_data' => null],
                    200
    
                );
            }
           
        } else {
            return response()->json(

                ['success' => false, 'message' => "Xóa dữ liệu không thành công, mã thương hiệu này không tồn tại.", 'brand_data' => null],
                200

            );
        }
    }


    public function category_list($parent_id = 0)
    {
        $args = [
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $categories = Category::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'categories_data' => $categories
            ],
            200
        );
    }

    public function getBySlug($slug)
    {
        $categories = Category::where([['status', '=', 1], ['slug', '=', $slug]])->first();
        if ($categories == null) {
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
                'categories_data' => $categories
               
            ],
            200


        );

    }


    
}