$(function() {
    // todo data
    var todoDataModel = [];
    var baseImgUrl = 'http://img.infinitynewtab.com/wallpaper/',
        backgroundUrl = '';

    // 控制器
    var todoControl = {
        init: function() {
            todoDataModel = localStorage.todo ? JSON.parse(localStorage.todo).reverse() : [];
            backgroundUrl = localStorage.bg ? localStorage.bg : '';
            todoView.init();
        },
        // 获取所有todo信息
        getAll: function() {
            return todoDataModel.reverse();
        },
        // 添加一条todo信息
        add: function(text) {
            // console.log(text)
            var allList = this.getAll();
            var addTodo = {
                id: allList.length,
                task: text,
                isFinished: false
            };
            allList.push(addTodo);
            todoView.render();
            localStorage.todo = JSON.stringify(todoDataModel);
        },
        // 删除任务
        delate: function(id) {
            // console.log(id)
            var allList = this.getAll();

            for (var j = 0; j < allList.length; j++) {
                if (allList[j].id === id) {
                    allList.splice(j, 1);
                }
            }
            todoView.render();
            localStorage.todo = JSON.stringify(todoDataModel);
        },
        // 完成任务
        finish: function(id) {
            var allList = this.getAll();

            for (var j = 0; j < allList.length; j++) {
                if (allList[j].id === id) {
                    allList[j].isFinished = true;
                }
            }
            todoView.render();
            localStorage.todo = JSON.stringify(todoDataModel);
        },
        // 设置背景图片
        getBackground: function(set) {
            var backgroundNumber = Math.floor(Math.random() * 4000);
            if (set) {
                backgroundUrl = baseImgUrl + backgroundNumber + '.jpg';
            } else {
                if (backgroundUrl === '') {
                    backgroundUrl = baseImgUrl + backgroundNumber + '.jpg';
                }
            }
            localStorage.bg = backgroundUrl;
            return backgroundUrl;
        }
    };

    // 视图
    var todoView = {
        // 初始化
        init: function() {
            this.$todoInp = $('.todo-inp');
            this.$todoContainer = $('.todo-list');
            $btnClear = $('.btn-clear');

            // 文本输入
            this.$todoInp.on('keydown', function(e) {
                // console.log(e)
                if (e.keyCode === 13) {
                    // 回车添加
                    var val = $(this).val();
                    if (val.trim() !== '') {
                        todoControl.add(val);
                        $(this).val('');
                    }
                } else if (e.keyCode === 27) {
                    // ESC 清空当前列表
                    $(this).val('');
                }
            })

            // 输入框获取焦点
            this.$todoInp.focus(isShowClear);

            // 输入框失去焦点
            this.$todoInp.blur(isShowClear);

            // 输入框失去焦点
            this.$todoInp.keyup(isShowClear);

            // 是否显示清除文本的 x 标
            function isShowClear() {
                if ($('.todo-inp').val() === '') {
                    $btnClear.fadeOut('fast');
                } else {
                    $btnClear.fadeIn('fast');
                }
            }

            // 点击清空当前输入框
            $btnClear.on('click', function(e) {
                $('.todo-inp').val('');
                isShowClear();
                $('.todo-inp').focus();
            })

            // 完成当前任务
            this.$todoContainer.on('click', '.icon', function() {
                var delItem = $(this).parents('.todo-line').data();
                todoControl.finish(delItem.id);
            })

            //  删除任务
            this.$todoContainer.on('click', '.btn-del', function() {
                var delItem = $(this).parents('.todo-line').data();
                // console.log(delItem.id)
                todoControl.delate(delItem.id);
            })

            // 背景图片
            $('.fengche').on('click', function() {
                var that = $(this);
                that.addClass('xuanzhuan');
                $('body').css('background-image', 'url(' + todoControl.getBackground(true) + ')');
                setTimeout(function() {
                    that.removeClass('xuanzhuan');
                }, 1200)
            })

            this.render();
        },
        // 渲染数据
        render: function() {
            this.$todoContainer.html('');
            $('body').css('background-image', 'url(' + todoControl.getBackground() + ')');

            var lists = todoControl.getAll();
            var todoHtmlStr = ''
            for (var i = 0; i < lists.length; i++) {
                var listItem = lists[i];
                todoHtmlStr += '<p class="todo-line" data-id="' + listItem.id + '">';
                if (listItem.isFinished) {
                    todoHtmlStr += '<i class="icon mbri-cust-feedback"></i>';
                    todoHtmlStr += '<span class="finished-del">';
                } else {
                    todoHtmlStr += '<i class="icon mbri-chat"></i>';
                }
                todoHtmlStr += listItem.task;
                todoHtmlStr += '</span>';
                todoHtmlStr += '<i class="btn-del mbri-trash"></i>';
                todoHtmlStr += '</p>';
            }
            this.$todoContainer.append(todoHtmlStr);
        }
    };

    todoControl.init();
})