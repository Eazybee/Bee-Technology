<?php

    class MysqlCleanInput {
        static function clean($conn, $string){
            $pas= self::mysql_secure($conn, $_POST[$string]);
              // echo htmlentities($pas)."<br/>";
            return trim(htmlspecialchars($pas));
        }

        private static function mysql_secure($conn, $string){
            if (get_magic_quotes_gpc()){ 
                $string = stripslashes($string);
                //echo "noo $string";
            }
            //REMOVE HTML TAGS COMPLETELY
            $string = strip_tags ($string);
            return $conn->real_escape_string($string);
        }
    }
