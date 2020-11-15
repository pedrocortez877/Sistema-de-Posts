Posts = {
    add : ()=>{
        var t = {}
        t.content = $("#content").val()
        t.firstname = $("#firstname").val()
        t.lastname = $("#lastname").val()

        $.ajax({
            type: 'POST',
            url: '/post',
            data: t,
            dataType: 'json',
            success: Posts.template
        })

        return false
    },
    template : (data)=>{
        var comment = $('<div></div>')
            .attr('id', 'comment-' + data.id)
            .attr('class', 'comment');

        var content = $('<textarea></textarea>')
            .attr('class', 'content')
            .attr('disabled', true)
            .html(data.content);

        var user = $('<p></p>')
            .attr('class', 'user')
            .html('Por ' + data.user.firstname + ' ' + data.user.lastname + ' ');

        var dtCreation = new Date(data.createdAt);
        dtCreation = (dtCreation.getDate()<10 ? "0" + dtCreation.getDate(): dtCreation.getDate())+
        "/" + ((dtCreation.getMonth()+1)< 10 ? "0" + (dtCreation.getMonth()+1):  (dtCreation.getMonth()+1))+
        "/" + dtCreation.getFullYear();

        var date = $('<span></span>')
            .attr('class', 'date')
            .html(dtCreation);

        var btnEdit  = $('<button></button>')
            .attr('class', 'edit btn2 btn--radius btn--blue')
            .html('Editar');
        
        var btnSave  = $('<button></button>')
        .attr('class', 'save hidden btn2 btn--radius btn--blue')
        .html('Salvar');

        var btnRemove  = $('<button></button>')
        .attr('class', 'remove btn2 btn--radius btn--red')
        .html('Remover');

        $(btnEdit).on('click', (event) => {
            Posts.enableEdit(event.target); 
        });

        $(btnSave).on('click', (event) => {
            Posts.update(event.target); 
        });

        $(btnRemove).on('click', (event) => {
            Posts.remove(event.target); 
        });

        $(user).append(date);

        $(comment).append(content);
        $(comment).append(user);
        $(comment).append(btnEdit);
        $(comment).append(btnSave);
        $(comment).append(btnRemove);

        $("#comments").append(comment);
    },

    findAll : () => {

        $.ajax({
            type: "GET",
            url: "/posts",
            success : (data) => {
                for(var post of data){
                    Posts.template(post);
                }
            },
            error: () => {
                console.log("Ocorreu um erro");
            },
            dataType: 'json'
        })
    },

    enableEdit : (button) => {
        var comment = $(button).parent();

        $(comment).children('textarea').prop('disabled', false);
        $(comment).children('button.edit').hide();
        $(comment).children('button.save').show();
    },

    update: (button) => {
        var comment = $(button).parent();
        
        var id = $(comment).attr('id').replace('comment-', '');
        var content = $(comment).children('textarea').val();

        $.ajax({
            type: "PUT",
            url: "/post",
            data: {'content': content, 'id': id},
            success : (data) => {
                $(comment).children('textarea').prop('disabled', true);
                $(comment).children('button.edit').show();
                $(comment).children('button.save').hide();
            },
            error: () => {
                console.log("Ocorreu um erro");
            },
            dataType: 'json'
        })
    },

    remove: (button) => {
        var comment = $(button).parent();
        
        var id = $(comment).attr('id').replace('comment-', '');

        $.ajax({
            type: "DELETE",
            url: "/post",
            data: {'id': id},
            success : (data) => {
                $(comment).remove();
            },
            error: () => {
                console.log("Ocorreu um erro");
            },
            dataType: 'json'
        })
    },

    limpaCampo: () => {
        let comments = $('#comments')[0]
        
        while (comments.firstChild) {
          comments.removeChild(comments.firstChild);
        }
    },

    buscaComentarios: () => {
        var areaSearch = $("#buscaTexto").val();

        $.ajax({
            type: 'POST',
            url: '/posts/search',
            dataType: 'json',
            data: {'content': areaSearch},
            success: data => {
                Posts.limpaCampo();
                data.forEach(element => Posts.template(element));
            },
            error: () => {
              console.log('Ocorreu um erro!');
            }
          })
    }
}

$(document).ready(() => {
    Posts.findAll();
});