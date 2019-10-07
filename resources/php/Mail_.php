<?php
    class Mail_ {
        private $conn;
        public $name;
        public $email;
        public $mesg;
        
        function __construct(MyMysql $conn, $to, $from) {
            
            $this->name = strtoupper(MysqlCleanInput::clean($conn, 'name'));
            $this->email = MysqlCleanInput::clean($conn, 'email');
            $this->mesg = MysqlCleanInput::clean($conn, 'msg');
            
            
            TypeChecker::chkString($this->name);
            TypeChecker::chkString($this->email);
            TypeChecker::chkString($this->mesg);
            
            if (!preg_match("/^[a-zA-Z\s]*$/",$this->name) ) {
                throw  new Exception("Only letters and white space allowed"); 
            } else if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Invalid email format");
            } else{
                
                $subject    = "SITE CONTACT"; 
                // To send HTML mail, the Content-type header must be set
                $headers  = 'MIME-Version: 1.0' . "\r\n";
                $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

                // Create email headers
                $headers .= 'From: '.$from."\r\n".'Reply-To: '.$from."\r\n".'X-Mailer: PHP/'.phpversion();

                $message = '<html>
                                <body>
                                    <h1 style="text-align:center; width:80%; margin:1em auto;">Contact form filled</h1>
                                    <div style="border:solid 0.2em #aa0000;text-align:center; margin:0 auto; width:80%;">
                                        <p>Name : '.$this->name.'</p>
                                        <p>Email &colon; '.$this->email.'</p>
                                        <p>Message &colon; '.$this->mesg.'</p>
                                    </div>
                                    <div style="text-align:center; width:80%; margin:1em auto;">
                                        <div  style="color:#ffc800;text-shadow:0.05em 0.06em 0.05em #aa0000; ">website &colon; <a href="www.beetechnology.tech" style="color:#aa0000; text-decoration: none; list-style:none;">Beetechnology.tech</a></div>
                                        <div style="color:#ffc800;">This is an auto generated mail, DO NOT REPLY</div>
                                    </div>
                                </body>
                            </html>';
               if(@mail($to, $subject, $message, $headers)  ){                
                   return TRUE;
               }
            }
            return FALSE;
        }
    }
