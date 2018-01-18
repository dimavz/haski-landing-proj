<?php

$email_in= "zatulenko@gmail.com";
$email_out= "info@haski-puppies.info";

$sitename = "Щенки Хаски (huski-puppies.info)";

//Удаляем пробелы с начала и конца строки, если таковые имеются
$type_message = trim($_GET["type_message"]);
$name = trim($_GET["name"]);
$phone = trim($_GET["phone"]);
$email = trim($_GET["email"]);

//Преобразуем все спецсимволы, если пользователь попытался добавить их в форму
$type_message = htmlspecialchars($type_message);
$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email);

//Декодируем url, если пользователь пытался его добавить в форму
$type_message = urldecode($type_message);
$name = urldecode($name);
$phone = urldecode($phone);
$email = urldecode($email);



$pagetitle = "Новое сообщение с сайта ".$sitename ;
$message = "Тип сообщения:".$type_message."\nИмя:".$name."\nТелефон:".$phone."\nE-mail:".$email;
mail($email_in, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $email_out");

?>
