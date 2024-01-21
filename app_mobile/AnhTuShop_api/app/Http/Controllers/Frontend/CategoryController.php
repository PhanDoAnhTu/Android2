<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class CategoryController extends Controller
{

    public function getAllCategory()
    {

        $categories = Category::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'AllCategory' => $categories],

            200

        );
    }

    public function category_list($parent_id = 0)
    {
        $args = [
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $categories = DB::table('category')->where($args)
            ->orderBy('sort_order', 'DESC')
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
        $category->name = $request->name; //form
        $category->slug = Str::of($request->name)->slug("-");
        $category->sort_order = $request->sort_order; //form

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
            ['success' => true, 'message' => 'Thêm thành công', 'category_data' => $category],
            201
        );
    }
    //category-update
    public function update(Request $request, $id)
    {

        $category = Category::find($id);

        $category->name = $request->name; //form

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

        $category->sort_order = $request->sort_order; //form

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
        $category = Category::find($id);
        if ($category == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'category_data' => null],
                404
            );
        }
        $category->delete();
        return response()->json(['message' => 'Xóa thành công', 'success' => true, 'category_data' => $category], 200);

    }


    public function getBySlug($slug)
    {
        $category = Category::where([['status', '=', 1], ['slug', '=', $slug]])->first();
        if ($category == null) {
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
                'category_data' => $category

            ],
            200


        );

    }


    public function GetCategorieByParent()
    {
        $listId = array();
        $category = DB::table('category')->where([['status', '=', 1], ['parent_id', '=', 0]])->get();
        if (count($category) > 0) {
            foreach ($category as $row) {
                $args_cat1 = [
                    ['parent_id', '=', $row->id],
                    ['status', '=', 1]
                ];
                $list_category1 = DB::table('category')->where($args_cat1)->get();
                if (count($list_category1) > 0) {
                    foreach ($list_category1 as $row1) {
                        array_push($listId, $row1->id);
                        $args_cat2 = [
                            ['parent_id', '=', $row1->id],
                            ['status', '=', 1]
                        ];
                        $list_category2 = Category::where($args_cat2)->get();
                        if (count($list_category2) > 0) {
                            foreach ($list_category2 as $row2) {
                                array_push($listId, $row2->id);
                            }
                        }
                    }
                }
            }
        }
        $childrent_cat = DB::table('category')->where('status', 1)->whereIn('id',$listId)->get();

        return response()->json(
            [
                'success' => true,
                'message' => "tai du lieu thanh cong",
                'parent_category' => $category,
                "children_category" => $childrent_cat
            ],
            200


        );

    }




}