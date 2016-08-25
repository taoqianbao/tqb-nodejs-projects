/**  The standards restful url like http://www.example/resources/groups/1*/
exports.parse = function(input) {
	if (null == input || '' == input) return {}; //去除URL末端的斜杠	
	var str = removeSlashAtEnd(input),
		resIndex = str.indexOf('resources');
	if (resIndex == -1 || resIndex == str.length - 9) return {};
	queryStrs = str.substr(resIndex + 10).split('/'); // id = 0 means list all children
	if (queryStrs.length % 2 != 0) {
		queryStrs.push('0');
	}
	return {
		resource: queryStrs[0],
		id: queryStrs[1]
	};
};

function removeSlashAtEnd(str) {
	if (str.charAt(str.length - 1) == '/') {
		return str.substring(0, str.length - 1);
	}
	return str;
}