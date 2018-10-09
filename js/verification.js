var verification = (function () {
    // 获取form表单
    var $from = document.querySelector('.form-box');
    // 找form表单的元素, 直接通过form表单点他的name就可以获取
    console.log($from.phone)
    
    // 获取确定按钮
    var $btn = document.querySelector('.btn');
    // 获取所有文本框
    var $inpALl = $from.querySelectorAll('input');
    // 表单验证规则
    var checkInput = {
        repassword: function (val) {
            var ele = document.getElementById('password');
            return ele.value == val ? 1 : 0;
        },
        password: function (val) {
            var reg = /^\w{6,13}$/;
            return reg.test(val) ? 1 : 0;
        },
        username: function (val) {
            var reg = /^\w{6,13}$/;
            return reg.test(val) ? 1 : 0;
        }
    }
    return {
        init: function () {
            this.event();
        },
        event: function () {
            var _this = this;
            // 循序安所有文本框,给每一个文本框添加blur事件
            for (var i = 0; i < $inpALl.length; i++) {
                $inpALl[i].onblur = function () {
                    // 文本值去除前后空格
                    var val =  this.value.trim();
                    //获取信息提示框
                    var $tipText = this.nextElementSibling;

                    if (val == '') {
                        // 文本框内容为空
                        $tipText.className = 'bg-danger';
                        $tipText.innerHTML = '输入内容不能为空';
                    } else {
                        // 文本内容不为空

                        // 如果bool为1 证明验证成功, 否则验证失败
                        var bool = checkInput[this.name](val);
                        if (bool) {
                            $tipText.className = 'bg-success';
                            $tipText.innerHTML = '输入正确';
                        } else {
                            $tipText.className = 'bg-danger';
                            // 把错误信息提前绑定到对应表单上面
                            // 通过表单找到自定义属性
                            $tipText.innerHTML = this.getAttribute('data-error');
                        }
                    }
                }
            }
            $btn.onclick = function (ev) {
                ev = ev || window.event;
                for (var i = 0; i < $inpALl.length; i++) {
                    $inpALl[i].focus()
                    $inpALl[i].blur()
                }
                // 获取失败元素
                // 如果有一个， 证明至少有一个表单没有通过验证
                var errorInput = $from.querySelector('.bg-danger');
                if(errorInput) {
                    errorInput.parentNode.querySelector('input').focus();
                } else {
                    console.log('恭喜成功')
                }
                // ev.preventDefault()
            }
        }
    }
}())