
import React = require("react");
import ContentEditable from "../../vendors/react-contenteditable";

class SceneEditor extends React.Component<any, any> {
    render() {
        var onChange = (evt: any) => {
            var script = evt.target.value;
            this.props.onChange(script);
        }
        return <div className="scene-editor">
            <ContentEditable html={this.props.script} onChange={onChange} />
        </div>;
    }
};

export default SceneEditor;
