<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if (isset($_POST["bigform"])) {
    $name = $_POST['name'];
    $nickname = $_POST['nickname'];
    $list = $_POST['list'];
    $budget = $_POST['budget'];
    $time = $_POST['time'];
    $more = $_POST['more'];
    $email = $_POST['email'];
    $tel = $_POST['tel'];
    $title = "Новое обращение по email (bigform)";
    $body = "
    <h2>Новое обращение</h2>
    <b>name:</b> $name <br />
    <b>nickname:</b> $nickname <br />
    <b>list:</b> $list <br />
    <b>budget:</b> $budget <br />
    <b>time:</b> $time <br />
    <b>more:</b> $more <br />
    <b>email:</b> $email <br />
    <b>tel:</b> $tel
";
} else if (isset($_POST["telform"])) {
    $tel = $_POST['tel'];
    $title = "Новое обращение по email (telform)";
    $body = "
    <h2>Новое обращение</h2>
    <b>tel:</b> $tel
";
} else if (isset($_POST["miniform"])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $title = "Новое обращение по email (miniform)";
    $body = "
    <h2>Новое обращение</h2>
    <b>name:</b> $name <br />
    <b>email:</b> $email <br />
    <b>message:</b> $message
";
} else {
    $title = "Новое обращение по email (ошибка)";
    $body = "Ошибка" . var_dump($_POST);
}

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 0;
    // $mail->Debugoutput = function ($str, $level) {
    //     echo "debug level $level; message: $str";
    // };


    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'tentar@inbox.ru'; // Логин на почте
    $mail->Password   = '0rJbQexfi6sTm5Esvcq4'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('tentar@inbox.ru', 'Aora Tersi'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('tentar@inbox.ru');

    // Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

    // Проверяем отравленность сообщения
    if ($mail->send()) {
        $result = [
            "error" => false,
            "textError" => ""
        ];
        echo json_encode($result);
    } else {
        $result = [
            "error" => true,
            "textError" => "Ошибка при отправке {$mail->ErrorInfo}"
        ];
        echo json_encode($result);
    }
} catch (Exception $e) {
    $result = [
        "error" => true,
        "textError" => "{$mail->ErrorInfo}"
    ];
    echo json_encode($result);
}