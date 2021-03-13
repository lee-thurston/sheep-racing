import React from 'react';
import './App.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Racer } from './racer';

interface RacerTableProps {
    racers: Racer[];
}

interface RacerTableState {
}

export class RacerTable extends React.Component<RacerTableProps, RacerTableState> {
    render() {
        return (
            <div>
                <Table responsive="xl" variant='dark' striped={true} bordered={true}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th className='hover'>Name</th>
                        <th className='hover'>Twitch Id</th>
                        <th className='hover'>Rating</th>
                        <th className='hover'>Safety rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.racers.map(racer => {
                                return (
                                    <tr key={racer.id}> 
                                    <td>{this.props.racers.indexOf(racer) + 1}</td>
                                    <td>{racer.name}</td>
                                    <td className={racer.twitchId ? 'blue' : ''} onClick={()=> {
                                        if (racer.twitchId) {
                                            window.open(`http://twitch.tv/${racer.twitchId}`, "_blank")}
                                        }
                                    }
                                    >{racer.twitchId}</td>
                                    <td>{racer.ratingMu.toFixed(2)}</td>
                                    <td>{racer.safetyRating}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
  }