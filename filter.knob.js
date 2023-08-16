
const knob = document.getElementById("knob");

function actionKnob(e)
{
	x = e.clientX - knob.offsetLeft;
	y = e.clientY - knob.offsetTop;

	let prevX = 0;
	let prevY = 0;

	const w = knob.clientWidth;
	const h = knob.clientHeight;

	const deltaX = w - x;
	const deltaY = h - y;

	const rad = Math.atan2(deltaY, deltaX);

	let deg = rad * (180 / Math.PI);

	if (y < h && x > w)
	{
		if (prevX <= x && prevY <= y)
		{

		}
		else if (prevX >= x && prevY >= y)
		{

		}
	}

	prevX = x;
	prevY = y;

	return deg;
}

function rotate (e)
{
	const result = Math.floor(actionKnob(e) - 90);

	knob.style.transform = `rotate(${result}deg)`;
}

function startRotation()
{
	window.addEventListener("mousemove", rotate);
	window.addEventListener("mouseup", endRotation);
}

function endRotation()
{
	window.removeEventListener("mousemove", rotate);
}

knob.addEventListener("mousedown", startRotation);
