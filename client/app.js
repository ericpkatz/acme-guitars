const ul = document.querySelector('ul');
const pre = document.querySelector('pre');
const form = document.querySelector('form');
let guitars;

const fetchGuitars = async()=> {
  const response = await fetch('/api/guitars');
  guitars = await response.json();
  renderGuitars(guitars);
}

const renderGuitars = (guitars)=> {
  const id = window.location.hash.slice(1);
  const html = guitars.map( guitar => {
    return `
      <li class='${ id === guitar.id ? 'selected': ''}'>
        <a href='#${guitar.id}'>
          ${ guitar.name }
        </a>
        (${ guitar.ranking })
        <button data-id='${guitar.id}'>x</button>
        <button data-id='${guitar.id}'>+</button>
      </li>
    `;
  }).join('');
  ul.innerHTML = html;
  const guitar = guitars.find(guitar => guitar.id === id);
  if(guitar){
    pre.innerText = JSON.stringify(guitar, null, 2);
  }
  else {
    pre.innerText = '';
  }
};

fetchGuitars();


window.addEventListener('hashchange', ()=> {
  renderGuitars(guitars);
});

form.addEventListener('submit', async(ev)=> {
  ev.preventDefault();
  const name = document.querySelector('input').value;
  const response = await fetch('/api/guitars', {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if(response.ok){
    const guitar = await response.json();
    guitars.push(guitar);
    renderGuitars(guitars);
    window.location.hash = guitar.id;
  }
  else {
    console.log('there was an error');
  }
});

ul.addEventListener('click', async(ev)=> {
  const target = ev.target;
  if(target.tagName === 'BUTTON'){
    if(target.innerText === 'x'){
      const id = target.getAttribute('data-id');
      await fetch(`/api/guitars/${id}`, {
        method: 'DELETE'
      });
      guitars = guitars.filter(guitar => guitar.id !== id);
      renderGuitars(guitars);
    }
    if(target.innerText === '+'){
      const id = target.getAttribute('data-id');
      let guitar = guitars.find(guitar => guitar.id === id);
      const response = await fetch(`/api/guitars/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ ranking: guitar.ranking + 1}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      guitar = await response.json();
      guitars = guitars.map(g => {
        if(g.id === guitar.id){
          return guitar;
        }
        return g;
      });
      renderGuitars(guitars);
      /*
      await fetch(`/api/guitars/${id}`, {
        method: 'DELETE'
      });
      guitars = guitars.filter(guitar => guitar.id !== id);
      renderGuitars(guitars);
      */
    }
  }
});
