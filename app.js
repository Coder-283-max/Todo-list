//⒈添加
// 1.获取页面元素（是JS“抓”页面元素的工具，就像用钩子勾住它们，后续才能操作）
const input = document.getElementById('todoText');//输入框
const addBtn = document.getElementById('addBtn');//添加按钮
const todoList = document.querySelector('.todo-list');//待办列表

// 2.给“添加”按钮绑定点击事件（点按钮时触发函数）
addBtn.addEventListener('click',addTodo);

// 3. 按回车键也能添加（优化体验）
input.addEventListener('keypress',function(e) {
    if (e.key === 'Enter') { // 如果按的是回车键
        addTodo();  // 就执行添加函数
    }
});

// 4. 核心函数：添加待办项
function addTodo() {                                //这个addTodo是自己创的名字，随便取，只要后面的函数名和它一样就可以了
    // 先获取输入框的文字（trim()是帮助用户自动去掉不小心输入的前后空格）
    const text = input.value.trim(); 

    // 如果输入为空，就不添加（避免空内容）
    if (text === '')  {
        alert('请输入待办内容');
        return; // 结束函数
    }

// 5. 第四步正确没问题以后才开始执行第五步，否则就是一直因没输入东西而return返回回去。动态创建待办项的HTML结构（用JS拼出<li>标签）
const li = document.createElement('li'); // 创建<li>标签
    li.className = 'todo-item'; // 加样式类名（和示例一致）

    // 给<li>加内容（包含文字和删除按钮）
    li.innerHTML = `
        <input type="checkbox" class="todo-check">
        <span>${text}</span>
        <button class="delete-btn">删除</button>
    `;

    // 6. 把新创建的<li>塞到列表里
    todoList.appendChild(li);

    // 7. 清空输入框（方便继续输入）
    input.value = '';

}

//⒉删除
// 给待办列表绑定点击事件（事件委托）
todoList.addEventListener('click', function(e) {
    // 判断用户点击的是不是带 delete-btn 类名的按钮（也就是删除按钮）
    if (e.target.classList.contains('delete-btn')) {
        // 找到按钮的父元素（也就是<li>待办项）
        const todoItem = e.target.parentElement;
        // 从列表中删除这个待办项
        todoList.removeChild(todoItem);
    }
    // 新增：复选框勾选逻辑
    else if (e.target.classList.contains('todo-check')) {
    // 找到父元素li，根据复选框是否勾选，添加/移除done类
     const li = e.target.parentElement;
     if (e.target.checked) {
        li.classList.add('done');  // 勾选时加样式
     } else {
        li.classList.remove('done'); // 取消勾选时删样式
     }
    }
});

// ⒊一键清空
// 获取清空按钮
const clearBtn = document.getElementById('clearBtn');

// 绑定点击事件：清空所有待办
clearBtn.addEventListener('click',function() {
    // 直接把列表的内容设为空（删除所有子元素）
    todoList.innerHTML = ''; //会直接清空<ul class="todo-list">里的所有内容，简单粗暴高效
});