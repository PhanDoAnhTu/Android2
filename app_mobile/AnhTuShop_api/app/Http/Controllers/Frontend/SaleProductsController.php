<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class SaleProductsController extends Controller
{

    public function getSaleProductAll($limit, $page = 1)
    {
        if ($limit > 0) {
            $offset = ($page - 1) * $limit;
            $store_products = DB::table('store_products')
                ->join("product", 'store_products.product_id', '=', 'product.id')
                ->where('store_products.status', 1)
                ->select('product_id', 'product.name as product_name', 'product.slug as product_slug', 'product.image as product_image', 'product.price as listed_price',"store_products.price as price_in_store", 'product.category_id', 'product.brand_id', 'product.short_description as product_short_description', 'product.detail as product_detail', 'store_products.qty as store_qty', 'store_products.qty_sold as qty_sold_store_products', 'store_products.status as store_status', 'store_products.created_at as store_created_date');

            $store_sale_products = DB::table('sale_products')
                ->rightJoinSub($store_products, 'products', function (JoinClause $join) {
                    $join->on('products.product_id', '=', 'sale_products.product_id')
                        ->where([['sale_products.status', 1], ['sale_products.start_time', '<=', date('Y-m-d H:i:s')], ['sale_products.end_time', '>=', date('Y-m-d H:i:s')]]);
                })
                ->select('products.*', 'sale_products.sale_id', 'sale_products.start_time', 'sale_products.end_time', 'sale_products.qty as sale_qty', 'sale_products.qty_sold as qty_sold_sale_products', 'sale_products.status as sale_status', 'sale_products.created_at as sale_created_date');

            $store_saleid_products = DB::table('sale_id')
                ->rightJoinSub($store_sale_products, 'store_sale_products', function (JoinClause $join) {
                    $join->on('store_sale_products.sale_id', '=', 'sale_id.id')
                        ->where('sale_id.status', 1);
                })
                ->select('store_sale_products.*', 'sale_id.name as sale_name', 'sale_id.short_description as sale_id_short_description', 'sale_id.image as sale_id_image', 'sale_id.percent_sale', 'sale_id.price_sale');

            $store_saleid_category_products = DB::table('category')
                ->rightJoinSub($store_saleid_products, 'store_saleid_products', function (JoinClause $join) {
                    $join->on('store_saleid_products.category_id', '=', 'category.id')
                        ->where('category.status', 1);
                })
                ->select('store_saleid_products.*', 'category.name as category_name', 'category.slug as category_slug', 'category.image as category_image', 'category.description as category_description');

            $store_saleid_category_brand_products = DB::table('brand')
                ->rightJoinSub($store_saleid_category_products, 'store_saleid_category_products', function (JoinClause $join) {
                    $join->on('store_saleid_category_products.brand_id', '=', 'brand.id')
                        ->where('brand.status', 1);
                })
                ->select('store_saleid_category_products.*', 'brand.name as brand_name', 'brand.slug as brand_slug', 'brand.image as brand_image', 'brand.description as brand_description');


            $store_saleid_category_brand_review_products = DB::table('product_reviews')
                ->rightJoinSub($store_saleid_category_brand_products, 'store_saleid_category_brand_products', function (JoinClause $join) {
                    $join->on('store_saleid_category_brand_products.product_id', '=', 'product_reviews.product_id');
                })
                ->select('store_saleid_category_brand_products.*', DB::raw('SUM(rating_score)/COUNT(rating_score) AS rating_score, COUNT(rating_score) as rating_qty'))
                ->groupBy('product_id')
                ->where('sale_id', '!=', null)
                ->orderBy('store_created_date', 'DESC')
                ->offset($offset)
                ->limit($limit)
                ->get();

            //////end_page
            $product_qty = DB::table('product_reviews')
                ->rightJoinSub($store_saleid_category_brand_products, 'store_saleid_category_brand_products', function (JoinClause $join) {
                    $join->on('store_saleid_category_brand_products.product_id', '=', 'product_reviews.product_id');
                })
                ->select('store_saleid_category_brand_products.*', DB::raw('SUM(rating_score)/COUNT(rating_score) AS rating_score, COUNT(rating_score) as rating_qty'))
                ->groupBy('product_id')
                ->where('sale_id', '!=', null)
                ->orderBy('store_created_date', 'DESC')
                ->get();
            $end_page = 1;
            if (count($product_qty) > $limit) {
                $end_page = ceil(count($product_qty) / $limit);
            }
            //////end_page

            return response()->json(

                ['success' => true, 'message' => "tai du lieu thanh cong", 'sale_products_all' => $store_saleid_category_brand_review_products, "product_qty" => count($product_qty), 'end_page' => $end_page],
                200

            );
        }
        return response()->json(

            ['success' => false, 'message' => "tai du lieu khong thanh cong"],
            200

        );
    }
    public function SaleProductAll_filter($limit, $page = 1, Request $request)
    {
        $BrandAll = DB::table('brand')->where('brand.status', 1)->select('brand.name as brand_name', 'brand.id as brand_id')->get();

        if ($limit > 0) {
            $offset = ($page - 1) * $limit;
            $store_products = DB::table('store_products')
                ->join("product", 'store_products.product_id', '=', 'product.id')
                ->where('store_products.status', 1)
                ->select('product_id', 'product.name as product_name', 'product.slug as product_slug', 'product.image as product_image', 'product.price as listed_price', 'product.category_id', 'product.brand_id', 'product.short_description as product_short_description', 'product.detail as product_detail',"store_products.price as price_in_store", 'store_products.qty as store_qty', 'store_products.qty_sold as qty_sold_store_products', 'store_products.status as store_status', 'store_products.created_at as store_created_date');

            $store_sale_products = DB::table('sale_products')
                ->rightJoinSub($store_products, 'products', function (JoinClause $join) {
                    $join->on('products.product_id', '=', 'sale_products.product_id')
                        ->where([['sale_products.status', 1], ['sale_products.start_time', '<=', date('Y-m-d H:i:s')], ['sale_products.end_time', '>=', date('Y-m-d H:i:s')]]);
                })
                ->select('products.*', 'sale_products.sale_id', 'sale_products.start_time', 'sale_products.end_time', 'sale_products.qty as sale_qty', 'sale_products.qty_sold as qty_sold_sale_products', 'sale_products.status as sale_status', 'sale_products.created_at as sale_created_date');

            if ($request->min_max_price !== []) {
                $store_saleid_products = DB::table('sale_id')
                    ->rightJoinSub($store_sale_products, 'store_sale_products', function (JoinClause $join) {
                        $join->on('store_sale_products.sale_id', '=', 'sale_id.id')
                            ->where('sale_id.status', 1);
                    })
                    // ->WhereBetween('sale_id.price_sale', [$request->min_max_price[0], $request->min_max_price[1]])
                    ->orwhereBetween('price_in_store', [$request->min_max_price[0], $request->min_max_price[1]])
                    ->select('store_sale_products.*', 'sale_id.name as sale_name', 'sale_id.short_description as sale_id_short_description', 'sale_id.image as sale_id_image', 'sale_id.percent_sale', 'sale_id.price_sale');
            } else {
                $store_saleid_products = DB::table('sale_id')
                    ->rightJoinSub($store_sale_products, 'store_sale_products', function (JoinClause $join) {
                        $join->on('store_sale_products.sale_id', '=', 'sale_id.id')
                            ->where('sale_id.status', 1);
                    })
                    ->select('store_sale_products.*', 'sale_id.name as sale_name', 'sale_id.short_description as sale_id_short_description', 'sale_id.image as sale_id_image', 'sale_id.percent_sale', 'sale_id.price_sale');

            }
            if ($store_saleid_products->get()->count() == 0) {
                return response()->json(

                    ['success' => false, 'message' => "tai du lieu khong thanh cong"],
                    200

                );
            }
            $store_saleid_category_products = DB::table('category')
                ->rightJoinSub($store_saleid_products, 'store_saleid_products', function (JoinClause $join) {
                    $join->on('store_saleid_products.category_id', '=', 'category.id')
                        ->where('category.status', 1);
                })
                ->select('store_saleid_products.*', 'category.name as category_name', 'category.slug as category_slug', 'category.image as category_image', 'category.description as category_description');

            $listIdBrand = array();
            if ($request->brand_id !== []) {
                foreach ($request->brand_id as $it) {
                    array_push($listIdBrand, (int) $it);
                }
            }
            if (count($listIdBrand) > 0) {
                $store_saleid_category_brand_products = DB::table('brand')
                    ->rightJoinSub($store_saleid_category_products, 'store_saleid_category_products', function (JoinClause $join) {
                        $join->on('store_saleid_category_products.brand_id', '=', 'brand.id')
                            ->where('brand.status', 1);
                    })
                    ->whereIn('brand.id', $request->brand_id)
                    ->select('store_saleid_category_products.*', 'brand.name as brand_name', 'brand.slug as brand_slug', 'brand.image as brand_image', 'brand.description as brand_description');

            } else {
                $store_saleid_category_brand_products = DB::table('brand')
                    ->rightJoinSub($store_saleid_category_products, 'store_saleid_category_products', function (JoinClause $join) {
                        $join->on('store_saleid_category_products.brand_id', '=', 'brand.id')
                            ->where('brand.status', 1);
                    })
                    ->select('store_saleid_category_products.*', 'brand.name as brand_name', 'brand.slug as brand_slug', 'brand.image as brand_image', 'brand.description as brand_description');
            }
            $store_saleid_category_brand_review_products = DB::table('product_reviews')
                ->rightJoinSub($store_saleid_category_brand_products, 'store_saleid_category_brand_products', function (JoinClause $join) {
                    $join->on('store_saleid_category_brand_products.product_id', '=', 'product_reviews.product_id');
                })
                ->select('store_saleid_category_brand_products.*', DB::raw('SUM(rating_score)/COUNT(rating_score) AS rating_score, COUNT(rating_score) as rating_qty'))
                ->groupBy('product_id')
                ->where('sale_id', '!=', null)
                ->orderBy('store_created_date', 'DESC')
                ->offset($offset)
                ->limit($limit)
                ->get();

            //////end_page
            $product_qty = DB::table('product_reviews')
                ->rightJoinSub($store_saleid_category_brand_products, 'store_saleid_category_brand_products', function (JoinClause $join) {
                    $join->on('store_saleid_category_brand_products.product_id', '=', 'product_reviews.product_id');
                })
                ->select('store_saleid_category_brand_products.*', DB::raw('SUM(rating_score)/COUNT(rating_score) AS rating_score, COUNT(rating_score) as rating_qty'))
                ->groupBy('product_id')
                ->where('sale_id', '!=', null)
                ->orderBy('store_created_date', 'DESC')
                ->get();
            $end_page = 1;
            if (count($product_qty) > $limit) {
                $end_page = ceil(count($product_qty) / $limit);
            }
            //////end_page

            return response()->json(

                ['success' => true, 'message' => "tai du lieu thanh cong", 'sale_products_all' => $store_saleid_category_brand_review_products, "brand_all" => $BrandAll, "product_qty" => count($product_qty), 'end_page' => $end_page],
                200

            );
        }
        return response()->json(

            ['success' => false, 'message' => "tai du lieu khong thanh cong"],
            200

        );
    }

}