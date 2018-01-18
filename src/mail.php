<?php

$recepient = "zatulenko@gmail.com";
$sitename = "Щенки Хаски - huski-puppies.info";

$type_message = trim($_GET["type_message"]);
$name = trim($_GET["name"]);
$phone = trim($_GET["phone"]);
$email = trim($_GET["email"]);

$pagetitle = "Новое сообщение с сайта \"$sitename\"";
$message = "Тип сообщения:$type_message \nИмя: $name \nТелефон: $phone \nE-mail: $email";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>
