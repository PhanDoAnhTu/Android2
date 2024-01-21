<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;


use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class BrandController_Backend extends Controller
{
    public function getAllBrand()
    {
        $AllBrand = DB::table('brand')->whereNot('status',0)->orderBy('created_at', 'desc');

        if ($AllBrand->count() > 0) {

            return response()->json(

                ['success' => true, 'message' => "Tải dữ liệu thành công.", 'brands_data' => $AllBrand->get()],
                200

            );
        } else {

            return response()->json(

                ['success' => false, 'message' => "Tải dữ liệu không thành công.", 'brands_data' => null],
                200

            );
        }
    }
    public function getAllBrand_InTrash()
    {
        $AllBrandInTrash = DB::table('brand')->where('status',0)->orderBy('created_at', 'desc');

        if ($AllBrandInTrash->count() > 0) {

            return response()->json(

                ['success' => true, 'message' => "Tải dữ liệu thành công.", 'brands_data' => $AllBrandInTrash->get()],
                200

            );
        } else {

            return response()->json(

                ['success' => false, 'message' => "Tải dữ liệu không thành công.", 'brands_data' => null],
                200

            );
        }
    }
    public function getBrandById($id)
    {
        $Brand = DB::table('brand')->where('id', $id);

        if ($Brand->count() > 0) {

            return response()->json(

                ['success' => true, 'message' => "Tải dữ liệu thành công.", 'brand_data' => $Brand->first()],
                200

            );
        } else {

            return response()->json(

                ['success' => false, 'message' => "Tải dữ liệu không thành công.", 'brand_data' => null],
                200

            );
        }
    }
    public function getBrandBySlug($slug)
    {
        $Brand = DB::table('brand')->where('slug', $slug);

        if ($Brand->count() > 0) {

            return response()->json(

                ['success' => true, 'message' => "Tải dữ liệu thành công.", 'brand_data' => $Brand->first()],
                200

            );
        } else {

            return response()->json(

                ['success' => false, 'message' => "Tải dữ liệu không thành công.", 'brand_data' => null],
                200

            );
        }
    }
    public function add_brand(Request $request)
    {

        $brand = new Brand();
        $brand->name = $request->name; //form
        $brand->slug = Str::of($request->name)->slug('-');
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $brand->slug . '.' . $extension;
                $brand->image = $filename;
                $files->move(public_path('images/brand'), $filename);
            }
        }
        $brand->sort_order = 0; //form
        $brand->description = $request->description; //form
        $brand->metakey = $request->metakey; //form
        $brand->metadesc = $request->metadesc; //form
        $brand->created_at = date('Y-m-d H:i:s');
        $brand->created_by = 1;
        $brand->status = $request->status; //form
        $brand->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'brand_data' => $brand],
            201
        );
    }
    public function update_brand($id, Request $request)
    {
        $brand = Brand::find($id);

        $brand->name = $request->name; //form

        $brand->slug = Str::of($request->name)->slug('-');

        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $brand->slug . '.' . $extension;
                $brand->image = $filename;
                $files->move(public_path('images/brand'), $filename);
            }
        }

        $brand->sort_order = 0; //form
        $brand->description = $request->description; //form
        $brand->metakey = $request->metakey; //form

        $brand->metadesc = $request->metadesc; //form

        $brand->updated_at = date('Y-m-d H:i:s');

        $brand->updated_by = 1; //takm cho =1

        $brand->status = $request->status; //form

        $brand->save(); //Luuu vao CSDL

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'brand_data' => $brand],

            200

        );


    }

    public function destroy_brand($id)
    {
        $brand = DB::table('brand')->where('id', $id);
        if ($brand->count() > 0) {
            if($brand->where('status',1)->count() > 0) {
                $check_brand = DB::table('product')->where('brand_id', $id);
                if ($check_brand->count() > 0) {
                    return response()->json(
    
                        ['success' => false, 'message' => "Xóa dữ liệu không thành công, còn sản phẩm có thuộc tính của thương hiệu này. ", 'brand_data' => $id],
                        200
    
                    );
                } else {
                    $deleted_brand = DB::table('brand')->where('id',"=", $id)->update([
                        'status' => 0
                    ]);
                    return response()->json(
    
                        ['success' => true, 'message' => "Chuyển dữ liệu vào thùng rác thành công", 'brand_data' => $deleted_brand],
                        200
    
                    );
                }
            }else if(DB::table('brand')->where([['id',"=", $id],['status',"=",0]])->count() > 0) {
                $deleted_brand = DB::table('brand')->where([['id',"=", $id],['status',"=",0]])->delete();
                return response()->json(

                    ['success' => true, 'message' => "Xóa dữ liệu trong thùng rác thành công.", 'brand_data' => $deleted_brand],
                    200

                ); 
            }else{
                return response()->json(

                    ['success' => false, 'message' => "Xóa dữ liệu không thành công, mã thương hiệu này không tồn tại.", 'brand_data' => null],
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


}