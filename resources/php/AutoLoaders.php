<?php
class AutoLoaders {
    static function getAllLoader(){
        self::getUppercaseLoader();
        self::getPearLoader();
        self::getNamespaceLoader();
        return;
    }

    static function getUppercaseLoader(){
        return 
        spl_autoload_register(function($classname){
            if(file_exists("$classname.php")){
                require_once "$classname.php";
            }
        });
    }

    static function getPearLoader(){
        return
        spl_autoload_register(function($classname){
            $path= str_replace('_', DIRECTORY_SEPARATOR, $classname);
            $path= "..".DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."{$path}.php";
            if(file_exists($path)){
                require_once $path;
            }
        });
    }

    static function getNamespaceLoader(){
        return
        spl_autoload_register(function($classname){
            $path="";
            if ( preg_match( '/\\\\/', $classname ) ) {
                $path ="../". str_replace('\\', DIRECTORY_SEPARATOR, $classname );
            }
            if ( file_exists( "{$path}.php" ) ) {
                require_once( "{$path}.php" );
            }
        });
    }
}
