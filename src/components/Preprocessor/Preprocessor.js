import React, { useRef } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import {
  addNewRod,
  newRodAreaChanged,
  newRodLengthChanged,
  newRodModulusChanged,
  newRodSigmaChanged,
  newRodDistLoadChanged,
  changeRod,
  changingRodAreaChanged,
  changingRodLengthChanged,
  changingRodModulusChanged,
  changingRodSigmaChanged,
  changingRodDistLoadChanged,
  changingRodSubmit,
  removeRodRow,
  addNodeRow,
  newNodeNumberChanged,
  newNodeForceChanged,
  removeNodeRow,
  changeNode,
  changingNodeNumberChanged,
  changingNodeForceChanged,
  changingNodeSubmit,
  changeLeftSupport,
  changeRightSupport,
  checkForError,
  downloadConstruction,
  handleFileOpening,
  clearSolution,
  loadDemo
} from "../../reducers/reducer";
import "./PreprocessorStyles.css";

function Preprocessor(props) {
  const openFileInputRef = useRef(null);
  const alert = useAlert();
  return (
    <div className="preprocessor">
      <div className="preprocessor__rods">
        <table className="preprocessor__rods-table">
          <thead>
            <tr>
              <th></th>
              <th>L</th>
              <th>A</th>
              <th>E</th>
              <th>σ</th>
              <th>q</th>
            </tr>
          </thead>
          <tbody>
            {props.rodsRows.map((rodRow, index) => {
              if (rodRow.index === props.changingRodIndex) {
                return (
                  <tr key={rodRow.reactKey}>
                    <td>{props.changingRodIndex}</td>
                    <td>
                      <input
                        type="text"
                        value={props.changingRodInputRow.length}
                        onChange={(e) =>
                          props.changingRodLengthChanged(e.target.value)
                        }
                        className={`table-input ${
                          props.changingRodInputRow.isLengthCorrect
                            ? ""
                            : "input-error"
                        }`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={props.changingRodInputRow.area}
                        onChange={(e) =>
                          props.changingRodAreaChanged(e.target.value)
                        }
                        className={`table-input ${
                          props.changingRodInputRow.isAreaCorrect
                            ? ""
                            : "input-error"
                        }`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={props.changingRodInputRow.modulus}
                        onChange={(e) =>
                          props.changingRodModulusChanged(e.target.value)
                        }
                        className={`table-input ${
                          props.changingRodInputRow.isModulusCorrect
                            ? ""
                            : "input-error"
                        }`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={props.changingRodInputRow.sigma}
                        onChange={(e) =>
                          props.changingRodSigmaChanged(e.target.value)
                        }
                        className={`table-input ${
                          props.changingRodInputRow.isSigmaCorrect
                            ? ""
                            : "input-error"
                        }`}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={props.changingRodInputRow.distLoad}
                        onChange={(e) =>
                          props.changingRodDistLoadChanged(e.target.value)
                        }
                        className={`table-input ${
                          props.changingRodInputRow.isDistLoadCorrect
                            ? ""
                            : "input-error"
                        }`}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          props.changingRodSubmit();
                          props.clearSolution();
                        }}>
                        ✓
                      </button>
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={rodRow.reactKey}>
                  <td>{rodRow.index}</td>
                  <td>{rodRow.length}</td>
                  <td>{rodRow.area}</td>
                  <td>{rodRow.modulus}</td>
                  <td>{rodRow.sigma}</td>
                  <td>{rodRow.distLoad}</td>
                  <td className="preprocessor__rods-row-buttons">
                    <button onClick={() => props.changeRod(rodRow.index)}>
                      ✏
                    </button>
                    <button
                      onClick={() => {
                        props.removeRodRow(rodRow.index);
                        props.changeLeftSupport(props.leftSupport.isChecked);
                        props.changeRightSupport(props.rightSupport.isChecked);
                        props.checkForError();
                        props.clearSolution();
                      }}>
                      ⨯
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>{props.rodsRows.length + 1}</td>
              <td>
                <input
                  className={`table-input ${
                    props.newRodInputRow.isLengthCorrect ? "" : "input-error"
                  }`}
                  type="text"
                  value={props.newRodInputRow.length}
                  onChange={(e) => {
                    props.newRodLengthChanged(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  className={`table-input ${
                    props.newRodInputRow.isAreaCorrect ? "" : "input-error"
                  }`}
                  type="text"
                  value={props.newRodInputRow.area}
                  onChange={(e) => {
                    props.newRodAreaChanged(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  className={`table-input ${
                    props.newRodInputRow.isModulusCorrect ? "" : "input-error"
                  }`}
                  type="text"
                  value={props.newRodInputRow.modulus}
                  onChange={(e) => {
                    props.newRodModulusChanged(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  className={`table-input ${
                    props.newRodInputRow.isSigmaCorrect ? "" : "input-error"
                  }`}
                  type="text"
                  value={props.newRodInputRow.sigma}
                  onChange={(e) => {
                    props.newRodSigmaChanged(e.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  className={`table-input ${
                    props.newRodInputRow.isDistLoadCorrect ? "" : "input-error"
                  }`}
                  type="text"
                  value={props.newRodInputRow.distLoad}
                  onChange={(e) => {
                    props.newRodDistLoadChanged(e.target.value);
                  }}
                />
              </td>
              <td className="preprocessor__rods-add-rod-button-td">
                <button
                  className="preprocessor__rods-add-rod-button"
                  onClick={() => {
                    props.addRod();
                    props.changeLeftSupport(props.leftSupport.isChecked);
                    props.changeRightSupport(props.rightSupport.isChecked);
                    props.checkForError();
                    props.clearSolution();
                  }}>
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="preprocessor__nodes">
        <div className="preprocessor__nodes-table-wrapper">
          <table className="preprocessor__nodes-table">
            <thead>
              <tr>
                <th>Номер узла</th>
                <th>Значение нагрузки</th>
              </tr>
            </thead>
            <tbody>
              {props.nodesRows.map((nodeRow, index) => {
                if (index === props.changingNodeIndex) {
                  return (
                    <tr>
                      <td>
                        <input
                          type="text"
                          value={props.changingNodeInputRow.nodeNumber}
                          onChange={(e) =>
                            props.changingNodeNumberChanged(e.target.value)
                          }
                          className={`table-input ${
                            props.changingNodeInputRow.isNodeNumberCorrect
                              ? ""
                              : "input-error"
                          }`}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={props.changingNodeInputRow.nodeForce}
                          onChange={(e) =>
                            props.changingNodeForceChanged(e.target.value)
                          }
                          className={`table-input ${
                            props.changingNodeInputRow.isNodeForceCorrect
                              ? ""
                              : "input-error"
                          }`}
                        />
                      </td>
                      <td
                      >
                        <button
                          onClick={() => {
                            props.changingNodeSubmit();
                            props.checkForError();
                            props.clearSolution();
                          }}>
                          ✓
                        </button>
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr>
                    <td>{nodeRow.nodeNumber}</td>
                    <td>{nodeRow.nodeForce}</td>
                    <td className="preprocessor__nodes-button-td">
                      <button
                        onClick={() => {
                          props.changeNode(index);
                          props.checkForError();
                          props.clearSolution();
                        }}>
                        ✐
                      </button>
                      <button
                        onClick={() => {
                          props.removeNodeRow(index);
                          props.checkForError();
                          props.clearSolution();
                        }}>
                        ⨯
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>
                  <input
                    type="text"
                    value={props.newNodeInputRow.nodeNumber}
                    onChange={(e) => props.newNodeNumberChanged(e.target.value)}
                    className={`table-input ${
                      props.newNodeInputRow.isNodeNumberCorrect
                        ? ""
                        : "input-error"
                    }`}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={props.newNodeInputRow.nodeForce}
                    onChange={(e) => props.newNodeForceChanged(e.target.value)}
                    className={`table-input ${
                      props.newNodeInputRow.isNodeForceCorrect
                        ? ""
                        : "input-error"
                    }`}
                  />
                </td>
                <td className="preprocessor__nodes-button-td">
                  <button
                    onClick={() => {
                      props.addNodeRow();
                      props.checkForError();
                    }}>
                    +
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="preprocessor__rods-supports">
          <div>
            Левая опора
            <input
              type="checkbox"
              checked={props.leftSupport.isChecked}
              onChange={(e) => {
                props.changeLeftSupport(e.target.checked);
                props.clearSolution();
                props.checkForError();
              }}
            />
          </div>
          <div>
            Правая опора
            <input
              type="checkbox"
              checked={props.rightSupport.isChecked}
              onChange={(e) => {
                props.changeRightSupport(e.target.checked);
                props.clearSolution();
                props.checkForError();
              }}
            />
          </div>
        </div>
      </div>
      <div className="preprocessor__rods-interface">
        <div className="preprocessor__rods-buttons">
          <div>
            <button
              onClick={() => {
                if (props.errorMessage) {
                  alert.show(props.errorMessage);
                } else {
                  props.downloadConstruction();
                }
              }}>
              Сохранить конструкцию
            </button>
            <button
              onClick={props.loadDemo}
              >
              Открыть демонстрационную конструкцию
            </button>
          </div>
        </div>
        <div className="preprocessor__rods-openfile">
          <label htmlFor="openfile">Открыть конструкцию</label>
          <input
            id="openfile"
            type="file"
            accept=".json"
            ref={openFileInputRef}
            onFocus={() => {
              openFileInputRef.current.value = null;
            }}
            onChange={() => {
              props.handleFileOpening(openFileInputRef);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rodsRows: state.rodsAndNodes.rodsRows,
    newRodInputRow: state.rodsAndNodes.newRodInputRow,
    changingRodIndex: state.rodsAndNodes.changingRodIndex,
    changingRodInputRow: state.rodsAndNodes.changingRodInputRow,

    nodesRows: state.rodsAndNodes.nodesRows,
    newNodeInputRow: state.rodsAndNodes.newNodeInputRow,
    changingNodeIndex: state.rodsAndNodes.changingNodeIndex,
    changingNodeInputRow: state.rodsAndNodes.changingNodeInputRow,

    leftSupport: state.rodsAndNodes.leftSupport,
    rightSupport: state.rodsAndNodes.rightSupport,

    errorMessage: state.rodsAndNodes.errorMessage,
    isReadyForSave: state.rodsAndNodes.isReadyForSave
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRod: () => dispatch(addNewRod()),
    newRodAreaChanged: (value) => {
      dispatch(newRodAreaChanged(value));
    },
    newRodLengthChanged: (value) => dispatch(newRodLengthChanged(value)),
    newRodModulusChanged: (value) => dispatch(newRodModulusChanged(value)),
    newRodSigmaChanged: (value) => dispatch(newRodSigmaChanged(value)),
    newRodDistLoadChanged: (value) => dispatch(newRodDistLoadChanged(value)),
    changeRod: (index) => dispatch(changeRod(index)),
    changingRodAreaChanged: (value) => dispatch(changingRodAreaChanged(value)),
    changingRodLengthChanged: (value) =>
      dispatch(changingRodLengthChanged(value)),
    changingRodModulusChanged: (value) =>
      dispatch(changingRodModulusChanged(value)),
    changingRodSigmaChanged: (value) =>
      dispatch(changingRodSigmaChanged(value)),
    changingRodDistLoadChanged: (value) =>
      dispatch(changingRodDistLoadChanged(value)),
    changingRodSubmit: () => dispatch(changingRodSubmit()),
    removeRodRow: (index) => dispatch(removeRodRow(index)),
    addNodeRow: () => dispatch(addNodeRow()),
    removeNodeRow: (index) => dispatch(removeNodeRow(index)),
    changeNode: (index) => dispatch(changeNode(index)),
    newNodeNumberChanged: (value) => dispatch(newNodeNumberChanged(value)),
    newNodeForceChanged: (value) => dispatch(newNodeForceChanged(value)),
    changingNodeNumberChanged: (value) =>
      dispatch(changingNodeNumberChanged(value)),
    changingNodeForceChanged: (value) =>
      dispatch(changingNodeForceChanged(value)),
    changingNodeSubmit: () => dispatch(changingNodeSubmit()),
    changeLeftSupport: (isChecked) => dispatch(changeLeftSupport(isChecked)),
    changeRightSupport: (isChecked) => dispatch(changeRightSupport(isChecked)),
    checkForError: () => dispatch(checkForError()),
    downloadConstruction: () => dispatch(downloadConstruction()),
    handleFileOpening: (inputRef) => dispatch(handleFileOpening(inputRef)),
    clearSolution: () => dispatch(clearSolution()),
    loadDemo: () => dispatch(loadDemo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preprocessor);
