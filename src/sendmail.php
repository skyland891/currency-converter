<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    $mail->setFrom('uruslan2000@gmail.com');
    //Кому отправить
    $mail->addAddress($_POST['mail']);
    //Тема письма 
    $mail->Subject = 'Запись на обмен валюты';

    //Тело письма
    $body = '<h1>Информация о записи</h1>';

    if(trim(!empty($_POST['sum-in-rub']))){
        $body.='<p>Сумма в рублях: '.$_POST['sum-in-rub'].' руб.</p>';
    }
    if(trim(!empty($_POST['currency-list']))){
    $body.='<p>Валюта для обмена: '.$_POST['currency-list'].'</p>';
    }
    if(trim(!empty($_POST['sum-in-currency']))){
        $body.='<p>Сумма в валюте: '.$_POST['sum-in-currency'].'</p>';
    }

    $mail->Body = $body;

    //Отправка письма
    if(!$mail->send()){
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены !';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);

?>