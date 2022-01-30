import React from "react";

import { Table } from "react-bootstrap";
import DaoCreationService from '../services/daoCreation.js';
import LaunchDaoPage from "./Launchdao.js";



class AllDaoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selectedContract: 'none'
        };

        
    }

    componentDidMount() {      
        debugger;
        DaoCreationService.getAllDaosWithMetadata().then(d => this.setState({
            items: d,
            isLoaded: true
        }));


       // this.setState({selectedContract: d[0].dao.contractAddress})

    }

    render() {
        const { error, isLoaded, items, selectedContract } = this.state;



        const gotoContractData = (e) => {
            debugger;
            this.setState({ selectedContract: e.target.innerText });

        }



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
                                <th>Contract Address</th>
                                <th>Name</th>
                                <th>Owner Address</th>
                                <th>Symbol</th>
                                <th>Description</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                items.map(item =>
                                (

                                    <tr key={item.dao.id}>
                                        <td></td>
                                        <td><a onClick={gotoContractData}>{item.dao.contractAddress}</a></td>
                                        <td>{item.meta[0]}</td>
                                        <td>{item.dao.owner}</td>
                                        <td>{item.meta[1]}</td>
                                        <td>{item.meta[2]}</td>
                                        <td>{item.meta[3].substring(0, item.meta[3].length - 18)}</td>
                                    </tr>

                                )
                                )
                            }
                        </tbody>
                    </Table>

                    <LaunchDaoPage key={selectedContract} contractAddress={selectedContract} />


                </div>

            );
        }
    }





}



export default AllDaoPage;