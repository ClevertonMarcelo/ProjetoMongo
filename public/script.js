$(function () {
    $('#btnListar').on('click', function () {
        $.ajax({
            url: '/api/animal',
            success: function (animal) {
                let tbody = $('tbody');
                tbody.html('');
                animal.data.animal.forEach(animal => {
                    //inserir = "<tr> <td>" + animal.nome + "</td> <td>" + animal.ingredientes + "</td><td>" + animal.preparo + "</td></tr>";
                    //tbody.append(inserir);
                    tbody.append(`<tr> <td> ${animal.nome} </td> <td> ${animal.nomeDoProprietario} </td><td> ${animal.endereco} </td><td>${animal.tipo} </td><td>${animal.raca} </td><td>${animal.imagem} </td></tr>`)
                });
            }
        })
    })
    $('#formAnimal').on('submit', (e) => {
        e.preventDefault();
        let nomeAnimal = $('#nomeAnimal');
        let nomeDoProprietario = $('#nomeDoProprietario');
        let endereco = $('#endereco');
        let tipo = $('#tipo');
        let raca = $('#raca');
        let imagem = $('#imagem');
        $.ajax({
            url: 'api/animal',
            method: 'POST',
            data: {
                nome: nomeAnimal.val(),
                nomeDoProprietario: nomeDoProprietario.val(),
                endereco: endereco.val(),
                tipo: tipo.val(),
                raca: raca.val(),
                imagem: imagem.val()
            },
            success: function (response) {
                nomeAnimal.val('');
                nomeDoProprietario.val('');
                endereco.val('');
                tipo.val('');
                raca.val('');
                imagem.val('');
                $('#btnListar').click();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
})