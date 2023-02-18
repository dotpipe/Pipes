<?php

    
// Sidebar for Preorder creator
$form = '<font style=\'font-size:16;color:red;\'>Preorder Items</font><br>';

$form .= '<select class=\'item\' name=\'days\' alt="Call in">';
$form .= '<option value=\'0\'>Days</option>';
$form .= '<option value=\'1\'>01</option>';
$form .= '<option value=\'2\'>02</option>';
$form .= '<option value=\'3\'>03</option>';
$form .= '<option value=\'4\'>04</option>';
$form .= '<option value=\'5\'>05</option>';
$form .= '<option value=\'6\'>06</option>';
$form .= '<option value=\'7\'>07</option>';
$form .= '<option value=\'8\'>08</option>';
$form .= '<option value=\'9\'>09</option>';
$form .= '<option value=\'10\'>10</option>';
$form .= '<option value=\'11\'>Call</option>';
$form .= '</select><br>';
$form .= '<div id=\'preorders\'>';
$form .= '<div class=\'inclusions\'>';
$form .= '<input required type=\'text\' class=\'item\' name=\'item_name\' placeholder=\'Item name\'>';
$form .= '<font style=\'font-size:12px\'> Qu: </font><input id="qu" type=\'number\' class=\'item\' name=\'quantity\' style=\'display:table-cell;width:24px;\' value=1 min=1 required>';
$form .= '&nbsp;<button style=\'background:red;color:black;border-radius:50%;font-size:18px;border-right:1px solid white;\' onclick="removeItem(this)">&times;</button>';
$form .= '</div></div>';
$form .= '<div style=\'width:10%;display:table-cell;text-align:left;margin-left:20px;\'><button style=\'color:white:1px solid white;background:blue;border-radius:50%;font-size:18px\' onclick="addNewItem()">+</button></div>';
$form .= '<div style=\'width:10%;display:table-cell;text-align:left;margin-left:20px\'><button ajax="./vidiot.json" style=\'background:black;color:green;border-radius:50%;font-size:18px;border:2px solid white;\' form-class="item" json onclick="pipes(this);makePreorder();menuList(\'preorder.php\')">&check;</button></div>';
$form .= '</div>';

echo $form;
?>