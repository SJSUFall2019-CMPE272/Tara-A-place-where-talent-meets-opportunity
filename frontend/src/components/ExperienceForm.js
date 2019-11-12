import React from 'react';
import PropTypes from 'prop-types';

const ExperienceForm = ({ idx, ExpState, handleExpChange }) => {
    const ExpId = `name-${idx}`;
    const ageId = `age-${idx}`;
    return (
        <div key={`exp-${idx}`}>
            <label htmlFor={ExpId}>{`Experience #${idx + 1}`}</label>
            <input
                type="text"
                name={ExpId}
                data-idx={idx}
                id={ExpId}
                className="name"
                value={ExpState[idx].name}
                onChange={handleExpChange}
            />
            <label htmlFor={ageId}>Age</label>
            <input
                type="text"
                name={ageId}
                data-idx={idx}
                id={ageId}
                className="age"
                value={ExpState[idx].age}
                onChange={handleExpChange}
            />
        </div>
    );
};

ExperienceForm.propTypes = {
    idx: PropTypes.number,
    ExpState: PropTypes.array,
    handleExpChange: PropTypes.func,
};

export default ExperienceForm;