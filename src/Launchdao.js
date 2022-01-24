import React from "react";

class LaunchDaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {



        this.retryApiGetCall();
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <ul>
                        {items.map(item => (
                            <li key={item.block_height}>
                                {item.address} {item.balance}
                            </li>
                        ))}
                    </ul>
                    <button className='btn btn-secondary' onClick={this.retryApiGetCall} >Retry</button>
                </div>

            );
        }
    }

    retryApiGetCall() {
        const url = "https://api.covalenthq.com/v1/80001/tokens/" + window.dao.tokenAddress + "/token_holders/?key=ckey_2f38a4ccc6874bd787a84037982";
        const me = this;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    debugger;
                    me.setState({
                        isLoaded: true,
                        items: result.data.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    debugger;
                    me.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
}

// function LaunchDaoPage() {
//     return (<h1>
//         this the page for launch dao
//     </h1>);
// }

export default LaunchDaoPage;