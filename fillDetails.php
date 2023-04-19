<?php

$con = mysqli_connect('localhost','root','','seatingmanage');

if(!($con)){
	echo "no connection";
}
else{

    if(isset($_POST['custDetail'])){

    $Cname = $_POST['cName'];
	$Cphone = $_POST['cPhone'];

	$sql = " insert into customerdetail (Cname,Cphone) values ('$Cname','$Cphone')";
	$query = mysqli_query($con,$sql);
    }
}

?>