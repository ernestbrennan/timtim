<?php

use Swagger\Annotations as SWG;

/**
 * @SWG\Swagger(
 *   basePath="/api",
 *   schemes={L5_SWAGGER_CONST_SCHEME},
 *   host=L5_SWAGGER_CONST_HOST,
 *   @SWG\Info(
 *     title="DR Kirichuk",
 *     version="1.1",
 *     description="DR Kirichuk"
 *   ),
 * )
 * @SWG\SecurityScheme(
 *   securityDefinition="auth",
 *   type="apiKey",
 *   in="header",
 *   name="Authorization"
 * )
 */

/**
 * @SWG\Definition(
 *   definition="RealtyFilters",
 *   description="Realty filters",
 *   @SWG\Property(
 *     property="city_id",
 *     type="number",
 *     description="Cities id",
 *     default="1"
 *   ),
 *   @SWG\Property(
 *       property="types",
 *       description="Realty Types",
 *       type="array",
 *       @SWG\Items(type="string", enum={"private_house", "flat", "office", "country_house"}, default="private_house")
 *   ),
 *   @SWG\Property(
 *       property="room_counts",
 *       description="Room Counts",
 *       type="array",
 *       @SWG\Items(type="integer", enum={"1", "2", "3", "4"}, default="1")
 *   ),
 *   @SWG\Property(
 *     property="adv_type",
 *     type="string",
 *     enum={"rent", "sale"},
 *     description="ADV Type",
 *     default="rent"
 *   ),
 *   @SWG\Property(
 *     property="currency",
 *     type="string",
 *     enum={"rub", "usd"},
 *     description="Currency",
 *     default="rub"
 *   ),
 *   @SWG\Property(
 *     property="price_min",
 *     type="integer",
 *     description="Price Min",
 *     default="100"
 *   ),
 *   @SWG\Property(
 *     property="price_max",
 *     type="integer",
 *     description="Price Max",
 *     default="100000"
 *   ),
 *   @SWG\Property(
 *     property="size_min",
 *     type="integer",
 *     description="Price Min",
 *     default="50"
 *   ),
 *   @SWG\Property(
 *     property="size_max",
 *     type="integer",
 *     description="Size Max",
 *     default="200"
 *   ),
 *   @SWG\Property(
 *     property="is_owner",
 *     type="boolean",
 *     description="Is Owner",
 *     default="true"
 *   ),
 * )
 */