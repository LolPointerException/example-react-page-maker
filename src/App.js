import React, { Component } from 'react';
import {
  Row, Col, Button, Container,
  TabContent, TabPane,
  Nav, NavItem, NavLink
 } from 'reactstrap';
import ReactJson from 'react-json-view';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import keywordInspector from 'hackmyresume/dist/inspectors/keyword-inspector';
import FreshResume  from 'hackmyresume/dist/core/fresh-resume';

import {
  Canvas,
  Palette,
  state,
  Trash,
  core,
  Preview,
  registerPaletteElements
} from 'react-page-maker';

import { elements } from './const';
import DraggableLayoutR3C3 from './elements/DraggableLayoutR3C3';
import DraggableLayoutR1C2 from './elements/DraggableLayoutR1C2';
import DraggableName from './elements/DraggableName';
import DraggableInformation from './elements/DraggableInformation';
import DraggableProject from './elements/DraggableProject';
import DraggableEmployment from './elements/DraggableEmployment';
import DraggableEducation from './elements/DraggableEducation';
import DraggableInterest from './elements/DraggableInterest';
import DraggableSkill from './elements/DraggableSkill';
import DraggableHeading from './elements/DraggableHeading';

import './App.css';

function getComponent(item) {
  switch (item) {
    case 'name':
      return DraggableName;
    case 'contact':
      return DraggableInformation;
    case 'projects':
      return DraggableProject;
    case 'employment':
      return DraggableEmployment;
    case 'education':
      return DraggableEducation;
    case 'interests':
      return DraggableInterest;
    case 'skills':
      return DraggableSkill;
    default:
      return DraggableHeading;
  }
}

const usableFields = [
  'employment',
  'projects',
  'skills',
  'education',
  'interests',
  'name',
  'contact',
]

class App extends Component {
  constructor(props) {
    super(props);

    const cvElements = usableFields.map((item) => ({
      type: item,
      component: getComponent(item)
    }));

    const layoutElements = [
      {
        type: elements.GRID_LAYOUT_1_2,
        component: DraggableLayoutR1C2,
      },
      {
        type: elements.GRID_LAYOUT_3_3,
        component: DraggableLayoutR3C3,
      },
      {
        type: elements.HEADING,
        component: DraggableHeading,
      }
    ];
    const palleteElements = cvElements.concat(layoutElements);

    // register all palette elements
    registerPaletteElements(palleteElements);

    // state.clearState() triggers this event
    state.addEventListener('flush', (e) => {
      console.log('flush', e);
    });

    // state.removeElement() triggers this event
    state.addEventListener('removeElement', (e) => {
      console.log('removeElement', e);
    });

    // state.updateElement() triggers this event
    state.addEventListener('updateElement', (e) => {
      console.log('updateElement', e);
    });
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    this.handleFileLoad = this.handleFileLoad.bind(this);
  }

  state = {
    activeTab: '1',
    resume: {},
    currentState: [],
    fileError: null,
  }

  componentWillMount() {
    state.addEventListener('change', this._stateChange);
  }

  componentWillUnmount() {
    state.removeEventListener('change', this._stateChange);
  }

  _stateChange = (s) => {
    const newState = state.getStorableState();
    this.setState({ currentState: newState }, () => {
      localStorage.setItem('initialElements', JSON.stringify(newState));
    });
  }

  // re-hydrate canvas state
  initialElements = JSON.parse(localStorage.getItem('initialElements'))

  // define all palette elements that you want to show
  paletteItemsToBeRendered = () => {
    const { resume } = this.state;
    const items = Object.keys(resume)
    .filter((key) => usableFields.includes(key))
    .flatMap((key) => {
      const value = resume[key];
      let items = [];
      if (key === 'name') {
        items = [{ name: value }];
      }
      if (Array.isArray(value)) {
        items = value;
      }
      if (value.hasOwnProperty('history')) {
        items = ['education'].includes(key) ? value.history : [value].concat(value.history);
      }
      if (value.hasOwnProperty('other')) {
        items = [value].concat(value.other);
      }
      if (value.hasOwnProperty('sets')) {
        items = items.concat(value.sets.map((item) => ({...item, ...{ subType: 'skillSet' }})));
      }
      if (value.hasOwnProperty('list')) {
        items = items.concat(value.list.map((item) => ({...item, ...{ subType: 'skillList' }})));
      }
      return items.map((item) => ({
        ...item,
        ...{ type: key}
      }));
    });
    const cvElements = items.map((item, index) => ({
      type: item.type,
      name: `${item.type} - ${item.title}`,
      id: `${item.type}-${index}`,
      payload: item,
    }));
    const layoutElements = [
      {
        type: elements.GRID_LAYOUT_1_2,
        name: '1 by 2 Grid',
        id: '1x2Grid',
        payload: {},
      },
      {
        type: elements.GRID_LAYOUT_3_3,
        name: '3 by 3 Grid',
        id: '3x3Grid',
        payload: {},
      },
      {
        type: elements.HEADING,
        name: 'Heading',
        id: 'heading',
        payload: {},
      },
    ];
    return cvElements.concat(layoutElements);
  }

  _onDrop = (data, cb) => {
    // no need to ask id and name again
    if (data.payload && data.payload.dropped) {
      return cb(data);
    }

    let name = data.name;

    const id = new Date().getTime();

    const result = cb({
      ...data,
      name,
      id,
      payload: { dropped: true, ...data.payload }
    });
  }

  _toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  _clearState = () => {
    state.clearState();
  }

  renderCV() {
    // const cv = this.state.currentState.map((item) => { type: item.type, data:  })

    const cvItems = this.state.currentState
    .flatMap((item) => {
      if (!item.hasOwnProperty('fields') || item.fields.length === 0) {
        return item;
      }
      return item.fields;
    })
    .filter((item) => usableFields.includes(item.type))
    .reduce((acc, item) => {
      const found = acc.hasOwnProperty(item.type);
      const { type, dropped, ...data} = item.payload;
      if(found) {
        acc[item.type].push(data);
      } else {
        acc[item.type] = [data]
      }
      return acc;
    }, {})
    if (Object.keys(cvItems).length > 0) {
      const {
        contact = [],
        projects = [],
        employment = [],
        education = [],
        skills = [],
      } = cvItems;
      const { resume } = this.state;
      const employmentSummaries = employment.filter((item) => item.hasOwnProperty('history'));
      const cv = {
        name: resume.name,
        meta: resume.meta,
        contact: {
          ...resume.contact,
          other: contact.filter((item) => !item.hasOwnProperty('other')),
        },
        projects,
        employment: {
          ...resume.employment,
          history: employment.filter((item) => !item.hasOwnProperty('history')),
        },
        education: {
          ...resume.education,
          history: education.filter((item) => !item.hasOwnProperty('history')),
        },
        skills: {
          sets: skills.filter((item) => item.subType === 'skillSet').map(({ subType, ...rest }) => rest),
          list: skills.filter((item) => item.subType === 'skillList').map(({ subType, ...rest }) => rest),
        }
      }
      return cv;
    }
    return cvItems;
  }

  handleFileLoad(event) {
    try {
      const resume = JSON.parse(event.target.result);
      this.setState({
        resume,
        activeTab: '2',
      });
    } catch (err) {
      this.setState({
        resume: {},
        activeTab: '1',
        fileError: err.message,
      });
    }
  }

  onFileChangeHandler(event) {
    const uploadedFile = event.target.files[0];
    if (uploadedFile.name.split('.')[1] !== 'json'){
      this.setState({ fileError: 'Non-JSON file uploaded' });
    } else {
      this.setState({ fileError: null });
      const reader = new FileReader();
      reader.onload = this.handleFileLoad;
      reader.readAsText(event.target.files[0]);
    }
  }

  render() {
    const { fileError, resume } = this.state;
    const error = fileError ? <p style={{ background: 'red', color: 'white' }}>{fileError}</p> : null;
    const cv = this.renderCV();
    const skillsCv = {
      ...cv,
      skills: resume.skills,
    }
    const freshCV = new FreshResume().parseJSON(skillsCv);
    const rawKeywords = keywordInspector.run(freshCV).sort((a, b) => b.count - a.count);
    const keywords = rawKeywords.slice(0, 5).map((item) => (<li>{item.name} ({item.count})</li>));
    return (
      <div className="App container">
        <Nav tabs className="justify-content-md-center">
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === '1' ? 'active' : ''}`}
              onClick={() => { this._toggleTab('1'); }}
              >
              Upload
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === '2' ? 'active' : ''}`}
              onClick={() => { this._toggleTab('2'); }}
            >
              Canvas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === '3' ? 'active' : ''}`}
              onClick={() => { this._toggleTab('3'); }}
            >
              Preview
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`${this.state.activeTab === '4' ? 'active' : ''}`}
              onClick={() => { this._toggleTab('4'); }}
            >
              FRESH Document
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row className="mt-3">
              <Col sm="12">
                <p>Select a FRESH Document to work with</p>
                <input type="file" name="resume" onChange={this.onFileChangeHandler} />
                {error}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row className="page-builder mt-3">
              <Col sm="9" className="canvas-container">
                <Canvas onDrop={this._onDrop} initialElements={this.initialElements} placeholder="Drop Here" />
              </Col>
              <Col sm="3">
                <Palette paletteElements={this.paletteItemsToBeRendered()} />
                <Trash />
                <Button color="danger" onClick={this._clearState}>Flush Canvas</Button>
                <h2>Top 5 Keywords</h2>
                <ul>
                  {keywords}
                </ul>
              </Col>
              <p className="m-4"><sup>*</sup>All canvas data is getting stored in localStorage. Try refresh, canvas will get pre-populate with previous state</p>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row className="mt-3">
              <Preview>
                {
                  ({ children }) => (
                    <Container>
                      {children}
                    </Container>
                  )
                }
              </Preview>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row className="mt-3">
              <Col sm="12">
                <ReactJson src={cv} collapsed theme="solarized" />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default App;
