<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ExportProductController_Backend extends Controller
{
    public function add_order_export(Request $request)
    {
        $order_export = DB::table("export")->insertGetId([
            "user_id" => $request->user_id,
            "content_export" => $request->content_export
        ]);

        if ($order_export !== null) {

            foreach ($request->export_data as $ex_data) {
                $export_details = DB::table("export_detail")->insertGetId([
                    "export_id" => $order_export,
                    "product_id" => $ex_data["id"],
                    "qty_export" => (int) $ex_data["qty"],
                    "price_export" => (int) $ex_data["price"]
                ]);

            }

        }
        return response()->json(

            ['success' => true, 'message' => "Lưu phiếu xuất hàng thành công.",],

            200

        );
    }


}