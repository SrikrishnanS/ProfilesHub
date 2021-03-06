renderTagsChart = function(list) {
	drawTagsChart = function(divId, category, answerCount, answerScore, questionCount,
			questionScore, stackId) {
		new Highcharts.Chart({
			chart : {
				type : 'column',
				renderTo : divId
			},
			title : {
				text : 'Top Tags'
			},
			subtitle: {
	        	text: 'Stackoverflow User: ' + stackId
	        },
			xAxis : {
				categories : category,
				max : 4
			},
			yAxis : {
				min : 0,
				title : {
					text : 'Count / Score'
				},
				allowDecimals : false
			},
			scrollbar : {
				enabled : true
			},
			plotOptions : {
				column : {
					pointPadding : 0,
					borderWidth : 0
				},
				series: {
	                borderWidth: 0,
	                dataLabels: {
	                    enabled: true,                            
	                }
	            }
			},
			series : [ {
				name : 'Answer Count',
				data : answerCount
			}, {
				name : 'Answer Score',
				data : answerScore
			}, {
				name : 'Question Count',
				data : questionCount
			}, {
				name : 'Question Score',
				data : questionScore
			} ],
	        credits: {
	            enabled: false
	        }
		});
	}
	
	buildTagsChart = function(divId, stats, stackId) {
		var category = [];
		var answerCount = [];
		var answerScore = [];
		var questionCount = [];
		var questionScore = [];

		for (j = 0; j < stats.items.length; j++) {
			category.push(stats.items[j].tag_name);
			answerCount.push(stats.items[j].answer_count);
			answerScore.push(stats.items[j].answer_score);
			questionCount.push(stats.items[j].question_count);
			questionScore.push(stats.items[j].question_score);
		}
		drawTagsChart(divId, category, answerCount, answerScore, questionCount,
				questionScore, stackId);
	}
	
	gatherTagsStats = function(i, stackId) {
		var divId = "tags-graph-" + i;
		var newDiv = "<div id='" + divId + "' class='work-graph'></div>"
		$("#stack-graphs").append(newDiv);
		$.ajax({
			type : 'GET',
			url : "https://api.stackexchange.com/2.2/users/" + stackId
					+ "/top-tags?site=stackoverflow",
			beforeSend : function() {
				$("#"+divId).html(imageHTML);
			},
			success : function(stats) {
				buildTagsChart(divId, stats, stackId);
			},
			error : function(data) {
			},
			complete : function() {
			}
		});
	}
	
	for (i = 0; i < list.length; i++) {
		gatherTagsStats(i, list[i]);
	}
}