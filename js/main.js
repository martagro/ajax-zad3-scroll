function ajax(method, url) {
    //utworzenie obiektu HMLHttpRequest
    var httpReq = new XMLHttpRequest();

    //otwieramy połączenie z serwerem za pomocą httpReq
    httpReq.open(method, url);

    //status połączenia
    // 0: połączenie nienawiązane
    // 1: połączenie nawiązane
    // 2: połączenie odebrane
    // 3: przetwarzanie żądania
    // 4: dane zwrócone i gotowe do użycia

    httpReq.onreadystatechange = function () {
        //jeśli 4: dane zwrócone i gotowe
        if (httpReq.readyState == 4) {
            //sprawdź kod statusu połącznia, jeśli 200, działaj
            if (httpReq.status == 200) {

                //responseText - zwrócone dane w formacie tekstowym
                var returnData = httpReq.responseText;

                httpReq.onsuccess(returnData); // wywołanie odniesienie do funkcji, która parsuje tekst do jsona; dane zostaną zwrócone jako json

                //zeruj obiekt, aby nie utrzymywać połączenia z serwerem
                httpReq = null;
            }
        }
    }

    httpReq.onerror = function (response) {
        console.log('error');
    }

    //zamienia odpowiedź tekstową serwera na json; trzeba plik tekstowy sparsować do jsona
    httpReq.onsuccess = function (response) {
        var jsonObj = JSON.parse(response);
        //console.log(jsonObj);



        //jsonObj.forEach(function (element, index) { //uzupełnić
        //console.log(jsonObj[index].id);
        //console.log(jsonObj[index].username);
        //console.log(jsonObj[index].website);
        //});



        var beginOfData = document.createElement('p');
        var endOfData = document.createElement('p');

        beginOfData.innerHTML = '<br>---------- BEGIN OF DATA ----------<br>';
        endOfData.innerHTML = '<br>---------- END OF DATA ----------<br>';

        document.body.appendChild(beginOfData);

        for (var i in jasonObj) {
            var userID = document.createElement('p');
            var userName = document.createElement('p');
            var userWebsite = document.createElement('p');

            userID.innerHTML = jsonObj[i].id;
            userName.innerHTML = jsonObj[i].username;
            userWebsite.innerHTML = jsonObj[i].website;

            document.body.appendChild(userID);
            document.body.appendChild(userName);
            document.body.appendChild(userWebsite);
        }

        document.body.appendChild(endOfData);
    }

    //wysyłanie żądania do serwera
    httpReq.send();
}





window.addEventListener('scroll', function () {
    doKonsoli();
});

function doKonsoli() {

    if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        ajax('GET', 'https://jsonplaceholder.typicode.com/users');
    }

}
