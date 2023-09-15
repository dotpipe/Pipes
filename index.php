<?php
session_start();
?>
<!DOCTYPE html>
<html>

<head>
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
    <h1>Modala Creator</h1>

    <table style="width:85%;">
        <tr>
            <td style="width:30%">
                Please Help us with a donation! $1 a month counts as a very helpful subscription!
            </td>
        </tr>
        <tr>
            <td>
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

                    <textarea id="ta"></textarea>
                    
                    <dyn id="copy" onclick="insertIntoTextArea(document.getElementById('ta').value)">Copy</dyn>
                </article>
            </td>
            <td rowspan="2">
                <div id="puthere"></div>
                <dyn id="cancel" onclick="document.getElementById('puthere').textContent='';">Cancel Out</dyn>
            </td>
            
        </tr>
        <tr>
            <td>
                <textarea id="whole" name="modal" class="form2" style="height:500px"></textarea>
                <dyn id="submit" form-class="form2" method="GET"
                    header="'contentType: application/x-www-form-urlencoded'"
                    onclick="modala(JSON.parse(document.getElementById('whole').value), document.getElementById('puthere'))">
                    Make page</dyn>
            </td>
        </tr>
    </table>
    <script src="pipes.js"></script>
    <script>

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
                        "options": "tagname:tagname;id:id;style:style;content:textContent;insert:insert;ajax:ajax;src:src;query:query;callback:callback;download:download;file:file;directory:directory;redirect:redirect;js:js;css:css;lnk:lnk;dyn:dyn;class:class"
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