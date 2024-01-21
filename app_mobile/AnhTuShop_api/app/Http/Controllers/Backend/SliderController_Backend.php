<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SliderController_Backend extends Controller
{
    public function index()
    {

        $sliders = Slider::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'sliders_data' => $sliders],

            200

        );
    }
    public function show($id)
    {

        $Slider = Slider::find($id);

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'slider_data' => $Slider],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $Slider = new Slider();
        $Slider->name = $request->name;
        $Slider->link = $request->link;
        $Slider->sort_order = $request->sort_order;
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $Slider->name . '.' . $extension;
                $Slider->image = $filename;
                $files->move(public_path('images/slider'), $filename);
            }
        }
        $Slider->description = $request->description; //form
        $Slider->position = $request->position;
        $Slider->created_at = date('Y-m-d H:i:s');
        $Slider->created_by = 1;
        $Slider->status = $request->status; //form
        $Slider->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'slider_data' => $Slider],
            201
        );
    }
    //Slider-update
    public function update(Request $request, $id)
    {

        $Slider = Slider::find($id);
        $Slider->description = $request->description; //form
        $Slider->name = $request->name;
        $Slider->link = $request->link;
        $Slider->sort_order = $request->sort_order;
        $Slider->position = $request->position;
        $Slider->created_at = date('Y-m-d H:i:s');
        $Slider->created_by = 1;
        $Slider->status = $request->status; //form
        $Slider->save(); //lưu vào Csdl

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'slider_data' => $Slider],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $Slider = Slider::find($id);
        if ($Slider == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'slider_data' => null],
                404
            );
        }
        $Slider->delete();
        return response()->json(['message' => 'Thanh cong', 'success' => true, 'slider_data' => $Slider], 200);

    }


    public function slider_list($position)
    {
        $args = [
            ['position', '=', $position],
            ['status', '=', 1]
        ];
        $sliders = Slider::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'sliders_data' => $sliders
            ],
            200
        );
    }
}