var formidable = require('formidable'),
	queryString = require('qs'),
	urlParser = require('url').parse,
	util = require('util');
//自定义内部事件
var _events = ['list', 'retrieve', 'putCollection', 'update',
	'create', 'postMember', 'deleteCollection', 'deleteMember'
];

function router(req, res, callback) {
	var method = req.method.toUpperCase();
	//将HTTP命令映射到自定义事件
	var event = emitEvent(method, req.resource);
	console.log('event: ' + event);
	if (supportEvent(event)) {
		//执行HTTP请求
		return execute(req, event, callback);
	} else {
		return 'No supported event found!';
	}
}

function execute(req, event, callback) {
	req.params = req.params || {};
	if (req.method === 'POST' || req.method === 'PUT') {
		//处理POST / PUT请求中的数据流
		var form = new formidable.IncomingForm();
		form.on('field', function(field, value) {
			req.params[field] = value;
		}).on('end', function() {
			//当数据流加载结束后调用相应的Module处理请求
			return invoke(req, event, callback);
		});

		form.parse(req);
	} else {
		//对于GET / DELETE请求，直接调用相应的Module处理请求
		var urlParams = urlParser(req.url, true).query;
		clone(req.params, urlParams);
		return invoke(req, event, callback);
	}
}

function invoke(req, event, callback) {
	//加载对应的资源处理Module
	var module = require('./model/' + req.resource['resource'] + '_dao'),
		model = new module.dao(),
		fn = model[event];
		
	fn(req.resource.id, req.params, function(result) {
		console.log('Execute result');
		console.log(result);
		var stringfyResult = JSON.stringify(result);
		callback(stringfyResult);
	});
}

function emitEvent(method, resource) {
	var localEvent;
	switch (method) {
		case 'GET':
			localEvent = resource.id == 0 ? 'list' : 'retrieve';
			break;
		case 'PUT':
			localEvent = resource.id == 0 ? 'putCollection' : 'update';
			break;
		case 'POST':
			localEvent = resource.id == 0 ? 'create' : 'postMember';
			break;
		case 'DELETE':
			localEvent = resource.id == 0 ? 'deleteCollection' : 'deleteMember';
			break;
	}
	return localEvent;
}

function supportEvent(event) {
	var result = false;
	_events.forEach(function(_event) {
		if (event === _event) {
			result = true;
		}
	});
	return result;
}

function clone(obj1, obj2) {
	for (var key in obj2) {
		obj1[key] = obj2[key];
	}
}


exports.router = router;