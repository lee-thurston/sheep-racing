import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {Tabs, Tab, Button, Modal, Form} from 'react-bootstrap'
import { RacerTable } from './racerTable';
import { verify } from './verifyJWT';
import { connect, Dispatch } from 'react-redux'
import { RootState } from './reducers';
import { createSetUserAction } from './actions/setUser.action';
import { getCurrentUser, getAuthorisedUsers } from './selectors/currentUser.selector';
import { createSetAuthorisedUserAction } from './actions/setAuthorisedUser.action';
import * as UserService from './services/userService';
import * as racerService from './services/racerService';
import * as raceService from './services/raceService';

import { Racer } from './racer';
import './SheepRacing.css';
import { CreateRaceModal } from './createRaceModal';

interface SheepRacingDispatchProps {
    setUser: (user: string) => void;
    setAuthorisedUsers: (users: string[]) => void;
}

interface SheepRacingInjectedProps {
    currentUser: string,
    authorisedUsers: string[]
}

type SheepRacingProps = SheepRacingDispatchProps & SheepRacingInjectedProps;

interface SheepRacingState {
    createModalShowing: boolean;
    newUserName: string;
    racers: Racer[];
}

export class SheepRacingUnconnected extends React.Component<SheepRacingProps, SheepRacingState> {

    async getAuthorisedUsers() {
        await UserService.loadUsersApi().then(users => {
            this.props.setAuthorisedUsers(users);
        })
    }

    async loadRacers() {
        const racers = await racerService.loadRacersApi(); 
        this.setState({racers});
    }

    componentWillMount() {
        this.loadRacers();
        this.setState({createModalShowing: false, newUserName: '', racers: []})
        this.getAuthorisedUsers();
        const hash = document.location.hash;
        if (hash && hash.includes('id_token'))
        {
            const jwt = hash.split('id_token=',)[1].split('&scope=')[0];
            verify(jwt, this.props.setUser)
        }
    }

    handleClose() {
        this.setState({createModalShowing: false})
    }

    
    handleShow() {
        this.setState({createModalShowing: true})
    }

    handleSave() {
        racerService.addRacerApi({name: this.state.newUserName, twitchId: this.props.currentUser, ratingMu: 25, ratingSigma: 25/3, safetyRating: -1}).then(result => {
            this.setState({createModalShowing: false});
            this.loadRacers();
        })
    }

    handleSaveRace(racers: string[]) {
        raceService.addRaceApi(racers).then(result => {})
    }

    onNameChange(event: any) {
        if (event.currentTarget.value.length < 30) {
            this.setState({...this.state, newUserName: event.currentTarget.value})
        }
    }
    
    render() {
        return (
            <div>
                { !this.props.currentUser ?
                    <Button
                    className='btn-twitch'
                    href='https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=y8xve6lm2qjgnmu1gekkiqkzhblz23&redirect&redirect_uri=http://www.sheep-racing.co.uk&scope=openid&claims={"id_token":{"preferred-username": null}}'>
                        <i className="fab fa-twitch"></i>
                        {" Login with twitch"}
                    </Button>
                    :
                    <Button variant="primary" onClick={() => this.handleShow()}>
                        Create racer
                    </Button>
                }
                <Modal show={this.state.createModalShowing} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create racer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="email" placeholder="Enter name" onChange={(event) => this.onNameChange(event)} value={this.state.newUserName} />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicTwitch">
                                <Form.Label>Twitch username</Form.Label>
                                <Form.Control disabled={true} value={this.props.currentUser} />
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
                <Tabs defaultActiveKey="racers" id="uncontrolled-tab-example">
                    <Tab onEnter={() => this.loadRacers()} eventKey="racers" title="Racers">
                        <RacerTable
                            racers={this.state.racers}
                        />
                    </Tab>
                    <Tab eventKey="admin" title="Admin" disabled={/*!this.props.authorisedUsers.includes(this.props.currentUser)*/false}>
                        <CreateRaceModal racers={this.state.racers} handleSaveRace={this.handleSaveRace}/>
                    </Tab>
                </Tabs>
        </div>
        )
    }
  }

  
function mapDispatchToProps(dispatch: Dispatch<RootState>): SheepRacingDispatchProps {
    return {
        setUser: (user) => dispatch(createSetUserAction(user)),
        setAuthorisedUsers: (users) => dispatch(createSetAuthorisedUserAction(users))
    }
}

  
function mapStateToProps(state: RootState): SheepRacingInjectedProps {
    return {
      currentUser: getCurrentUser(state),
      authorisedUsers: getAuthorisedUsers(state)
    }
  }
  
  export const SheepRacing = connect(mapStateToProps,mapDispatchToProps)(SheepRacingUnconnected)