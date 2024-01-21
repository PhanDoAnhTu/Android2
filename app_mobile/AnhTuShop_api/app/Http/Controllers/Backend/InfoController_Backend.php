<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Info;
use Illuminate\Http\Request;
use Illuminate\Support\Str;



class InfoController_Backend extends Controller
{

    public function company_info($id)
    {

        $info = Info::find($id);

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'info_data' => $info],

            200

        );
    }

    public function update(Request $request, $id)
    {

        $info = Info::find($id);
        $info->company_name = $request->company_name;
        $info->email = $request->email;
        $info->phone = $request->phone;
        $info->hotline = $request->hotline;
        $info->address = $request->address;
        $info->website = $request->website;
        $info->other_info = $request->other_info;
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $info->company_name . '.' . $extension;
                $info->logo = $filename;
                $files->move(public_path('images/info'), $filename);
            }
        }
        $info->updated_at= date('Y-m-d H:i:s');
        $info->status = $request->status; //form
        $info->save(); //lưu vào Csdl

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'info_data' => $info],

            200

        );
    }




}