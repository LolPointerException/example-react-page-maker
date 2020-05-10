import React from 'react';
import { BlockPicker } from 'react-color';
import { Draggable, state } from 'react-page-maker';

function SkillSet({ skillDetails }) {
  const { name, level, skills } = skillDetails;
  const skillsList = skills.map((item, index) => (<li key={index}>{item}</li>));
  return(
    <div>
      <h2>{name} ({level})</h2>
      <ul>
        {skillsList}
      </ul>
    </div>
  );
}

function SkillListItem({ skillDetails }) {
  const { name, summary } = skillDetails;
  return(
    <div>
      <h2>{name}</h2>
      <p>{summary}</p>
    </div>
  );
}

class DraggableSkill extends React.Component {
  state = {
    name: '',
  };

  handleChangeComplete = (title) => {
    const { id, dropzoneID, parentID, payload } = this.props;
    this.setState({ title: title }, () => {
      state.updateElement(id, dropzoneID, parentID, {
        payload: { title: title }
      });
    });
  };

  render() {
    const {
      id,
      showBasicContent,
      showPreview,
      dropzoneID,
      parentID,
      name,
      payload
    } = this.props;

    const itemName = this.state.name || payload && payload.name || 'No Name';

    if (showBasicContent) {
      return (
        <Draggable { ...this.props } >
          {
            <span>Skill - {itemName}</span>
          }
        </Draggable>
      )
    }

    if (showPreview) {
      if (payload.subType === 'skillSet') {
        return (
          <SkillSet skillDetails={payload} />
        )
      }
      return (
        <SkillListItem skillDetails={payload} />
      );
    }

    return (
      <Draggable { ...this.props } >
        <header>
          <h2 className="center-heading">Skill - {itemName}</h2>
        </header>
      </Draggable>
    )
  }
};

export default DraggableSkill;
