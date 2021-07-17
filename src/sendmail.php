<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;
    
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/SMTP.php';
    
    

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);
    $mail->IsSMTP();
    $mail->Host = "smtp.yandex.ru";
    $mail->SMTPAuth   = true; 
    $mail->Port       = 587;                   
    $mail->Username   = "skyland8919@yandex.ru"; 
    $mail->Password   = "isyvdllaqmpmdygi"; 
    $mail->SMTPDebug = 4;

    //От кого письмо
    $mail->setFrom('skyland8919@yandex.ru');
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
    
    echo($_POST['sum-in-rub']);
    echo($_POST['currency-list']);
    echo($_POST['sum-in-currency']);
    echo($_POST['mail']);
    
    //Отправка письма
    if(!$mail->send()){
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены !';
    }

    $response = array('message' => $message);

    header('Content-type: application/json');
    echo json_encode($response);

?>