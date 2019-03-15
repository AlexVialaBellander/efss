<?php
include 'data.php';
preg_match_all("#[A-Z][A-Z][A-Z][A-Z];[0-9][0-9][A-Z]*#", $data, $out); //OACI-RWY REGEX
//TO BE UPDATE IN ORDER TO KEEP THE OACI WITH NUMBERS INTO like 06FA

for($i=0;$i<count($out[0]);$i++)
{
	$rwy[$i] = explode(";",$out[0][$i]);
}

$airport[]="OACI";
for($i=0;$i<count($rwy);$i++)
{
	//["EKCH", ["22R/04L", "22L/04R", "30/12"]]
	//nouveau terrain
	
	if($i==0 or $rwy[$i][0]!=$rwy[$i-1][0])//New OACI
	{
		$j=array_push($airport, $rwy[$i][0]);
		$airport[$j][]=$rwy[$i][1]; //Rwy Add
	}
	else
		$airport[$j][]=$rwy[$i][1]; //Rwy Add
}

/*
FORMAT $airport Example
[1] => AGAT
    [2] => Array
        (
            [0] => 13
            [1] => 31
        )

    [3] => AGGA
    [4] => Array
        (
            [0] => 18
            [1] => 36
        )
*/

$r.="var data = [<br>"; //output var
for($i=1;$i<=count($airport);$i++)
{
	if(strlen($airport[$i])=="4") //OACI
	{
		if($i!="1")
			$r.=']], <br>';
		$r.='&nbsp;&nbsp;["'.$airport[$i].'", [';
	}
	else
	{
		$m=count($airport[$i])/2;
		for($j=0;$j<$m;$j++) //"06L" "06R" "10" "24L" "24R" "28" ""
		{			
			if(strpos($airport[$i][$j+$m],'L')==2 and strpos($airport[$i][$j],'L')==2)
				$d=strtr($airport[$i][$j+$m],'L','R');
			elseif(strpos($airport[$i][$j+$m],'R')==2 and strpos($airport[$i][$j],'R')==2)
				$d=strtr($airport[$i][$j+$m],'R','L');
			else
				$d=$airport[$i][$j+$m];
			$r.='"'.$airport[$i][$j].'/'.$d.'"';
			
			if($j<$m-1)
				$r.=', ';
		}
	}
}
echo $r.']]<br>]';
?>
