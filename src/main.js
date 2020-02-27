import api from './api';

class App {
    constructor(){
        this.repositories = [];

        this.inpputEl = document.querySelector('input[name=repository]');
        this.formEl = document.querySelector('#repo-form');
        this.listEl = document.querySelector('#repo-list');
        
        this.registerHandlers();
    }

    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    async addRepository(){
        event.preventDefault();

        const repoInput = this.inpputEl.value;
        
        if(repoInput.length === 0)
            return;

        const response = await api.get(`/repos/${repoInput}`);
        
        const{name, description, html_url, owner: {avatar_url}} = response.data;
        
        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        });

        this.render();
        
    }

    render(){
        this.listEl.innerHTML = '';
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));
            
            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', 'blank');
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode('Acessar Repositório'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);
            
            this.listEl.appendChild(listItemEl);
        })
    }
}

new App();