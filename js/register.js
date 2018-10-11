var register = (function(){
    var checkInput = {
        pwdrepeat: function (val) {
            var ele = document.getElementById('password');
            return ele.value == val ? 1 : 0;
        },
        password: function (val) {
            var reg = /^\w{6,20}$/;
            return reg.test(val) ? 1 : 0;
        },
        username: function (val) {
            var reg = /^\w{4,20}$/;
            return reg.test(val) ? 1 : 0;
        }
    }
    return {
        init: function(ele) {
            // 获取form表单
            this.$ele = document.querySelector(ele);
            // 获取提交按钮
            this.$loginBtn = this.$ele['btn-register'];
            this.$usernameInp = this.$ele['username'];
            this.$passwordInp = this.$ele['password'];
            this.$pwdrepeatInp = this.$ele['pwdrepeat']
            this.$inputAll = this.$ele.querySelectorAll('input');
            this.event();
        },
        event: function() {
            var _this = this;
            // 提交按钮
            this.$loginBtn.onclick = function() {
                for(var i=0;i< _this.$inputAll.length;i++){
                    _this.$inputAll[i].focus();
                    _this.$inputAll[i].blur();
                }
                //获取失败元素,如果有一个,则没有通过验证
                var errorInput = document.querySelector('.error');
                if (errorInput){
                    errorInput.parentNode.previousElementSibling.querySelector('input').focus();
                } else {
                    // 发送ajax，验证用户名和密码
                    var params = {
                        method: 'post',
                        data: {
                            username: _this.$usernameInp.value,
                            password: _this.$passwordInp.value
                        },
                        success: function(data) {
                            data = JSON.parse(data);
                            _this.register(data);
                        }
                    }
                    sendAjax('http://localhost:7086/jdproject/php/register.php', params);
                }
            }
            this.$ele.onclick = function (ev) {
                ev = ev || window.event;
                var target = ev.target || ev.srcElement;
                if(target.className == 'clear-btn'){
                    target.previousElementSibling.value = '';
                    target.style = 'display:none';
                    var $tip = target.parentNode.nextElementSibling.firstElementChild;
                    $tip.innerHTML = '';
                }
            }
            for (var i=0;i< this.$inputAll.length;i++){
                this.$inputAll[i].onfocus =function() {
                    var $tip = this.parentNode.nextElementSibling.firstElementChild;
                    $tip.className = 'input-tip onfocus';
                    $tip.innerHTML = this.getAttribute('default');
                }
                this.$inputAll[i].oninput = function() {
                    this.nextElementSibling.style = 'display:block';
                    if (this.value == '') {
                        this.nextElementSibling.style = 'display:none';
                    }
                }
                this.$inputAll[i].onblur =function() {
                    // 文本值去除前后空格
                    var val =  this.value.trim();
                    var $tip = this.parentNode.nextElementSibling.firstElementChild;
                    if (val == '') {
                        // 文本框内容为空
                        $tip.innerHTML = '';
                        $tip.className = 'input-tip error';
                    } else{
                        var bool = checkInput[this.name](val);
                        if (bool) {
                            $tip.className = 'input-tip success';
                            $tip.innerHTML = '';
                        } else {
                            $tip.className = 'input-tip error yellow';
                            // 把错误信息提前绑定到对应表单上面
                            // 通过表单找到自定义属性
                            $tip.innerHTML = '输入格式错误,请重新输入'
                        }
                    }
                }
            }
        },
        register: function(data) {
            if(data.code == 200) {
                //   注册成功    
                var userList=new OprationCookie();
                userList.setCookie("name",data.data.username);
                location.href= "manager.html";
             } else {
                var $tip = this.$usernameInp.parentNode.nextElementSibling.firstElementChild;
                $tip.innerHTML = data.msg;
                $tip.className = 'input-tip error red';
             }
        }
    }
}())