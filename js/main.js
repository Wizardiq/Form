var form = document.querySelector(".main-form");
var previousValueRange = 1;
var filesContainer = document.getElementById('files-block');
var downloadedFiles = [];
var stopBlock = document.querySelector(".upload__about");
var isNumberForm = document.querySelector(".order-form__number");

function returnFileSize(fileSize) {
    if (fileSize < 1024) {
        return fileSize + 'bytes';
    } else if (fileSize > 1024 && fileSize < 1048576) {
        return (fileSize / 1024).toFixed(1) + 'kb';
    } else if (fileSize > 1048576) {
        return (fileSize / 1048576).toFixed(1) + 'mb';
    }
};

function renderFilesList() {
    filesContainer.innerHTML = '';

    var resultFilesDivContent = '';
    
    for (var z = 0; z < downloadedFiles.length; z++) {
        var name = downloadedFiles[z].name;
        var size = returnFileSize(downloadedFiles[z].size);
        var number = '1,220';

        resultFilesDivContent += `
        <div class="info-items">
            <div class="info-items__child"><i class="fa fa-file" aria-hidden="true"></i><span class="file__name">${name}</span></div>
            <div class="info-items__child">${size}</div>
            <div class="info-items__child">${number}</div>
            <div class="info-items__child"><i class="fa fa-trash fa-lg  remove-file" data-file-name="${name}" aria-hidden="true"></i></div>
        </div>
        `;
    }

    filesContainer.innerHTML = resultFilesDivContent;
}

function filesChangeHandler(files) {
    var filesArray = [];
    Array.prototype.push.apply(filesArray, files);

    for (var i = 0; i < downloadedFiles.length; i++) {
        var file = downloadedFiles[i];

        for (var k = 0; k < filesArray.length; k++) {
            var fileInInput = filesArray[k];
            if (file.name === fileInInput.name) {
                filesArray.splice(k, 1);
                k -= 1;
            }
        }
    }    
    if (downloadedFiles.length + filesArray.length >= 10) {
        stopBlock.innerHTML = "No more than 10 files!";

        return;
    }
    downloadedFiles = downloadedFiles.concat(filesArray);

    renderFilesList();
};


filesContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-file')) {
        var nameFileToRemove = event.target.getAttribute('data-file-name');

        for (var i = 0; i < downloadedFiles.length; i++) {
            if (downloadedFiles[i].name === nameFileToRemove) {
                downloadedFiles.splice(i, 1);
                break;
            }
        }

        renderFilesList();
    }
});

function inputRangeHandler(value){
    var currentDiv = document.querySelector(`[range-value="${value}"]`);
    currentDiv.classList.toggle('timeline__info_hidden');

    var previousDiv = document.querySelector(`[range-value="${previousValueRange}"]`);
    previousDiv.classList.add('timeline__info_hidden');
    previousValueRange = value;
}

isNumberForm.addEventListener("input", function(event){
    var target = event.target, position = target.selectionEnd, length = target.value.length;
    target.value = target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);
});


form.addEventListener('change', function (event) {
    var isFileInput = event.target.classList.contains("upload__input");
    var isRangeInput = event.target.classList.contains("timeline__input");

    if (isFileInput) {
        filesChangeHandler(event.target.files);
    }

    if (isRangeInput) {
        inputRangeHandler(event.target.value);
    };
});