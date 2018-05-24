
class App extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            server: 'http://localhost:3000',
            display:[true, false, false, false, false],
            ids: ['homePage', 'account', 'shipping', 'creditCard', 'complete'],
            fullData: {},
            displayData: [],

        }
    };

    handleClick(index, resultObj) {
        let output = Array(5).fill(false).map((e, i) => (i === (index + 1) % 5 ? true: false))
        let keys;
        let newFullData = this.state.fullData;
        if (!!resultObj) {
            keys = Object.keys(resultObj);
            for (var key of keys) {
                newFullData[key] = resultObj[key];
            }
        }

        this.setState({
            display: output,
            fullData: newFullData
        });

        if (index === 3) {
            //get url
            let url = '/complete';
            //get data
            let data = this.state.fullData;
            this.send(url, data);
        }
    };


    handleClickPre(index) {
        let output = Array(5).fill(false).map((e, i) => (i === (index - 1) ? true: false));
        this.setState({
            display: output
        });
    }

    send(form, data) {
        $.ajax({
            type: 'POST',
            url: this.state.server + form,
            data: JSON.stringify(data),
            contentType: "application/json",
            success: (data) => {
                this.fetch(form);
            },
            error: function(error) {
                console.error(error)
            }
        })
    };

    fetch(form) {
        $.ajax({
            type: 'GET',
            url: this.state.server + form,
            contentType: "application/json",
            success: (data) => {
                //display the data on the page
                var result = data.pop();
                this.displayData(result);
            },
            error: function(error) {
                console.error(error)
            }
        })
    }

    displayData(result) {
        let newArray = [];
        let keys = Object.keys(this.state.fullData);
        for (var key of keys) {
            newArray.push([key, result[key]])
        }

        this.setState({
            displayData: newArray
        })

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
                    account={this.state.account}
                    display={this.state.display[1]}
                    onClick={this.handleClick.bind(this)}
                    onClickPrev={this.handleClickPre.bind(this)}
                />
                <Shipping
                    shipping={this.state.shipping}
                    display={this.state.display[2]} 
                    onClick={this.handleClick.bind(this)}
                    onClickPrev={this.handleClickPre.bind(this)}
                />
                <CreditCard
                    card={this.state.card} 
                    display={this.state.display[3]} 
                    onClick={this.handleClick.bind(this)}
                    onClickPrev={this.handleClickPre.bind(this)}
                />
                <Complete
                    userdata={this.state.displayData}
                    display={this.state.display[4]} 
                    onClick={this.handleClick.bind(this)}
                    onClickPrev={this.handleClickPre.bind(this)}
                />
            </div>
        )
    }
};


class Account extends React.Component {
    //F1 collects name, email, and password for account creation.
    constructor(props) {
        super(props)
        this.state = {
            result: {name: '', email: '', password: ''},
        }
    }

    handleChange(e, key) {
        let newResult = this.state.result;
        newResult[key] = e.target.value;
        this.setState({
            result: newResult
        })
    }

    render() {
        return (
            <div id="account" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>User Account Info</h2>
                <form action="">
                    <div>
                        <label>Username: </label><br/>
                        <input 
                            type="text" id="name"
                            placeholder="please insert username..."
                            onChange={(event) => this.handleChange(event, 'name')}
                        />
                    </div>
                    <div>
                        <label>Email: </label><br/>
                        <input 
                            type="text" id="email" 
                            placeholder="please insert your email..."
                            onChange={(event) => this.handleChange(event, 'email')}
                        />
                    </div>
                    <div>
                        <label>Password: </label><br/>
                        <input 
                            type="password" id="password" 
                            placeholder="please insert password..."
                            onChange={(event) => this.handleChange(event, 'password')}
                        />
                    </div>
                    <button type='button' 
                        onClick={() => this.props.onClickPrev(1)}>
                        Prev
                    </button>
                    <button type='button'
                        onClick={() => this.props.onClick(1, this.state.result)}>
                        Next
                    </button>
                </form>
            </div>
        )
    }
};

class Shipping extends React.Component {
    //F2 collects ship to address (line 1, line 2, city, state, zip code) and phone number.
    constructor(props) {
        super(props)
        this.state = {
            result: {line1: '', line2: '', city: '', state: '', zipcode: '', phone: ''}
        }
    }

    handleChange(e, key) {
        let newResult = this.state.result;
        newResult[key] = e.target.value;
        this.setState({
            result: newResult
        })
    }

    render() {
        return (
            <div id="shipping" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>Shipping Info</h2>
                <form action="">
                    <div>
                        <label>Address: </label><br/>
                        <input type="text" id="line1" placeholder="Line1..."
                            onChange={(event) => this.handleChange(event, 'line1')}
                        /><br/>
                        <input type="text" id="line2" placeholder="Line2..."
                            onChange={(event) => this.handleChange(event, 'line2')}
                        /><br/>
                        <input type="text" id="city" placeholder="city..."
                            onChange={(event) => this.handleChange(event, 'city')}
                        /><br/>
                        <input type="text" id="state" placeholder="state..."
                            onChange={(event) => this.handleChange(event, 'state')}
                        /><br/>
                        <input type="text" id="zipcode" placeholder="zip code..."
                            onChange={(event) => this.handleChange(event, 'zipcode')}
                        /><br/>
                    </div>

                    <div>
                        <label>Phone Number: </label><br/>
                        <input type="text" id="phone" 
                            placeholder="please insert phone number..."
                            onChange={(event) => this.handleChange(event, 'phone')}
                        />
                    </div>
                    <button type='button' 
                        onClick={() => this.props.onClickPrev(2)}>
                        Prev
                    </button>
                    <button type='button' onClick={() => this.props.onClick(2, this.state.result)}>
                        Next
                    </button>
                </form>
            </div>
        )
    }
}

class CreditCard extends React.Component {
    //F3 collects credit card #, expiry date, CVV, and billing zip code.
    constructor(props) {
        super(props)
        this.state = {
            result: {cardNo: '', expiredate: '', cvv: '', billingZip: ''},
        }
    }

    handleChange(e, key) {
        let newResult = this.state.result;
        newResult[key] = e.target.value;
        this.setState({
            result: newResult
        })
    }

    render() {
        return (
            <div id="creditCard" style={{display:(this.props.display? 'block': 'none')}}>
                <h2>Credit Card Info</h2>
                <form action="">
                    <div>
                        <label>Credit Card#: </label><br/>
                        <input 
                            type="text" id="cardNo" 
                            placeholder="please insert credit card number..."
                            onChange={(event) => this.handleChange(event, 'cardNo')}
                        />
                    </div>
                    <div>
                        <label>Expiry Date: </label><br/>
                        <input 
                            type="text" id="expiredate" 
                            placeholder="please insert expiry data..."
                            onChange={(event) => this.handleChange(event, 'expiredate')}
                        />
                    </div>
                    <div>
                        <label>CVV: </label><br/>
                        <input 
                            type="text" id="cvv" 
                            placeholder="please insert CVV..."
                            onChange={(event) => this.handleChange(event, 'cvv')}
                        />
                    </div>
                    <div>
                        <label>Billing Zip Code: </label><br/>
                        <input 
                            type="text" id="billingZip" 
                            placeholder="please insert billing zip code..."
                            onChange={(event) => this.handleChange(event, 'billingZip')}
                        />
                    </div>
                    <button type='button' 
                        onClick={() => this.props.onClickPrev(3)}>
                        Prev
                    </button>
                    <button type='button' onClick={() => this.props.onClick(3, this.state.result)}>Next</button>
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
                    <dl>
                    {this.props.userdata.map((pair) => <DisplayData pair={pair} key={pair[0]}/>)}
                    </dl>
                    <button type='button' 
                        onClick={() => this.props.onClickPrev(4)}>
                        Prev
                    </button>
                    <button type='button' onClick={() => this.props.onClick(4)}>Purchase</button>
                </form>
            </div>
        )
    }
}

class DisplayData extends React.Component {
    // account: {name: '', email: '', password: ''},
    // shipping: {line1: '', line2: '', city: '', state: '', zipcode: '', phone: ''},
    // card: {cardNo: '', expiredate: '', cvv: '', billingZip: ''}
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <dt>{this.props.pair[0]}:</dt>
                <dd>{this.props.pair[1]}</dd>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('app'));