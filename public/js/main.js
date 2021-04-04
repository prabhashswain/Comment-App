let username;
let textarea = document.querySelector('#textarea');
let submitBtn = document.querySelector('#submitBtn');
let commentBox = document.querySelector('.comment__box');
let typing = document.querySelector('.typing');
let socket = io();

do {
    username = prompt('Enter Username')
} while (!username);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let comment = textarea.value;
    if (!comment) {
        return;
    }
    postComment(comment);
})
const postComment = (comment) => {
    //append To Dom
    data = {
        comment: comment,
        username: username
    }
    appendToDom(data);
    textarea.value = '';
    //Broadcast
    broadcastComment(data);
    //sync to mongo db
    syncDB(data);

}
const appendToDom = (data) => {
    let lTag = document.createElement('li');
    lTag.classList.add('comment', 'mb-3');
    let markUp = `
    <div class="card border-light mb-3">
    <div class="card-body">
        <h6>${data.username}</h6>
        <p>${data.comment}</p>
        <div>
            <img src="/img/clock.png" alt="clock">
            <small>${moment(data.time).format('LT')}</small>
        </div>
    </div>
</div>
    `
    lTag.innerHTML = markUp;
    commentBox.prepend(lTag);
}
const broadcastComment = (data)=>{
    socket.emit('comment',data);
}
socket.on('comment',(data)=>{
    appendToDom(data);
})
textarea.addEventListener('keyup',(e)=>{
    socket.emit('typing',{ username });
})
let timerId = null;
function debounce(func,timer) {
    if (timerId) {
       clearTimeout(timerId); 
    }
    timerId = setTimeout(()=>{
        func()
    },timer)
}
socket.on('typing',(data)=>{
    typing.innerHTML = `${data.username} typing...`
    debounce(function() {
        typing.innerHTML = '';
    },1000)
})

const syncDB = async (data)=>{
    const res = await axios.post('/api/comment',data);
}

const getComment = async ()=>{
    const result = await axios.get('/api/getComment');
    const comments = result.data;
    comments.forEach(comment=>{
        comment.time = comment.createdAt;
        appendToDom(comment)
    })
}
window.onload = getComment;