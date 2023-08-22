const time = document.querySelector('.todo-title'); // 시계 부분
const todoInputElement = document.querySelector('.todo-input'); // 텍스트 입력 칸
const todoEnterBtn = document.querySelector('.enter'); // + 키
const todoList = document.querySelector('.todo-list'); // 리스트 
const completeAllBtn = document.querySelector('.complete-all-btn'); // 완료 체크 버튼
const leftItem = document.querySelector('.left-items'); // 🥕 오늘 할 일이 0개 남았습니다 🥕
const showAll = document.querySelector('.show-all-btn'); // 모두 보기
const showActive = document.querySelector('.show-active-btn'); // 남은 일
const showCompleted = document.querySelector('.show-completed-btn'); // 끝낸 일
const clearAll = document.querySelector('.clear-all-btn'); // 모두 지우기

let todos = []; // todo를 모아놓은 객체 배열 {id, content, isCompleted}
let id = 1; // todo 객체의 id가 될 숫자

let isAllCompleted = false; // todos 속 모든 todo의 isCompleted가 true인지 저장하는 Boolean

let curType = 'all'; // 현재 필터값을 저장하는 string -> 'all', 'active', 'completed' 
// (선택)

function clock(){
    const now = new Date();
    time.innerHTML = now.toLocaleTimeString('en-US' ,{hour12:false});
}

setInterval(clock, 1000);

showActive.onClick = function(){
    todoList.innerHTML = null;
    const leftTodo = getAllTodos().filter(todo => todo.isCompleted == false);
    leftTodo.forEach(todo => paintFilterTodo(todo));
}

// 현재 todos를 매개변수 newTodos로 바꿔주는 함수
const setTodos = (newTodos) => todos = newTodos; 

// 현재 todos 배열 전체를 반환하는 함수
const getAllTodos = () => {
    return todos;
}

// 현재 input에 입력된 value를 가져와서 처리하는 함수 -> 키보드 enter, 버튼 클릭 2가지로 수행
const getInputValue = () => {
    // todoInputElement에 'enter'키가 "keypress"됐을 때, doTrimValue() 실행
    todoInputElement.addEventListener('keypress', (e) =>{
        if(e.key === 'Enter'){
            doTrimValue(e.target.value);
        }
    });
    // input 옆 enter 버튼을 'click'했을 때, doTrimValue() 실행
    todoEnterBtn.addEventListener('click', () =>{
        doTrimValue(todoInputElement.value);
    });
};

getInputValue();

// 앞뒤 공백 제거 후, 빈 문자열이 아닐 경우 pushTodos() 실행
const doTrimValue = (val) =>{ 
    const trimVal = String(val).trim(); // string으로 형 변환 후, 공백 제거
    if( trimVal !== ''){ // 빈 문자열이 아니면
        pushTodos(trimVal); // pushTodos()로 todos 배열에 추가하기
    }
    else{ // 빈 문자열이면
        alert("내용을 입력 후 클릭하세요"); // alert 창
    }
    todoInputElement.value = ""; // input의 value 없애기
};

// todos 객체 배열에 객체 추가
const pushTodos = (context) =>{
    const newId = id++; // 아이디 할당
    // ...todos의 의미: todos 배열의 모든 항목을 새 배열에 복사하고, 
    // 그 뒤에 새로운 할 일 항목을 추가 -chat gpt-
    // 새로운 객체 배열 만들기, spread operator
    const newTodos = [...todos, { id : newId, content : context, isCompleted : false }]; 
    setTodos(newTodos); // setTodos()로 새로운 배열을 todos로 결정하기

    paintTodos(); // 갱신된 todos로 todo-list 작성하기
	setLeftItems(); // 남은 할일 계산하기
}

// 현재 todos에 있는 객체로 todo-list 작성하기
const paintTodos = ()=>{
    // 지금까지 list에 있던 li 요소를 지운다
    todoList.innerHTML = null;

    const allTodos = getAllTodos();
    allTodos.forEach(todo => paintFilterTodo(todo));
    /*
    1. allTodos 배열에 있는 모든 할 일 항목을 반복하며 작업을 수행함
    2. forEach() 메서드를 사용하여 배열의 각 항목을 반복하면서, 다음 작업을 수행함
        - 현재 반복 중인 할 일 항목을 todo 매개변수로 받습니다.
        - paintFilterTodo() 함수를 호출하여 현재 할 일 항목을 필터링하고, 
        해당 할 일 항목을 UI에 그립니다.
    3. 이 작업을 모든 할 일 항목에 대해 반복합니다.
    이 코드는 allTodos 배열에 있는 모든 할 일 항목을 필터링하고 UI에 표시하는 작업을 수행
    -chat gpt-
    */
};

const paintFilterTodo = (todo) =>{
    // 감싸줄 li 태그 생성, 클래스명 추가
    const liElement = document.createElement('li');
    liElement.classList.add('todo-item');
    // console.log(liElement);

    // 현재 객체가 완료된 객체면 클래스로 checked 추가
    if(todo.isCompleted){
        liElement.classList.add('checked');
    }

    // check button
    const checkElement = document.createElement('button');
    checkElement.classList.add('checkbox');
    checkElement.innerHTML = "✔︎";
    checkElement.addEventListener('click', ()=> completeTodo(todo.id));

    // content
    const contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerHTML = todo.content;
    contentElement.addEventListener('dblclick', (e)=> dbclickTodo(e, todo.id));

    // delete button
    const deleteElement = document.createElement('button');
    deleteElement.classList.add('delBtn');
    deleteElement.innerHTML = "✕";
    deleteElement.addEventListener('click', ()=> deleteTodo(todo.id));
    // 삭제할 때 천천히 사라지는 거 구현해보고 싶당..!
    
    // li 태그에 요소 합치기
    liElement.appendChild(checkElement);
    liElement.appendChild(contentElement);
    liElement.appendChild(deleteElement);

    // ul 태그에 현재 li 태그 합치기
    todoList.appendChild(liElement);

};

const activeItem = () => {
    const activeTodos = getAllTodos().filter(todo => !todo.isCompleted);
    activeTodos.forEach(todo => paintFilterTodo(todo));
}

const setLeftItems = () => {
    const leftTodo = getAllTodos().filter(todo => todo.isCompleted == false);
    // console.log(leftTodo.length);
    leftItem.innerHTML = `🥕 오늘 할 일이 ${leftTodo.length}개 남아있습니다 🥕`;
}

// todo-list에 input.edit-input 추가하기 (더블 클릭 이벤트)
const dbclickTodo = (e, todoId) => {
    const inputElement = document.createElement('input');
    inputElement.classList.add('edit-input');
    const content = e.target.innerHTML; /* e.target은 이벤트가 발생한 HTML 요소를 나타냄
    innerHTML 속성은 해당 HTML 요소의 내용을 나타내는 속성, 
    따라서 e.target.innerHTML은 이벤트가 발생한 HTML 요소의 내용 */
    inputElement.value = content;
    const curElement = e.target;
    const parentElement = curElement.parentNode;
    const clickBody = (e) => { //만약 이벤트가 발생한 요소가 inputElement와 같지 않다면(즉, inputElement의 외부를 클릭한 경우)
        if(e.target !== inputElement){
            parentElement.removeChild(inputElement); // parentElement에서 inputElement를 제거
        } // inputElement의 외부를 클릭했을 때, inputElement를 제거, 사용자가 입력 폼 외부를 클릭할 때 입력 폼이 사라짐
    }
    inputElement.addEventListener('keypress', (e)=>{
        if(e.key === "Enter"){
            if(String(e.target.value).trim() !== ""){
                updateTodo(e.target.value, todoId);
            }
            else{
                alert("현재 입력한 할 일이 없습니다!");
            }
        }
    });

    parentElement.appendChild(inputElement); // li 태그에 input 추가
    document.body.addEventListener('click', clickBody); // body에 click 이벤트 추가
    // document.body 요소에서 클릭 이벤트가 발생했을 때 
    // clickBody 함수를 호출하여 입력 폼을 닫는 이벤트 리스너를 등록
}

// todos 객체 배열에서 할일 수정
const updateTodo = (content, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, content} : todo );
    setTodos(newTodos);
    paintTodos();
}

const completeTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => (todo.id === todoId) ? {...todo, isCompleted : !todo.isCompleted} : todo);
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
};

const deleteTodo = (todoId) => {
    const newTodos = getAllTodos()
        .filter(todo => todo.id !== todoId)
        .map((todo, index) => ({ ...todo, id: index + 1 }));    ;
    setTodos(newTodos);
    paintTodos();
    setLeftItems();
}

/* 
Delete 기능 구현하기
- 객체 배열에서 지운다
- 다른 객체 요소들의 id를 바꿔줄 필요가 있다. => how? map으로 순회하면서, id를 전부 하나씩 줄인다?
*/

/* 
check 버튼 색깔 바꾸기
- 객체 배열에서 지운다
- 다른 객체 요소들의 id를 바꿔줄 필요가 있다. 
    => how? : // 현재 객체가 완료된 객체면 클래스로 checked 추가 (95행)
                추가된 class todo-item의 checked 클래스를 활용해
                css 내용 수정해줌
*/
