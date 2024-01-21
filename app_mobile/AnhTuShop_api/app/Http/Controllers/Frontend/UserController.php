<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function register_customer(Request $request)
    {
        $check_email = DB::table('user')->where([['email', '=', $request->email],["roles", '=',"customer"]]);

        if ($check_email->count() > 0) {
            return response()->json(
                ['success' => false, 'message' => 'Email này đã được đăng ký trước đây, vui lòng sử dụng email khác !'],
                200
            );
        } else {

            $addPro = DB::table('user')->insertGetId([
                "email" => $request->email_register,
                "phone" => $request->phone,
                "roles" => "customer",
                'name' => $request->customer_name,
                'username' => $request->user_name,
                'password' => $request->password_register,
            ]);
            return response()->json(
                ['success' => true, 'message' => 'Đăng ký tài khoản thành công', 'register_customer' => $addPro],
                200
            );
        }

    }
    public function login_customer(Request $request)
    {
        $check_email = DB::table("user")->where([['email', '=', $request->email_login]]);

        if ($check_email->count() == 0) {
            return response()->json(
                ['kiemtra' => "not_email", 'message' => 'Email này chưa từng được đăng ký trước đây!'],
                200
            );
        } else {
            $check_customer = DB::table("user")->where([['email', '=', $request->email_login], ['password', '=', $request->password_login],["roles",'=',"customer"]]);
            if ($check_customer->count() == 0) {
                return response()->json(
                    ['kiemtra' => "err_password", 'message' => 'Mật khẩu không chính xác !'],
                    200
                );

            } else {
                return response()->json(
                    ['kiemtra' => true, 'message' => 'Đăng nhập thành công !', "customer" => $check_customer->first()],
                    200
                );

            }
        }

    }
    public function check_email(Request $request)
    {
        $users = DB::table('user')->where('email', $request->email)->get();
        if (count($users) > 0) {
            return response()->json(
                ['kiemtra' => true, 'message' => 'Đăng nhập thành công !', "customer" => $users],
                200
            );
        } else {
            return response()->json(
                ['kiemtra' => false, 'message' => 'Email này chưa từng được đăng ký !', "customer" => null],
                200
            );
        }
    }

    public function reset_password(Request $request)
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

  
    public function get_CustomerById($id)
    {
        
        $user= DB::table("user")->where([['status', '=', 1], ['roles', '=', "customer"]])->first();

        return response()->json(

            ['success' => true, 'message' => "tai du lieu thanh cong", 'customer_data' => $user],

            200

        );
    }

  
  

}