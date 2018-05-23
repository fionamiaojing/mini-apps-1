
class App extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            server: 'http://localhost:3000',
            display:[true, false, false, false, false],
            ids: ['homePage', 'account', 'shipping', 'creditCard', 'complete'],

        }
    };

    handleClick(index) {
        let output = Array(5).fill(false).map((e, i) => (i === (index + 1) % 5 ? true: false))
        this.setState({
            display: output
        });
        //if in form1/2/3, post data:
        if ([1,2,3].includes(index)) {
            //get url
            let url = '/' + this.state.ids[index];
            //get data
            let data = this.collectData(index)
            this.send(url, data);
        }

        if (index === 3) {
            this.fetch();
        }
    };

    collectData(index) {
        const dataFormat = {
            1 : {name: '', email: '', password: ''},
            2 : {line1: '', line2: '', city: '', state: '', zipcode: '', phone: ''},
            3 : {cardNo: '', expiredate: '', cvv: '', billingZip: ''}
        }

        let data = dataFormat[Number(index)];
        let keys = Object.keys(data);
        for (var key of keys) {
            let input = $('#' + key).val();
            data[key] = input;
        }

        return data
    }

    send(form, data) {
        $.ajax({
            type: 'POST',
            url: this.state.server + form,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.error(error)
            }
        })
    }

    fetch() {
        $.ajax({
            type: 'GET',
            url: this.state.server + '/complete',
            // contentType: "application/json",
            success: function(data) {
                //display the data on the page
                this.displayData(data);
                $('#displayAllInfo').append('hello');
            },
            error: function(error) {
                console.error(error)
            }
        })
    }

    displayData(dataArray) {
        let latestData = dataArray.slice(dataArray.length - 3);
        
        for (var data of latestData) {

        }
    }

    createTag(input) {
        return $("<div>" + input + "</div>");
    }

    render() {
        return (
            <div>
                <h1>Checkout App</h1>
                <div id="homePage" style={{display:(this.state.display[0]? 'block': 'none')}}>
                    <h2>Home</h2>
                    <button type='button' onClick={() => this.handleClick(0)}>Checkout</button>
                </div>
                <Account
                    display={this.state.display[1]}
                    onClick={this.handleClick.bind(this)}
                />
                <Shipping display={this.state.display[2]} onClick={this.handleClick.bind(this)}/>
                <CreditCard display={this.state.display[3]} onClick={this.handleClick.bind(this)}/>
                <Complete server={this.state.server} display={this.state.display[4]} onClick={this.handleClick.bind(this)}/>
                
            </div>
        )
    }
};


class Account extends React.Component {
    //F1 collects name, email, and password for account creation.
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="account" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>User Account Info</h2>
                <form action="">
                    <div>
                        <label>Username: </label><br/>
                        <input type="text" id="name" placeholder="please insert username..."/>
                    </div>
                    <div>
                        <label>Email: </label><br/>
                        <input type="text" id="email" placeholder="please insert your email..."/>
                    </div>
                    <div>
                        <label>Password: </label><br/>
                        <input type="password" id="password" placeholder="please insert password..."/>
                    </div>
                    <button type='button' onClick={() => this.props.onClick(1)}>Next</button>
                </form>
            </div>
        )
    }
};

class Shipping extends React.Component {
    //F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="shipping" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>Shipping Info</h2>
                <form action="">
                    <div>
                        <label>Address: </label><br/>
                        <input type="text" id="line1" placeholder="Line1..."/><br/>
                        <input type="text" id="line2" placeholder="Line2..."/><br/>
                        <input type="text" id="city" placeholder="city..."/><br/>
                        <input type="text" id="state" placeholder="state..."/><br/>
                        <input type="text" id="zipcode" placeholder="zip code..."/><br/>
                    </div>

                    <div>
                        <label>Phone Number: </label><br/>
                        <input type="text" id="phone" placeholder="please insert phone number..."/>
                    </div>
                    <button type='button' onClick={() => this.props.onClick(2)}>Next</button>
                </form>
            </div>
        )
    }
}

class CreditCard extends React.Component {
    //F3 collects credit card #, expiry date, CVV, and billing zip code.
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="creditCard" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>Credit Card Info</h2>
                <form action="">
                    <div>
                        <label>Credit Card#: </label><br/>
                        <input type="text" id="cardNo" placeholder="please insert credit card number..."/>
                    </div>
                    <div>
                        <label>Expiry Date: </label><br/>
                        <input type="text" id="expiredate" placeholder="please insert expiry data..."/>
                    </div>
                    <div>
                        <label>CVV: </label><br/>
                        <input type="text" id="cvv" placeholder="please insert CVV..."/>
                    </div>
                    <div>
                        <label>Billing Zip Code: </label><br/>
                        <input type="text" id="billingZip" placeholder="please insert billing zip code..."/>
                    </div>
                    <button type='button' onClick={() => this.props.onClick(3)}>Next</button>
                </form>
            </div>
        )
    }
}

class Complete extends React.Component {
    //F3 collects credit card #, expiry date, CVV, and billing zip code.
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="complete" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>Confirm Purchase</h2>
                <form action="">
                    <DisplayData />
                    <button type='button' onClick={() => this.props.onClick(4)}>Purchase</button>
                </form>
            </div>
        )
    }
}

class DisplayData extends React.Component {
    constructor(props) {
        super(props)
    }

    return () {
        
    }
}


ReactDOM.render(<App />, document.getElementById('app'));