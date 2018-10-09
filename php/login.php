<?php
    // 获取用户名
    // 返回的数据类型为json结构
    header("Content-Type: application/json");
    // 允许所有域名跨域
    header("Access-Control-Allow-Origin:*");
    include "public/connect_db.php";
    // $arr=array("name" => "hello");
    // echo json_encode($arr);
    $json = json_decode(file_get_contents("php://input"));
    $username = $json -> username;
    $password = $json -> password;
    $coon = new db;
    $sql = "SELECT * FROM shop_user WHERE username='$username' && password = '$password'";
    $crows = $coon ->Query($sql,2);
    if($crows){
      $arr = array("code" =>"200", "msg" =>"","data" =>array("id" =>$crows["id"],"token" =>"123123","username" =>$username));
    }else{
      $arr = array("code" =>"1000", "msg" =>"用户名或者密码错误");
    }
    echo json_encode($arr);
  ?>