<?php

class MyMysql extends mysqli{
        
    function __construct($hn,$dbUserName,$dbPassword,$dbName) {
        parent::__construct($hn,$dbUserName,$dbPassword,$dbName);
        
    }
    
    
    function insert($name,$email,$mesg){
        $secure = $this->prepare('insert into mails(name,email,msg)values(?,?,?)');
        $secure->bind_param('sss', $name, $email, $mesg);
        $secure->execute();

        if(!$secure->error && $secure->affected_rows >0){
            return TRUE;
        }else { 
            return FALSE;
        }
    }

    static function getConnection($hn,$dbUserName,$dbPassword,$dbName){
        TypeChecker::chkString($hn);
        TypeChecker::chkString($dbName);
        TypeChecker::chkString($dbUserName);
        
        $conn = new MyMysql($hn, $dbUserName, $dbPassword, $dbName);
        if($conn->connect_error) throw new Exception ('Database Connection Error');
        return $conn ;
    }
    
}
