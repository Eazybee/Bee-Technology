<?php
class TypeChecker {
    static function chkString($myString){
        if(!is_null($myString) && trim($myString)!=""){
            if(!is_string($myString)) {
                //throw  my custom Excpetions
                throw new MyDataTypeException('Wrong Data Entered', 'STRING', $myString);
            }
            return $myString;
        }
        //throws default Exception
        throw new Exception('Data can\'t be Empty');
    }
    static function chkInteger($myInteger){
        if(!is_null($myInteger) && trim($myInteger)!=""){
            if(!is_int($myInteger)) {
                //throw  my custom Excpetions
                throw new MyDataTypeException('Wrong Data Entered', 'INTEGER', $myInteger);
            }
            return $myInteger;
        }
        //throws default Exception
        throw new Exception('Data can\'t be Empty');
    
    }
    static function chkNumber($myNumber){
        if(!is_null($myNumber) && trim($myNumber)!=false){
            if(!is_numeric($myNumber)) {
                //throw my custom Excpetions
                throw new MyDataTypeException('Wrong Data Entered', 'NUMERIC', $myNumber);
            }
            return $myNumber;
        }
        //throws default Exception
        throw new Exception('Data can\'t be Empty');
    }
    static function chkObject($myObj){
        if(!is_null($myObj) ){
            if(!is_object($myObj)) {
                //throw my custom Excpetions
                throw new MyDataTypeException('Wrong Data Entered', 'OBJECT', $myObj);
            }
            return $myObj;
        }
        //throws default Exception
        throw new Exception('Data can\'t be Empty');
    }
    
    public function __toString() {
        return "Data Type Checker ". uniqid();
    }
}
