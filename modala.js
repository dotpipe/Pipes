function forEachElem (value, tempTag)
{
	var temp = document.createElement(value["tagname"]);
	Object.entries(value).forEach((nest) => {
		const [k, v] = nest;
		
		if (v instanceof Object)
			forEachElem(v, temp);
		else if (k.toLowerCase() != "tagname" && k.toLowerCase() != "textcontent" && k.toLowerCase() != "innerhtml" && k.toLowerCase() != "innertext")
		{
			temp.setAttribute(k,v);
		}
		else if (k != "tagname" && k.toLowerCase() == "textcontent" || k.toLowerCase() == "innerhtml" || k.toLowerCase() == "innertext")
		{
			(k.toLowerCase() == "textcontent") ? temp.textContent = v : (k.toLowerCase() == "innerhtml") ? temp.innerHTML = v : temp.innerText = v;
		}
	});
	tempTag.appendChild(temp);
}
