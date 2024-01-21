<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MenuController_Backend extends Controller
{

    public function index()
    {
        $menus = Menu::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'menus_data' => $menus],

            200

        );
    }
    public function show($id)
    {

        $menu = menu::find($id);

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'menu_data' => $menu],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $menu = new menu();
        $menu->name = $request->name;
        $menu->position = $request->position;
        $menu->link = $request->link;
        $menu->type = $request->type;
        $menu->parent_id = $request->parent_id;
        $menu->sort_order = $request->sort_order;
        $menu->created_at = date('Y-m-d H:i:s');
        $menu->created_by = 1;
        $menu->status = $request->status; //form
        $menu->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'menu_data' => $menu],
            201
        );
    }
    //cap nhạt
    public function update(Request $request, $id)
    {

        $menu = menu::find($id);
        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->position = $request->position;
      
        $menu->type = $request->type;
        $menu->parent_id = $request->parent_id;
        $menu->sort_order = $request->sort_order;
        $menu->created_at = date('Y-m-d H:i:s');
        $menu->created_by = 1;
        $menu->status = $request->status; //form
        $menu->save(); //lưu vào Csdl
        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'menu_data' => $menu],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $menu = menu::findOrFail($id);
        if ($menu == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'menu_data' => null],
                404
            );
        }
        $menu->delete();
        return response()->json(['message' => 'thành công', 'success' => true, 'menu_data' => $menu], 200);

    }

    public function menu_list($position, $parent_id = 0)
    {
        $args = [
            ['position', '=', $position],
            ['parent_id', '=', $parent_id],
            ['status', '=', 1]
        ];
        $menus = Menu::where($args)
            ->orderBy('sort_order', 'ASC')
            ->get();
        return response()->json(
            [
                'success' => true,
                'message' => 'Tải dữ liệu thành công',
                'menus_data' => $menus
            ],
            200
        );
    }
}