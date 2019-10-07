<?php
    spl_autoload_register();
    AutoLoaders::getAllLoader();
    

    if (isset($_POST['email'])) {
        try {
            $conn = MyMysql::getConnection('localhost', 'root', '', 'beetechnology'); //Create Connection
            $mail = new Mail_($conn, 'info@beetechnology.tech', 'no-reply@beetechnology.tech'); //Mail it out
            if ($conn->insert($mail->name, $mail->email, $mail->mesg)) {//update database
                echo 'TRUE';
                exit();
            } 
             
            echo 'FALSE';
            exit();
        } catch (MyDataTypeException $e) {
            echo $e->getErrorExplanation(); //false
            exit();
        } catch (mysqli_sql_exception $e) {
            echo $e->getMessage();
            exit();
        } catch (Exception $e) {
            echo $e->getMessage();
            exit();
        } 
        
    }
    echo 'FALSE';