<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019-11-18
 * Time: 15:45
 */


function curl_https($url, $data=array(), $header=array(), $timeout=60, $debug=false){

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);

    $response = curl_exec($ch);

    if($error=curl_error($ch)){
        die($error);
    }

    // 打印错误信息
    if($debug)
    {

        echo '=====info====='."\r\n";
        print_r( curl_getinfo($ch) );

        echo '=====error====='."\r\n";
        print_r( curl_error($ch) );

        echo '=====$response====='."\r\n";
        print_r( $response );

    }
    curl_close($ch);

    return $response;

}

set_time_limit(0);

header('Content-Type:text/json;charset=utf-8');
$data = curl_https('https://api.huobi.pro/market/history/kline?period=1day&size=200&symbol=btcusdt');
$data = json_decode($data,true);
echo json_encode($data);
