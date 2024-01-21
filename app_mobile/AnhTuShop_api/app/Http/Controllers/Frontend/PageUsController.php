<?php

namespace App\Http\Controllers\Frontend;


use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\PageUs;
use Illuminate\Support\Str;


class PageUsController extends Controller
{

    public function index()
    {
        $PageUs = PageUs::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'PageUs_data' => $PageUs],

            200

        );
    }
    // Get -PageUs/show
    public function show($id)
    {

        $PageUs = PageUs::find($id);

        return response()->json(

            ['success' => true, 'message' => 'Tai du lieu thanh cong', 'PageUs_data' => $PageUs],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $PageUs = new PageUs();
        $PageUs->name = $request->name; 
        $PageUs->title = $request->title; 
        $PageUs->detail = $request->detail;
        $PageUs->slug = Str::of($request->name)->slug('-');
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $PageUs->slug . '.' . $extension;
                $PageUs->image = $filename;
                $files->move(public_path('images/pageus'), $filename);
            }
        }

        $PageUs->created_at = date('Y-m-d H:i:s');
        $PageUs->created_by = 1;
        $PageUs->status = $request->status; //form
        $PageUs->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'PageUs_data' => $PageUs],
            201
        );
    }
    //cap nhạt
    public function update(Request $request, $id)
    {

        $PageUs = PageUs::find($id);
        $PageUs->name = $request->name; 
        $PageUs->title = $request->title; 
        $PageUs->detail = $request->detail;
        $PageUs->slug = Str::of($request->name)->slug('-');
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $PageUs->slug . '.' . $extension;
                $PageUs->image = $filename;
                $files->move(public_path('images/pageus'), $filename);
            }
        }

        $PageUs->created_at = date('Y-m-d H:i:s');
        $PageUs->created_by = 1;
        $PageUs->status = $request->status; //form
        $PageUs->save(); //lưu vào Csdl

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'PageUs_data' => $PageUs],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $PageUs = PageUs::find($id);
        if ($PageUs == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'PageUs_data' => null],
                404
            );
        }
        $PageUs->delete();
        return response()->json(['message' => 'Thanh cong', 'success' => true, 'PageUs_data' => $PageUs], 200);

    }

    public function get_BySlug($slug)
    {
        $PageUs = PageUs::where([['status', '=', 1], ['slug', '=', $slug]])->first();
        if ($PageUs == null) {
            return response()->json(
                [
                    'success' => false,
                    'message' => 'khong tim thay du lieu',
                    'PageUs' => null
                ],
                404
            );
        }

        return response()->json(
            [
                'success' => true,
                'message' => "tai du lieu thanh cong",
                'PageUs_data' => $PageUs
               
            ],
            200


        );

    }


}