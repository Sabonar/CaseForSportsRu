var DATA;

function urlCheck(url)
{
	var u= /http(s?):\/\/[-\w\.]{3,}\.[A-Za-z]{2,3}/;
	return u.test(url);
}

function makeCell(value, param, hide)
{
	var cell = document.createElement("td");

	hide?cell.className="adaptive":0;

	var cellText;

	if(param == undefined || param == '')
	{
		cellText = document.createTextNode(value);
	}
	else
	{
		if(urlCheck(param))
		{
			cellText = document.createElement('div');
			cellText.innerHTML = "<span class='nation-flag'></span><span class='player-name'><a href='"+ param +"'>"+value+"</a></span>";
		}
		else
		{
			if(+param)
			{
				cellText = document.createTextNode(value);
				cell.className="cellColor" + param;
			}
		}
	}


	cell.appendChild(cellText);
	return cell;	
}

function addRow(row)
{

	var tbody= document.getElementById('tableBody');
	var trow = document.createElement("tr");

	trow.appendChild(makeCell(row['place'],row['color']));
	trow.appendChild(makeCell(row['name'], row['tag_url']));
	trow.appendChild(makeCell(row['matches']));
	trow.appendChild(makeCell(row['win'],null,1));
	trow.appendChild(makeCell(row['draw'],null,1));
	trow.appendChild(makeCell(row['lose'],null,1));
	trow.appendChild(makeCell(row['goals'],null,1));
	trow.appendChild(makeCell(row['conceded_goals'],null,1));
	trow.appendChild(makeCell(row['score']));

	tbody.appendChild(trow);
}

var last = null;

function sortFunc(param){
	console.log(window.event);
	var target=window.event.target;
	if (target==last)
	{
		var tbody= document.getElementById('tableBody').innerHTML="";
		var buf = DATA.sort(function(m1,m2)
		{
			return m1[param] - m2[param];
		});
	}
	else 
	{
 		var tbody= document.getElementById('tableBody').innerHTML="";
    	var buf = DATA.sort(function(m1,m2)
    	{
			return m2[param] - m1[param];
		});
	}

	last = target;

	buf.map(addRow);
}


window.onload = function() {
    $.getJSON('https://raw.githubusercontent.com/sportsru/table-task/master/seriea.json', function(data) 
    {
    	DATA = data['teams'];
    	DATA.map(addRow);
	});
}
