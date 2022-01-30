import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Table} from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

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

        const lbl =  items.map(item => item.address);
        const dsBal = items.map(item => item.balance);

        const data = {
            labels: lbl,
            datasets: [
                {
                    label: '# of Votes',
                    data: dsBal,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Table striped condensed hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Address</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                items.map(item => 
                                    (
                                    
                                        <tr key={item.block_height}>
                                            <td></td>
                                            <td>{item.address}</td>
                                            <td>{item.balance}</td>
                                        </tr>
    
                                    )
                                )
                            }
                        </tbody>
                    </Table>

                    <Doughnut data={data} />

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