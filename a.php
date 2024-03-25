<html>
<head>

    <script src="pipes.js"></script>
</head>
</html>
<p id="thisone" onclick="pipes(this)" ajax-multi="j.json:thisone@modala;j.json:thatone@json">THICK</p>
<p id="thatone">THIN</p>
<script>
var f = {
    "button-left": {
        "tagname": "p",
        "id": "left",
        "width": 100,
        "height": 100,
        "class": "carousel-step-left", 
        "insert": "idtag1",
        "textContent": "HI!",
        // "set-attr": "idtag1.auto:true;idtag1.direction:left"
    },
    "carousel": {
        "tagname": "card",
        "id": "idtag1",
        "type": "audio",
        "sources": "01.mp3;02.mp3",
        "controls": "true",
        "auto": false,
        "boxes": 1,
        "iter": 0,
        "vertical": true,
        "insert": "idtag1",
        "width": 200,
        "height": 200,
        "direction": "right"
    },
    "button-right": {
        "tagname": "p",
        "id": "right",
        "width": 100,
        "height": 100,
        "class": "carousel-step-right",
        "insert": "idtag1",
        "textContent": "HI!",
        // "set-attr": "idtag1.auto:false;idtag1.direction:right"
    }
}
modala(f, document.body);
</script>
