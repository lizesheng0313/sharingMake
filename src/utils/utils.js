/* eslint-disable */

export default {
    //深拷贝
    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    //获取url参数
    getUrlKey: function (name) {
        var url = decodeURIComponent(document.location.toString());
        var arrObj = url.split("?");
        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;
            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");
                if (arr != null && arr[0] == name) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    },
    exportStream(data, fileName) {
		//需要请求头设置 responseType:'blob'
		let blob = new Blob([data], { type: 'application/octet-stream' });
		let link = document.createElement('a');

		link.href = URL.createObjectURL(blob);
		link.style.display = 'none';
		link.download = fileName;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
    },
    //生成跳转存管的html
    createAutoCommitFormHtml: function (obj) {
		let arr = [];
		arr.push("<!DOCTYPE HTML>");
		arr.push("<html>");
		arr.push("</head>");
		arr.push("<meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>");
		arr.push("</head>");
		arr.push("<body>");
		arr.push("<form action='" + obj["url"] + "' accept-charset='UTF-8' method='post' id='autoSubmitForm'>")
		Object.keys(obj).forEach(function (key) {
			arr.push("<input type='hidden' name='" + key + "' value='" + obj[key] + "'/>");
		});
		arr.push("<script type='text/javascript'>document.getElementById('autoSubmitForm').submit()</script>")
		arr.push("</body>");
		arr.push("</html>");
		var html = arr.join('');
		console.log(html)
		return html
	},
}
