<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="icon" href="pipes.ico">
    <title>Modala Creator</title>
    <style>
        body {
            background-color: #333;
            color: #fff;
            font-family: Arial, sans-serif;
        }

        h1 {
            text-align: center;
            margin-top: 50px;
        }

        textarea {
            width: 90%;
            max-height: 300px;
        }

        article,
        textarea {
            max-width: 500px;
            margin: 0 auto;
            padding: 20px;
            background-color: #444;
            border-radius: 10px;
            border: 1px solid grey;
        }

        select {
            max-width: 200px;
            margin: 0 auto;
            padding: 0px;
            background-color: #eee;
            border-radius: 10px;
            cursor: pointer;
        }

        label {
            display: block;
            margin-bottom: 10px;
        }

        input[type="text"],
        span {
            float: right;
            width: 60%;
            margin: 0 auto;
            padding: 10px;
            border: none;
            background-color: #bbb;
            color: #fff;
            border-radius: 5px;
        }

        button[type="submit"],
        dyn {
            display: block;
            width: 90%;
            padding: 10px;
            margin-top: 20px;
            border: none;
            background-color: #999;
            color: #fff;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
        }

        button[type="submit"]:hover,
        dyn:hover {
            background-color: #666;
        }
    </style>
</head>

<body>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1005898633128967"
        crossorigin="anonymous"></script>
    <ins class="adsbygoogle" style="display:block" data-ad-format="autorelaxed" data-ad-client="ca-pub-1005898633128967"
        data-ad-slot="2759331251"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    <dyn id="i" style="width:200px;" ajax="https://github.com/wise-penny/pipes" class="redirect">
        https://github.com/wise-penny/pipes</dyn>
    <dyn id="i" style="width:200px;" ajax="http://g0d.me/ivy" class="redirect">Ivy Seed</dyn>
    <dyn id="i" style="width:200px;" ajax="http://g0d.me/freqwave" class="redirect">Freqwave</dyn>
    <table style="width:75%;">
        <tr>
            <td style="width:30%">
                <h1>Modala Creator</h1>
                Please Help us with a donation! $1 a month counts as a very helpful subscription!
            </td>
        </tr>
        <tr>
            <td>
                <article>
                    <div id="paypal-button-container-P-5H743869Y22155029MUBYZ7Y"></div>
                    <script
                        src="https://www.paypal.com/sdk/js?client-id=AdvDfbOhJIOM4hn3n9AfE1loBfADjY0GM8cFTJwWiat9bqoDY9zU64gmv0P7nWabg6TETsZ7paH-k2Ud&vault=true&intent=subscription"
                        data-sdk-integration-source="button-factory"></script>
                    <script>
                        paypal.Buttons({
                            style: {
                                shape: 'rect',
                                color: 'gold',
                                layout: 'vertical',
                                label: 'paypal'
                            },
                            createSubscription: function (data, actions) {
                                return actions.subscription.create({
                                    /* Creates the subscription */
                                    plan_id: 'P-5H743869Y22155029MUBYZ7Y',
                                    quantity: 1 // The quantity of the product for a subscription
                                });
                            },
                            onApprove: function (data, actions) {
                                alert(data.subscriptionID); // You can add optional success message for the subscriber here
                            }
                        }).render('#paypal-button-container-P-5H743869Y22155029MUBYZ7Y'); // Renders the PayPal button
                    </script>
                </article>
            </td>
            <td rowspan="2">

                <article>

                    <block id="block0"></block>
                    <block id="block5"></block>

                    <block id="block1"></block>
                    <block id="block6"></block>

                    <block id="block2"></block>
                    <block id="block7"></block>

                    <block id="block3"></block>
                    <block id="block8"></block>

                    <block id="block4"></block>
                    <block id="block9"></block>

                    <br>

                    <dyn id="submit" form-class="form1" method="GET"
                        header="'contentType: application/x-www-form-urlencoded'" ajax="getform.php" insert="ta">Add
                    </dyn>

                    <br>

                    <textarea id="ta" style="color:black" disabled="true"></textarea>

                    <dyn id="copy" onclick="insertIntoTextArea(document.getElementById('ta').value)">Copy Modal</dyn>
                </article>
            </td>
            <td rowspan="2">
                <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1005898633128967"
                    crossorigin="anonymous"></script>
                <div id="puthere"></div>
                <dyn id="cancel" onclick="document.getElementById('puthere').textContent='';">Cancel Out</dyn>
            </td>
            <td rowspan="2">
                <script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1005898633128967"
                    crossorigin="anonymous"></script>
                <ins class="adsbygoogle" style="display:block; text-align:center;" data-ad-layout="in-article"
                    data-ad-format="fluid" data-ad-client="ca-pub-1005898633128967" data-ad-slot="6576692306"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </td>
        </tr>
        <tr>
            <td>
                <textarea id="whole" name="modal" class="form2" style="height:500px"></textarea>
                <dyn id="submit" form-class="form2" method="GET"
                    header="'contentType: application/x-www-form-urlencoded'"
                    onclick="modala(JSON.parse(document.getElementById('whole').value), document.getElementById('puthere'))">
                    Make page</dyn>
                <?php $time = "json" . time() . ".json"; ?>
                <dyn id="copy-download" ajax="makefile.php" method="GET" insert="download" form-class="form2"
                    onclick="copyJSON()">Copy JSON</dyn>
                <br>
                <div id="download"></div>
            </td>
        </tr>
    </table>
    <script src="pipes.js"></script>
    <script>

        function copyJSON() {
            /* Get the text field */
            var json = document.getElementById("whole");

            /* Select the text field */
            json.select();
            json.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            alert("Copied Modal to clipboard");
        }

        var lastCursorPosition = 0;

        function insertIntoTextArea(arg) {
            console.log(arg + "$$$");
            var textarea = document.getElementById("whole");
            var cursorPosition = textarea.selectionStart;
            var text = textarea.value;
            var newText = text.slice(0, cursorPosition) + arg + text.slice(cursorPosition);
            textarea.value = newText;
            lastCursorPosition = cursorPosition + arg.length;
        }

        var form = {
            "tagname": "div",
            "j0": {
                "jsons": {
                    "tagname": "select",
                    "style": "width:150px;height:45px;font-size:30px",
                    "name": "key",
                    "select": {
                        "options": "tagname *:tagname;id *:id;style:style;content:textContent;insert:insert;ajax:ajax;src:src;query:query;form-class:form-class;value:value;callback:callback;file:file;directory:directory;js:js;css:css;set-attr:set-attr;class:class"
                    },
                    "class": "form1",
                    "id": "key"
                }
            },
            "j1": {
                "tagname": "input",
                "id": "GH",
                "type": "text",
                "name": "value",
                "class": "form1"
            }
        };

        for (i = 0; i <= 9; i++) {
            form['j0']['jsons']['name'] = "key" + i;
            form['j0']['jsons']['id'] = "key" + i;
            form['j1']['name'] = "value" + (i);
            form['j1']['id'] = "GH" + (i);
            modala(form, document.getElementById("block" + (i)));
        }
    </script>
    <script>
        paypal.Buttons({
            style: {
                shape: 'pill',
                color: 'gold',
                layout: 'horizontal',
                label: 'subscribe'
            },
            createSubscription: function (data, actions) {
                return actions.subscription.create({
                    /* Creates the subscription */
                    plan_id: 'P-0DV37363ES9515007MUANEOY',
                    quantity: 1 // The quantity of the product for a subscription
                });
            },
            onApprove: function (data, actions) {
                alert(data.subscriptionID); // You can add optional success message for the subscriber here
            }
        }).render('#paypal-button-container-P-0DV37363ES9515007MUANEOY'); // Renders the PayPal button
    </script>
</body>

</html>