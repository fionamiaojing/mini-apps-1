class App {
    
    constructor() {
        this.server = 'http://localhost:8000/';
    };
    
    init() {
        //this.fecth();
        //submit button add event listener
        $('#send').on('click', () => {
            event.preventDefault();
            this.handleSubmit();
        })
        //filter button add event listener
        $('#filter').on('click', () => {
            let data = {filter: []};
            data.filter.push($('#filterArea').val());
            this.delete(data);
        })
    }

    fecth() {
        $.ajax({
            type: "GET",
            url: this.server + 'messages',
            contentType: 'application/json',
            success: (data) => {
                $('#outputArea').html(data);
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    handleSubmit() {
        //depends on if the input contains ';' at the end;
        var inputData = $('#inputArea').val().slice(0, -1);
        this.send(inputData);
    }

    send(data) {
        $.ajax({
            type: "POST",
            url: this.server + 'messages',
            data: data,
            contentType: 'application/json',
            success: () => {
                console.log('data sent')
                this.fecth();
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    delete(data) {
        $.ajax({
            type: "DELETE",
            url: this.server + 'messages',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: () => {
                console.log('data deleted')
                this.fecth();
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

}

let myapp = new App();

myapp.init();