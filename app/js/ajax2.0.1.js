function sendAjax(options) {
    var _default = {
        method: 'GET',
        url: '',
        data: null,
        success: null,
        error: null
    }
    // 替换默认值
    for(var i in options) {
        _default[i] = options[i];
    }
    if(_default.method.toUpperCase() == 'GET') {
        // 如果url中存在?, 默认添加&符号
        var f = _default.url.indexOf('?') > -1 ? '&' : '?';
        _default.url += f + '_=' + Date.now();
        for(var j in _default.data) {
            _default.url += '&' + j + '=' + _default.data[j];
        }
        // url拼接成功, get请求send中不需要参数,把他转换为null;
        _default.data = null;
    }else {
        _default.data = JSON.stringify(_default.data);
    }
    var xhr = new XMLHttpRequest();
    xhr.open(_default.method, _default.url, true);
    xhr.send(_default.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status == 200) {
            var data = xhr.responseText;
            data = JSON.parse(data);
            _default["success"] && _default["success"](data);
        }
    }
}