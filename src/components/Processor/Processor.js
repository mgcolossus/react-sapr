import React from "react";
import { connect } from "react-redux";
import calc from "./calculation";
import { saveSolution, saveDeltaResults } from "../../reducers/reducer";
import "./Processor.css";
import { useAlert } from "react-alert";

function Processor(props) {
  const alert = useAlert();
  const clickHandler = () => {
    if (props.errorMessage) {
      alert.show(props.errorMessage);
    } else {
      const reducedNodesRows = [];
      for (let i = 0; i < props.rodsRows.length + 1; i++) {
        reducedNodesRows.push({ nodeNumber: i + 1, nodeForce: 0 });
      }
      props.nodesRows.forEach((node) => {
        reducedNodesRows[node.nodeNumber - 1].nodeForce += node.nodeForce;
      });
      reducedNodesRows.forEach((node) => {
        node.nodeForce = Number(node.nodeForce.toFixed(5));
      });
      const [solution, deltaResults] = calc(
        props.rodsRows,
        reducedNodesRows,
        props.leftSupport,
        props.rightSupport
      );
      props.saveSolution(solution);
      props.saveDeltaResults(deltaResults);
    }
  };
  return (
    <div className="processor">
      <div className="processor-main-content">
        <button onClick={clickHandler}>Посчитать</button>
        {props.deltaResults
          ? props.deltaResults.map((delta) => <div>{delta}</div>)
          : null}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    rodsRows: state.rodsAndNodes.rodsRows,
    nodesRows: state.rodsAndNodes.nodesRows,
    leftSupport: state.rodsAndNodes.leftSupport,
    rightSupport: state.rodsAndNodes.rightSupport,
    isReadyForComputation: state.rodsAndNodes.isReadyForSave,
    errorMessage: state.rodsAndNodes.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSolution: (solution) => dispatch(saveSolution(solution)),
    saveDeltaResults: (deltaResults) => dispatch(saveDeltaResults(deltaResults))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Processor);
