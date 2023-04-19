<?php

$con = mysqli_connect('localhost','root','','seatingmanage');

if(!($con)){
	echo "no connection";
}
else{

if(isset($_POST['vendorBt'])){

	$username = $_POST['user'];
	$password = $_POST['pass'];

	$sql = " select * from  vendordetail where Username = '$username' and Password='$password' ";
	$query = mysqli_query($con,$sql);

	$row = mysqli_num_rows($query);
		if($row == 1){
			echo "login successful";
			header('location:Vendor.html');
		}else{
			echo "login failed";
			header('location:vendorLogin.html');
		}
    }
}
?>