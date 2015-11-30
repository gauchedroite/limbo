
import React = require("react");
import State = require( "../state");
import { IProps, IState, IScene } from "../i-state";


// export default class Actor extends React.Component<IProps, any> {
//     render() {
//         return (
//             <h1>A C T O R</h1>
//         );
//     }
// }

// Stateless functional component. Has no lifecycle methods.
var Actor = (props: IProps) => {
    return <h1>ACTOR</h1>;
};

export default Actor;
