<?php
echo "<span style=\"background-color:black;width:100%\"><br>";
echo "Firemaker::Pirodock v1.0 - <a href=\"http://www.github.com/swatchphp\">GitHub</a> + ";
echo "<a id='wiki-link' to-pipe=\"http://localhost\">Wiki</a> + ";
echo "<a id='donate' redirect=\"follow\" method=\"POST\" to-pipe=\"https://www.paypal.com/cgi-bin/webscr\"> Donate </a>";
echo '<input type="hidden" pipe="donate" class="data-pipe" name="cmd" value="_s-xclick" />';
echo '<input type="hidden" pipe="donate" class="data-pipe" name="hosted_button_id" value="TMZJ4ZGG84ACL" />';
echo '<input type="hidden" pipe="donate" class="data-pipe" name="source" value="url" />';
echo "<a pipe='wiki-link' class=\"data-pipe\" name=\"me\" value=\"mailto:inland14@live.com\">Contact</a> + ";
echo "<a pipe='wiki-link' class=\"data-pipe\" name=\"ops\" value=\"hey\" href=\"mailto:inland14@live.com\">Bug Report</a>";
echo '</span>';
