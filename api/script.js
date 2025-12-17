const chat      = document.getElementById('my-chat');
const body      = chat.querySelector('.chat-body');
const input     = document.getElementById('chat-input');
const sendBtn   = document.getElementById('chat-send');
const toggleBtn = document.getElementById('chat-toggle');
const closeBtn  = document.getElementById('chat-close');

toggleBtn.onclick = () => chat.classList.remove('closed');
closeBtn.onclick  = () => chat.classList.add('closed');

sendBtn.onclick = () => send();
input.onkeyup   = e => { if (e.key === 'Enter') send(); };

function send(){
  const text = input.value.trim();
  if (!text) return;
  append(text,'user');
  input.value='';
  fetch('/api/openai',{
     method:'POST',
     headers:{'Content-Type':'application/json'},
     body:JSON.stringify({message:text})
  })
  .then(r=>r.json())
  .then(d => append(d.reply,'bot'))
  .catch(() => append('Fel – kunde inte nå servern','bot'));
}

function append(txt,sender){
  const div = document.createElement('div');
  div.className = 'msg '+sender;
  div.textContent = txt;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}
