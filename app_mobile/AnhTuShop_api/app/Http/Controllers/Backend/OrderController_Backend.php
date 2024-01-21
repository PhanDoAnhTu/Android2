<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
class OrderController_Backend extends Controller
{
    public function index()
    {

        $orders = Order::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'orders_data' => $orders],

            200

        );
    }

    public function show($id)
    {

        $Order = Order::find($id);

        return response()->json(

            ['success' => true, 'message' => 'Tai du lieu thanh cong', 'order_data' => $Order],

            200

        );
    }
    public function getOrderId_New($user_id)
    {

        $Order = Order::where([ ['user_id', '=', $user_id]])->orderBy('created_at', 'DESC')->first();

        return response()->json(

            ['success' => true, 'message' => 'Tai du lieu thanh cong', 'order_data' => $Order],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $Order = new Order();
        $Order->user_id = $request->user_id;
        $Order->name = $request->name;
        $Order->email = $request->email;
        $Order->phone = $request->phone;
        $Order->address = $request->address;
        $Order->note = $request->note;
        $Order->created_at = date('Y-m-d H:i:s');

        $Order->status = $request->status; //form
        $Order->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'order_data' => $Order],
            201
        );
    }
    //cap nhạt
    public function update(Request $request, $id)
    {

        $Order = Order::find($id);

        $Order->user_id = $request->user_id;
        $Order->name = $request->name;
        $Order->email = $request->email;
        $Order->phone = $request->phone;
        $Order->address = $request->address;
        $Order->note = $request->note;
        $Order->created_at = date('Y-m-d H:i:s');
        $Order->created_by = 1;
        $Order->status = $request->status; //form
        $Order->save(); //lưu vào Csdl

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'order_data' => $Order],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $Order = Order::find($id);
        if ($Order == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'order_data' => null],
                404
            );
        }
        $Order->delete();
        return response()->json(['message' => 'thanh cong', 'success' => true, 'order_data' => $Order], 200);

    }

}