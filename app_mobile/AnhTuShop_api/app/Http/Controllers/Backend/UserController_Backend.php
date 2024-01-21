<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UserController_Backend extends Controller
{

    public function login_admin(Request $request)
    {
        if ($request->email_login) {
            $check_email = User::where([['email', '=', $request->email_login], ['roles', '=', 'admin'], ['password', '=', $request->password_login]])->get();

            if (count($check_email) === 0) {
                return response()->json(
                    ['kiemtra' => false, 'message' => 'Email này chưa từng được đăng ký trước đây!'],
                    200
                );
            } else {

                return response()->json(
                    ['kiemtra' => true, 'message' => 'Đăng nhập thành công !', "admin" => $check_email],
                    200
                );


            }
        } else {
            return response()->json(
                ['kiemtra' => false, 'message' => 'email null !', "admin" => null],
                200
            );
        }
    }
    public function check_email_admin(Request $request)
    {
        $users = DB::table('user')->where([['email','=', $request->email],['roles','=','nv']])->get();
        if (count($users) > 0) {
            return response()->json(
                ['kiemtra' => true, 'message' => 'Đăng nhập thành công !', "admin" => $users],
                200
            );
        } else {
            return response()->json(
                ['kiemtra' => false, 'message' => 'Email này chưa từng được đăng ký !', "admin" => null],
                200
            );
        }
    }

    public function reset_password_admin(Request $request)
    {
        if ($request->email === null || $request->password_update === null) {
            return response()->json(
                ['kiemtra' => false, 'message' => 'Đổi mật khẩu không thành công !'],
                200
            );
        } else {
            $reset_password = DB::table('user')
                ->where('email', $request->email)
                ->update(['password' => $request->password_update]);
            return response()->json(
                ['kiemtra' => true, 'message' => 'Đổi mật khẩu thành công !', "reset_password" => $reset_password],
                200
            );
        }

    }
    public function index()
    {
        
        $users = User::orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'users_data' => $users],

            200

        );
    }
    public function get_customer()
    {
        
        $users = User::where([['status', '=', 1], ['roles', '=', "customer"]])->orderBy("created_at", "DESC")->get();

        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'users_data' => $users],

            200

        );
    }

    public function show($id)
    {

        $User = User::find($id);

        return response()->json(

            ['success' => true, 'message' => 'tai du lieu thanh cong', 'user_data' => $User],

            200

        );
    }
    //Post- them store
    public function store(Request $request)
    {
        $User = new User();

        $User->name = $request->name;
        $User->email = $request->email;
        $User->phone = $request->phone;
        $User->username = $request->username;
        $User->password = $request->password;
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $User->name . '.' . $extension;
                $User->image = $filename;
                $files->move(public_path('images/user'), $filename);
            }
        }
        $User->address = $request->address;
        $User->roles = $request->roles;
        $User->created_at = date('Y-m-d H:i:s');
        $User->created_by = 1;
        $User->status = $request->status; //form
        $User->save(); //lưu vào Csdl
        return response()->json(
            ['success' => true, 'message' => 'Thanh cong', 'user_data' => $User],
            201
        );
    }
    //User-update
    public function update(Request $request, $id)
    {

        $User = User::find($id);
        $files = $request->image;
        if ($files != null) {
            $extension = $files->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'png', 'gif', 'webp', 'jpeg'])) {
                $filename = $User->slug . '.' . $extension;
                $User->image = $filename;
                $files->move(public_path('images/user'), $filename);
            }
        }
        $User->name = $request->name;
        $User->email = $request->email;
        $User->phone = $request->phone;
        $User->username = $request->username;
        $User->password = $request->password;
        $User->address = $request->address;
        $User->roles = $request->roles;
        $User->created_at = date('Y-m-d H:i:s');
        $User->created_by = 1;
        $User->status = $request->status; //form
        $User->save(); //lưu vào Csdl

        return response()->json(

            ['success' => true, 'message' => 'Cập nhật dữ liệu thành công', 'user_data' => $User],

            200

        );
    }
    //xoa
    public function destroy($id)
    {
        $User = User::find($id);
        if ($User == null) {
            return response()->json(
                ['message' => 'Tai du lieu khong thanh cong', 'success' => false, 'user_data' => null],
                404
            );
        }
        $User->delete();
        return response()->json(['message' => 'Thanh cong', 'success' => true, 'user_data' => $User], 200);

    }
}