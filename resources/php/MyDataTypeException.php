<?php

class MyDataTypeException extends Exception{
    private $enteredValue;
    private $myMsg;
    private $dataType;
    final public function __construct($msg,$dataType,$enteredValue) {
        $this->enteredValue=$enteredValue;
        $this->dataType=$dataType;
        $this->myMsg='Error on line: '.$this->getLine();
        $this->myMsg.= ' in File: '.$this->getFile();
        $this->myMsg .= '<br> Error Message: '.$msg;
        parent::__construct($this->myMsg);
    }
    public function getErrorExplanation(){
        return 'DATATYPE ERROR!<br>Expected : '.$this->dataType.' but found : '. strtoupper(gettype($this->enteredValue));
    }  
}
