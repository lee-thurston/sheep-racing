import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Modal, Form, Button, Table } from 'react-bootstrap';
import { Racer } from './racer';
import * as racerService from './services/racerService';

interface CreateRaceModalProps {
    racers: Racer[];
    handleSaveRace: (racer: string[]) => void;
}

interface CreateRaceModalState {
    createModalShowing: boolean;
    racers: Racer[];
    racerPositions: string[];
}


export class CreateRaceModal extends React.Component<CreateRaceModalProps, CreateRaceModalState> {

    async loadRacers() {
        const racers = await racerService.loadRacersApi(); 
        this.setState({racers});
    }

    componentWillMount() {
        this.setState({createModalShowing: false, racerPositions: [], racers: []})
    }

    handleClose() {
        this.setState({createModalShowing: false, racerPositions: [], racers: []})
    }

    handleShow() {
        this.loadRacers();
        this.setState({createModalShowing: true})
    }

    onRacerSelect(event: any) {
        const value = event.currentTarget.value;
        this.setState({
            racerPositions: [...this.state.racerPositions, value]
        });
        
    }

    handleSave () {
        this.props.handleSaveRace(this.state.racerPositions)
        this.setState({createModalShowing: false})
    }

    removeRacer (index: number) {
        const racers = [...this.state.racers];
        const positions = [...this.state.racerPositions];
        positions.splice(index, 1);
        this.setState({racerPositions: positions, racers});
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={() => this.handleShow()}>
                    Create race
                </Button>
                <Modal show={this.state.createModalShowing} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create race</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicName">
                        <Form.Control value={-1} placeholder='racer' onChange={(event: any) => this.onRacerSelect(event)} as="select">
                            <option disabled={true} value={-1}></option>
                             {this.state.racers.map(racer => {
                                if (!this.state.racerPositions.includes(racer.name)) {
                                    return <option>{racer.name}</option>
                                }
                                return undefined;
                                })}
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicTwitch">
                        <Table responsive="xl" variant='dark' striped={true} bordered={true}>
                            <thead>
                                <tr>
                                <th className='hover'>Postion</th>
                                <th className='hover'>Name</th>
                                <th/>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.racerPositions.map((racer,index) => {
                                        return (
                                            <tr>
                                            <td>{this.state.racerPositions.indexOf(racer) + 1}</td>
                                            <td>{racer}</td>
                                            <td onClick={() => this.removeRacer(index)}>remove</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleSave()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
  }