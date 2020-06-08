class Folder {
	constructor (folder){
		this.folder = folder.querySelector('ul');
		this.name = folder.querySelector('span').innerText;
		folder.querySelector('span').addEventListener('click', this.clickOnFolder);
        this.innerFolders = {};
		this.innerFiles = {};
		if (!this.folder)
            return;
		for (let i of this.folder.children){
			if (!i.classList.contains('file')) {
               let is = i.querySelector('span').innerText;
                this.innerFolders[is] = new Folder(i);
            } 
			else {
                let is = i.querySelector('span').innerText;
                this.innerFiles[is] = i
            }   
		}
	}
	clickOnFolder(event){
        let control = event.target.parentNode.querySelector('ul');
		if (!control)
		return;
		control.classList.toggle('closed');
		for (let i of control.querySelectorAll('.folder'))
		{
			i.querySelector('ul').classList.add('closed');
		}
	}
	addFile(fileName) {
        if (this.innerFiles[fileName])
            return;
        let newFile = document.createElement('li');
        newFile.innerHTML = `<span>${fileName}</span>`;
        newFile.classList.add('file');
        this.folder.append(newFile);
        this.innerFiles[fileName] = newFile;
    }

    addFolder(name) {
        if (this.innerFolders[name])
            return;

        let newFolder = document.createElement('li');
        newFolder.classList.add('folder');
        newFolder.innerHTML = `<span>${name}</span><ul></ul>`;
        this.folder.append(newFolder);
        this.innerFolders[name] = new Folder(newFolder);
    }
}

function clickOnButton(head){
	
	const input = document.querySelector('input');
	if (!input.value || input.value.length === 0){
		console.log('error');
		return;	
	}
	let slash = input.value.split('/');
	 if (slash.length < 3 || head.name !== slash[1])
        return;
	if (head.name !== slash[1]){
		console.log('error huinya');
	return;
	}
	const fileName = slash.slice(length - 1)[0];
	slash = slash.slice(1, length - 1);
    let currentFolder = head;
    for (let i = 0; i < slash.length - 1; i++) {
        if (currentFolder.name !== slash[i])
            return;

        if (!currentFolder.innerFolders[slash[i + 1]]) {
            
            currentFolder.addFolder(slash[i + 1]);
            currentFolder = currentFolder.innerFolders[slash[i + 1]];
            
        } else {
            currentFolder = currentFolder.innerFolders[slash[i + 1]]
        }
    }
	if (fileName.includes('.'))
		currentFolder.addFile(fileName);
	else if ((slash.length < 2 || head.name !== slash[0]))
	{
		console.log(slash[0]);
	currentFolder.addFolder(fileName);}
}

let head = new Folder(document.querySelector('.root'));
document.querySelector('button').addEventListener('click', clickOnButton.bind(null,head));
